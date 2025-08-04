#!/bin/bash

# Jenkins Credentials Setup Script for RetailMax CI/CD

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if Jenkins is running
check_jenkins() {
    print_status "Checking if Jenkins is running..."
    if curl -s http://localhost:8080 > /dev/null; then
        print_status "Jenkins is running at http://localhost:8080"
    else
        print_error "Jenkins is not running. Please start Jenkins first."
        exit 1
    fi
}

# Get Jenkins admin password
get_jenkins_password() {
    print_status "Getting Jenkins admin password..."
    JENKINS_PASSWORD=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)
    echo "Jenkins admin password: $JENKINS_PASSWORD"
    echo "Please use this password to login to Jenkins at http://localhost:8080"
}

# Instructions for setting up credentials
setup_instructions() {
    print_status "Setting up Jenkins credentials..."
    echo ""
    echo "=== JENKINS CREDENTIALS SETUP ==="
    echo ""
    echo "1. Go to Jenkins: http://localhost:8080"
    echo "2. Login with admin and password: $JENKINS_PASSWORD"
    echo ""
    echo "3. Add AWS Credentials:"
    echo "   - Go to Manage Jenkins > Manage Credentials"
    echo "   - Click 'System' > 'Global credentials' > 'Add Credentials'"
    echo "   - Kind: AWS Credentials"
    echo "   - ID: aws-credentials"
    echo "   - Access Key ID: <your-access-key-id-here>"
    echo "   - Secret Access Key: <your-secret-access-key-here>"
    echo ""
    echo "4. Add GitHub Credentials:"
    echo "   - Go to Manage Jenkins > Manage Credentials"
    echo "   - Click 'System' > 'Global credentials' > 'Add Credentials'"
    echo "   - Kind: Username with password"
    echo "   - ID: github-credentials"
    echo "   - Username: your-github-username"
    echo "   - Password: your-github-personal-access-token"
    echo ""
    echo "5. Create the Pipeline Job:"
    echo "   - Go to Jenkins Dashboard"
    echo "   - Click 'New Item'"
    echo "   - Name: RetailMax-CI-CD"
    echo "   - Type: Pipeline"
    echo "   - Click OK"
    echo "   - In Pipeline section, select 'Pipeline script from SCM'"
    echo "   - SCM: Git"
    echo "   - Repository URL: https://github.com/ueu23/retailmax-cloud-journey.git"
    echo "   - Credentials: github-credentials"
    echo "   - Branch: */main"
    echo "   - Script Path: Jenkinsfile"
    echo "   - Click Save"
    echo ""
    echo "6. Test the Pipeline:"
    echo "   - Click 'Build Now' to test the pipeline"
    echo ""
}

# Main function
main() {
    print_status "Setting up Jenkins credentials for RetailMax CI/CD..."
    
    check_jenkins
    get_jenkins_password
    setup_instructions
    
    print_status "Setup instructions completed!"
    print_status "Follow the steps above to configure Jenkins for CI/CD."
}

main "$@" 