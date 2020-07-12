# Create VPC / Security Groups

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "development-vpc"
  cidr = var.vpc_cidr 

  azs             = var.azs
  private_subnets = var.private_subnets
  public_subnets = var.public_subnets

  enable_nat_gateway = true
  enable_vpn_gateway = true

  tags = {
    Terraform = "true"
    Environment = "dev"
  }
}

resource "aws_security_group" "lb"{
  name = "asteroid-game-lb"
  vpc_id = module.vpc.vpc_id
  # Allow all https traffic
  ingress { 
    from_port = 80 
    to_port   = var.lb_port
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Only allow ssh traffic from your public ip
  ingress { 
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["${var.user_ip}/32"]
  }
}

# Setup Elastic ALB 

# Setup s3 for lb to store its logs in
data "aws_elb_service_account" "this" {}

data "aws_iam_policy_document" "logs" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.this.arn]
    }

    resources = [
      "arn:aws:s3:::asteroid-game-lb-logs/*",
    ]
  }
}

resource "aws_s3_bucket" "asteroid_game_lb_logs" {
  bucket = "asteroid-game-lb-logs"
  acl    = "private"
  policy = data.aws_iam_policy_document.logs.json

  tags = {
    Name        = "asteroid_game_lb_logs"
    Environment = "Dev"
  }
}

# Setup lb

resource "aws_lb" "asteroid_game_lb" {
  name               = "asteroid-game-lb" 
  internal           = false 
  load_balancer_type = "application" 
  security_groups    = [aws_security_group.lb.id]
  # Lb needs two subnets in different AZs.
  # These two subnets "might" not be in two AZs
  subnets            = [module.vpc.public_subnets[0],module.vpc.public_subnets[1]]

  enable_deletion_protection = false 

  access_logs {
    bucket  = aws_s3_bucket.asteroid_game_lb_logs.id
    prefix  = "asteroid-game-lb-logs"
    enabled = true
  }

  tags = {
    Environment = "Dev"
  }
}

resource "aws_lb_listener" "asteroid_game" {
  load_balancer_arn = "${aws_lb.asteroid_game_lb.arn}"
  port              = "443"
  protocol          = "HTTPS"


  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.asteroid-game.arn}"
  }
}


resource "aws_lb_listener_certificate" "example" {
  listener_arn    = aws_lb_listener.asteroid
  certificate_arn = "${aws_acm_certificate.example.arn}"
}

resource "aws_lb_target_group" "asteroid-game" {
  name     = "asteroid-game-lb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  depends_on = [module.vpc]
}

resource "aws_lb_target_group_attachment" "asteroid-game" {
  target_group_arn = "${aws_lb_target_group.asteroid_game.arn}"
  target_id        = "${var.ec2_id}"
  port             = 80
}

resource "tls_private_key" "asteroid-game" {
  algorithm = "RSA"
}

resource "aws_acm_certificate" "cert" {
  private_key      = "${tls_private_key.example.private_key_pem}"
  certificate_body = "${tls_self_signed_cert.example.cert_pem}"
}
