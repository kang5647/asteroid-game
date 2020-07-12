# AWS Provider Setup

variable "profile" {
  default = "default"
  description = "Name of your profile inside ~/.aws/credentials"
}

variable "credentials_path"{
  default = "/Users/craig"
}

variable "region" {
  default     = "us-east-1"
  description = "Defines where your app should be deployed"
}

variable "application_name" {
  default = "asteroid-game"
  description = "Name of the application"
}

variable "application_description" {
  default = "Asteroid-game arcade game base deployment"
  description = "Sample application based on Elastic Beanstalk & Docker"
}

variable "user_ip" {
  description = "User's public ip"
}

variable "server_port"{
  default = 80
  description = "port server listens on"
}

variable "lb_port"{
  default = 443
  description = "port lb listens on. All traffic inside network is http."
}

variable "private_subnets"{
#  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
   default = []
}

variable "public_subnets"{
  default = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

variable "vpc_cidr"{
  default = "10.0.0.0/16"
}

variable "vpc_azs"{
  default = ["us-east-1a","us-east-1b"]
}


# Application Setup

variable "ami_id"{
  default = "ami-0a70a70ce0d38da16"
  description= "id of instance. Currently using a ami I created that already has docker swarm setup"
}

variable "instance_type"{
  default = "t2.small"
  description = "Aws instance type. Must meet the minimum requirements to run docker swarm"
}

variable "key_pair"{
  default = "main-server"
  description = "ssh key-pair to use with instance"
}