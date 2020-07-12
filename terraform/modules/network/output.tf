output "vpc_id" {
  description = "The ID of the VPC"
  value       =  module.vpc.vpc_id
}

output "security_group_id" {
    description = "The ID of lb security group"
    value       = aws_security_group.lb.id
}

output "private_subnets"{
    description = "The IDs of the private subnets"
    value  = module.vpc.private_subnets
}

output "public_subnets"{
    description = "The IDs of the public subnets"
    value = module.vpc.public_subnets
}