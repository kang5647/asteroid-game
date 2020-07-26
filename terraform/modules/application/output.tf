output "ec2_public_ip" {
  value = aws_instance.asteroid_game.public_ip
}

output "ec2_id" {
  value = aws_instance.asteroid_game.id
}

output "ec2_arn" {
  value = aws_instance.asteroid_game.arn
}