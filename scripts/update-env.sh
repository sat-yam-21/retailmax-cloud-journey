#!/bin/bash

# Update Environment File with Actual Values

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region)

print_status "Updating .env file with your actual values..."

# Create updated .env file
cat > .env << EOF
# AWS Configuration
AWS_REGION=${AWS_REGION}
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}

# Application Configuration
APP_NAME=retailmax
APP_PORT=8080
NODE_ENV=production

# ECR Configuration
ECR_REPOSITORY_URL=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/retailmax

# Server IPs (will be populated by Terraform)
APP_SERVER_IP=your-app-server-ip
MONITORING_SERVER_IP=your-monitoring-server-ip
JENKINS_SERVER_IP=your-jenkins-server-ip

# GitHub Configuration
GITHUB_REPO_URL=https://github.com/ueu23/retailmax-cloud-journey
GITHUB_TOKEN=your-github-personal-access-token

# Jenkins Configuration
JENKINS_URL=http://localhost:8080
JENKINS_USERNAME=admin
JENKINS_API_TOKEN=your-jenkins-api-token

# Monitoring Configuration
PROMETHEUS_URL=http://your-monitoring-server:9090
GRAFANA_URL=http://your-monitoring-server:3000
GRAFANA_USERNAME=admin
GRAFANA_PASSWORD=admin

# Terraform Configuration
TF_VAR_project_name=retailmax
TF_VAR_aws_region=${AWS_REGION}
TF_VAR_vpc_cidr=10.0.0.0/16
TF_VAR_task_cpu=256
TF_VAR_task_memory=512
TF_VAR_service_desired_count=2
TF_VAR_service_min_count=1
TF_VAR_service_max_count=10
EOF

print_status "Updated .env file with your AWS Account ID: ${AWS_ACCOUNT_ID}"
print_warning "You still need to manually update:"
echo "1. AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
echo "2. GITHUB_TOKEN (after creating GitHub Personal Access Token)"
echo "3. JENKINS_API_TOKEN (after setting up Jenkins)" 