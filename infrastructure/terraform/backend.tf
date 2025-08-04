# Local Backend for Terraform State (temporary)
# Uncomment the S3 backend configuration below after creating the S3 bucket
terraform {
  backend "local" {}
}

# S3 Backend for Terraform State (commented out for now)
# terraform {
#   backend "s3" {
#     bucket = "retailmax-terraform-state-256085988509"
#     key    = "infrastructure/terraform.tfstate"
#     region = "us-east-1"
#     
#     # Enable state locking with DynamoDB
#     dynamodb_table = "retailmax-terraform-locks"
#     encrypt        = true
#   }
# }

# DynamoDB table for state locking
resource "aws_dynamodb_table" "terraform_locks" {
  name           = "retailmax-terraform-locks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "Terraform State Locking"
    Project = "retailmax"
  }
}

# S3 bucket for Terraform state
resource "aws_s3_bucket" "terraform_state" {
  bucket = "retailmax-terraform-state-256085988509"

  tags = {
    Name = "Terraform State"
    Project = "retailmax"
  }
}

# Enable versioning for state bucket
resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Enable server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
} 