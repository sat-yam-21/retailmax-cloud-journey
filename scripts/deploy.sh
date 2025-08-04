#!/bin/bash

# RetailMax Complete Deployment Script
# This script orchestrates the entire deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites..."
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        print_error ".env file not found. Please copy env.example to .env and configure it."
        exit 1
    fi
    
    # Load environment variables
    source .env
    
    # Check required tools
    command -v terraform >/dev/null 2>&1 || { print_error "Terraform is required but not installed."; exit 1; }
    command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed."; exit 1; }
    command -v ansible >/dev/null 2>&1 || { print_error "Ansible is required but not installed."; exit 1; }
    command -v aws >/dev/null 2>&1 || { print_error "AWS CLI is required but not installed."; exit 1; }
    
    print_status "All prerequisites are satisfied."
}

# Deploy infrastructure with Terraform
deploy_infrastructure() {
    print_step "Deploying AWS infrastructure with Terraform..."
    
    cd infrastructure/terraform
    
    # Initialize Terraform
    print_status "Initializing Terraform..."
    terraform init
    
    # Plan the deployment
    print_status "Planning Terraform deployment..."
    terraform plan -out=tfplan
    
    # Apply the deployment
    print_status "Applying Terraform deployment..."
    terraform apply tfplan
    
    # Get outputs
    print_status "Getting Terraform outputs..."
    terraform output
    
    cd ../..
    
    print_status "Infrastructure deployment completed."
}

# Build and push Docker image
build_and_push_image() {
    print_step "Building and pushing Docker image..."
    
    # Build the Docker image
    print_status "Building Docker image..."
    docker build -t retailmax:latest .
    
    # Login to ECR
    print_status "Logging in to ECR..."
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY_URL
    
    # Tag and push image
    print_status "Tagging and pushing image to ECR..."
    docker tag retailmax:latest $ECR_REPOSITORY_URL:latest
    docker push $ECR_REPOSITORY_URL:latest
    
    print_status "Docker image pushed successfully."
}

# Deploy application with Ansible
deploy_application() {
    print_step "Deploying application with Ansible..."
    
    # Check if we have server IPs
    if [ -z "$APP_SERVER_IP" ]; then
        print_warning "APP_SERVER_IP not set. Skipping application deployment."
        return
    fi
    
    # Run Ansible deployment
    print_status "Running Ansible deployment playbook..."
    ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/deploy.yml
    
    print_status "Application deployment completed."
}

# Setup monitoring
setup_monitoring() {
    print_step "Setting up monitoring stack..."
    
    # Check if we have monitoring server IP
    if [ -z "$MONITORING_SERVER_IP" ]; then
        print_warning "MONITORING_SERVER_IP not set. Skipping monitoring setup."
        return
    fi
    
    # Run Ansible monitoring setup
    print_status "Running Ansible monitoring setup..."
    ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/setup-monitoring.yml
    
    print_status "Monitoring setup completed."
}

# Setup Jenkins
setup_jenkins() {
    print_step "Setting up Jenkins CI/CD..."
    
    # Check if we have Jenkins server IP
    if [ -z "$JENKINS_SERVER_IP" ]; then
        print_warning "JENKINS_SERVER_IP not set. Setting up local Jenkins..."
        ./scripts/setup-local-jenkins.sh
    else
        print_status "Setting up remote Jenkins..."
        ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/setup-jenkins.yml
    fi
    
    print_status "Jenkins setup completed."
}

# Health check
health_check() {
    print_step "Performing health checks..."
    
    # Check if ALB DNS is available
    if [ ! -z "$ALB_DNS_NAME" ]; then
        print_status "Checking application health..."
        curl -f http://$ALB_DNS_NAME/health || print_warning "Application health check failed"
    fi
    
    # Check if monitoring is accessible
    if [ ! -z "$MONITORING_SERVER_IP" ]; then
        print_status "Checking monitoring health..."
        curl -f http://$MONITORING_SERVER_IP:9090/-/healthy || print_warning "Prometheus health check failed"
        curl -f http://$MONITORING_SERVER_IP:3000/api/health || print_warning "Grafana health check failed"
    fi
    
    print_status "Health checks completed."
}

# Main deployment function
main() {
    print_status "Starting RetailMax deployment..."
    
    check_prerequisites
    deploy_infrastructure
    build_and_push_image
    deploy_application
    setup_monitoring
    setup_jenkins
    health_check
    
    print_status "🎉 Deployment completed successfully!"
    print_status "Next steps:"
    echo "1. Configure GitHub webhook for Jenkins"
    echo "2. Set up monitoring dashboards"
    echo "3. Configure alerting rules"
    echo "4. Test the complete CI/CD pipeline"
}

# Run main function
main "$@" 