#!/bin/bash

# RetailMax Deployment Script
# This script automates the complete deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    command -v terraform >/dev/null 2>&1 || { print_error "Terraform is required but not installed. Aborting."; exit 1; }
    command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed. Aborting."; exit 1; }
    command -v aws >/dev/null 2>&1 || { print_error "AWS CLI is required but not installed. Aborting."; exit 1; }
    command -v ansible-playbook >/dev/null 2>&1 || { print_error "Ansible is required but not installed. Aborting."; exit 1; }
    
    print_status "All prerequisites are installed."
}

# Check AWS credentials
check_aws_credentials() {
    print_status "Checking AWS credentials..."
    
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    print_status "AWS credentials are valid."
}

# Deploy infrastructure with Terraform
deploy_infrastructure() {
    print_status "Deploying infrastructure with Terraform..."
    
    cd infrastructure/terraform
    
    # Initialize Terraform
    terraform init
    
    # Plan the deployment
    terraform plan -out=tfplan
    
    # Apply the plan
    terraform apply tfplan
    
    # Get outputs
    ECR_REPO_URL=$(terraform output -raw ecr_repository_url)
    ALB_DNS_NAME=$(terraform output -raw alb_dns_name)
    ECS_CLUSTER_ID=$(terraform output -raw ecs_cluster_id)
    
    cd ../..
    
    print_status "Infrastructure deployed successfully."
    print_status "ECR Repository URL: $ECR_REPO_URL"
    print_status "ALB DNS Name: $ALB_DNS_NAME"
    print_status "ECS Cluster ID: $ECS_CLUSTER_ID"
}

# Build and push Docker image
build_and_push_image() {
    print_status "Building and pushing Docker image..."
    
    # Build the image
    docker build -t retailmax:latest .
    
    # Tag for ECR
    docker tag retailmax:latest $ECR_REPO_URL:latest
    docker tag retailmax:latest $ECR_REPO_URL:$(date +%Y%m%d-%H%M%S)
    
    # Login to ECR
    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REPO_URL
    
    # Push images
    docker push $ECR_REPO_URL:latest
    docker push $ECR_REPO_URL:$(date +%Y%m%d-%H%M%S)
    
    print_status "Docker image built and pushed successfully."
}

# Deploy application with Ansible
deploy_application() {
    print_status "Deploying application with Ansible..."
    
    # Set environment variables for Ansible
    export ECR_REPO_URL=$ECR_REPO_URL
    export APP_SERVER_IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=retailmax-app-server" --query 'Reservations[].Instances[].PublicIpAddress' --output text)
    export MONITORING_SERVER_IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=retailmax-monitoring-server" --query 'Reservations[].Instances[].PublicIpAddress' --output text)
    
    # Deploy application
    ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/deploy.yml
    
    # Setup monitoring
    ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/setup-monitoring.yml
    
    print_status "Application deployed successfully."
}

# Run health checks
run_health_checks() {
    print_status "Running health checks..."
    
    # Wait for application to be ready
    sleep 30
    
    # Check application health
    if curl -f http://$ALB_DNS_NAME/health >/dev/null 2>&1; then
        print_status "Application health check passed."
    else
        print_warning "Application health check failed. Please check the logs."
    fi
    
    # Check monitoring
    if curl -f http://$MONITORING_SERVER_IP:9090/-/healthy >/dev/null 2>&1; then
        print_status "Prometheus health check passed."
    else
        print_warning "Prometheus health check failed."
    fi
    
    if curl -f http://$MONITORING_SERVER_IP:3000/api/health >/dev/null 2>&1; then
        print_status "Grafana health check passed."
    else
        print_warning "Grafana health check failed."
    fi
}

# Display deployment information
display_deployment_info() {
    print_status "Deployment completed successfully!"
    echo
    echo "=== Deployment Information ==="
    echo "Application URL: http://$ALB_DNS_NAME"
    echo "Application Health: http://$ALB_DNS_NAME/health"
    echo "Prometheus: http://$MONITORING_SERVER_IP:9090"
    echo "Grafana: http://$MONITORING_SERVER_IP:3000 (admin/admin)"
    echo "ECS Cluster: $ECS_CLUSTER_ID"
    echo "ECR Repository: $ECR_REPO_URL"
    echo
    print_status "You can now access your application at: http://$ALB_DNS_NAME"
}

# Main deployment function
main() {
    print_status "Starting RetailMax deployment..."
    
    check_prerequisites
    check_aws_credentials
    deploy_infrastructure
    build_and_push_image
    deploy_application
    run_health_checks
    display_deployment_info
    
    print_status "Deployment completed successfully!"
}

# Run main function
main "$@" 