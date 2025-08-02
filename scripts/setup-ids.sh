#!/bin/bash

# RetailMax ID Setup Script
# This script helps you gather all required IDs and credentials

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

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Check AWS CLI
check_aws_cli() {
    print_header "AWS Configuration"
    
    if command -v aws >/dev/null 2>&1; then
        print_status "AWS CLI is installed"
        
        # Check AWS credentials
        if aws sts get-caller-identity >/dev/null 2>&1; then
            print_status "AWS credentials are configured"
            
            # Get AWS Account ID
            AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
            print_status "AWS Account ID: $AWS_ACCOUNT_ID"
            
            # Get AWS Region
            AWS_REGION=$(aws configure get region)
            print_status "AWS Region: $AWS_REGION"
            
        else
            print_error "AWS credentials not configured. Please run 'aws configure'"
            echo "You'll need:"
            echo "  - AWS Access Key ID"
            echo "  - AWS Secret Access Key"
            echo "  - Default region (us-east-1)"
            echo "  - Default output format (json)"
        fi
    else
        print_error "AWS CLI not installed. Please install it first."
    fi
}

# Check GitHub
check_github() {
    print_header "GitHub Configuration"
    
    # Check if git is configured
    if git config --get user.name >/dev/null 2>&1; then
        GIT_USERNAME=$(git config --get user.name)
        GIT_EMAIL=$(git config --get user.email)
        print_status "Git configured for: $GIT_USERNAME ($GIT_EMAIL)"
    else
        print_warning "Git not configured. Please run:"
        echo "  git config --global user.name 'Your Name'"
        echo "  git config --global user.email 'your.email@example.com'"
    fi
    
    # Check if this is a git repository
    if git rev-parse --git-dir >/dev/null 2>&1; then
        GITHUB_REPO_URL=$(git remote get-url origin 2>/dev/null || echo "No remote origin")
        print_status "Git repository: $GITHUB_REPO_URL"
    else
        print_warning "Not a git repository. Please initialize git and add remote origin."
    fi
    
    echo
    print_warning "You'll need to create a GitHub Personal Access Token:"
    echo "1. Go to GitHub Settings > Developer settings > Personal access tokens"
    echo "2. Generate a new token with 'repo' and 'admin:repo_hook' permissions"
    echo "3. Copy the token and save it securely"
}

# Check Jenkins
check_jenkins() {
    print_header "Jenkins Configuration"
    
    echo "For Jenkins setup, you'll need:"
    echo "1. Jenkins server URL (e.g., http://your-jenkins-server:8080)"
    echo "2. Jenkins admin username (usually 'admin')"
    echo "3. Jenkins admin password or API token"
    echo "4. Jenkins API token (generate from Jenkins > Configure > API Token)"
    
    echo
    print_warning "To get Jenkins API token:"
    echo "1. Log into Jenkins"
    echo "2. Click on your username in the top right"
    echo "3. Click 'Configure'"
    echo "4. In the 'API Token' section, click 'Add new Token'"
    echo "5. Give it a name and click 'Generate'"
    echo "6. Copy the token and save it securely"
}

# Check Docker
check_docker() {
    print_header "Docker Configuration"
    
    if command -v docker >/dev/null 2>&1; then
        print_status "Docker is installed"
        
        # Check if Docker daemon is running
        if docker info >/dev/null 2>&1; then
            print_status "Docker daemon is running"
        else
            print_error "Docker daemon is not running. Please start Docker."
        fi
    else
        print_error "Docker not installed. Please install Docker first."
    fi
}

# Check Terraform
check_terraform() {
    print_header "Terraform Configuration"
    
    if command -v terraform >/dev/null 2>&1; then
        print_status "Terraform is installed"
        TERRAFORM_VERSION=$(terraform version | head -n 1)
        print_status "Terraform version: $TERRAFORM_VERSION"
    else
        print_error "Terraform not installed. Please install Terraform first."
    fi
}

# Check Ansible
check_ansible() {
    print_header "Ansible Configuration"
    
    if command -v ansible >/dev/null 2>&1; then
        print_status "Ansible is installed"
        ANSIBLE_VERSION=$(ansible --version | head -n 1)
        print_status "Ansible version: $ANSIBLE_VERSION"
    else
        print_error "Ansible not installed. Please install Ansible first."
    fi
}

# Generate environment file
generate_env_file() {
    print_header "Environment File Setup"
    
    if [ -f "env.example" ]; then
        if [ ! -f ".env" ]; then
            cp env.example .env
            print_status "Created .env file from env.example"
            print_warning "Please edit .env file with your actual values"
        else
            print_warning ".env file already exists. Please check if it has the correct values"
        fi
    else
        print_error "env.example file not found"
    fi
}

# Display next steps
show_next_steps() {
    print_header "Next Steps"
    
    echo "1. Configure AWS credentials:"
    echo "   aws configure"
    echo
    echo "2. Set up GitHub repository:"
    echo "   git init"
    echo "   git remote add origin https://github.com/your-username/retailmax-cloud-journey"
    echo
    echo "3. Create GitHub Personal Access Token"
    echo
    echo "4. Set up Jenkins server (if not already done)"
    echo
    echo "5. Edit .env file with your actual values"
    echo
    echo "6. Run the deployment:"
    echo "   ./scripts/deploy.sh"
}

# Main function
main() {
    print_header "RetailMax ID and Credential Setup"
    
    check_aws_cli
    echo
    check_github
    echo
    check_jenkins
    echo
    check_docker
    echo
    check_terraform
    echo
    check_ansible
    echo
    generate_env_file
    echo
    show_next_steps
}

main "$@" 