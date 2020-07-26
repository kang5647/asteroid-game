variable "server_port" {
  default     = 80
  description = "All internal traffic operates under http. ELB handles all https traffic externally"
}

# AMI Setup
# Using a instance I created that has docker swarm already installed and ready to go. 
# In future I'll setup ansible and use a generic aws AMI

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type        = string
  description = "aws instance type (ie t2-micro)"
}

variable "subnet_id" {
  type        = string
  description = "Subnet to launch ec2 instance in. Created in network module"
}

variable "application_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "key_pair" {
  type = string
}

variable "user_ip" {
  type = string
}
variable "ssh_user" {
  default = "ec2-user"
}

variable "private_key_path" {
  type = string
}