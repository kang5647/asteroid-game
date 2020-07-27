# Set Required Version
terraform {
  required_version = ">= 0.12.26"
}

# Configure the AWS Provider
provider "aws" {
  profile                 = var.profile
  region                  = var.region
  shared_credentials_file = var.credentials_path
}

module "network" {
  source = "./modules/network"

  vpc_cidr        = var.vpc_cidr
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets
  azs             = var.vpc_azs
  user_ip         = var.user_ip
  ec2_id          = module.application.ec2_id
}

module "application" {
  source = "./modules/application"

  ami_id           = var.ami_id
  instance_type    = var.instance_type
  subnet_id        = module.network.public_subnets[0]
  application_name = var.application_name
  vpc_id           = module.network.vpc_id
  key_pair         = var.key_pair
  user_ip          = var.user_ip
  private_key_path = var.private_key_path
}
