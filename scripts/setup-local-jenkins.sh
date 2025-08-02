#!/bin/bash

# Local Jenkins Setup Script for Testing

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

# Check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_status "Docker is running"
}

# Start Jenkins with Docker
start_jenkins() {
    print_status "Starting Jenkins with Docker..."
    
    # Create Jenkins data directory
    mkdir -p jenkins-data
    
    # Run Jenkins container
    docker run -d \
        --name jenkins \
        -p 8080:8080 \
        -p 50000:50000 \
        -v jenkins-data:/var/jenkins_home \
        -v /var/run/docker.sock:/var/run/docker.sock \
        jenkins/jenkins:lts
    
    print_status "Jenkins is starting on http://localhost:8080"
    print_status "Initial admin password will be displayed in a moment..."
    
    # Wait for Jenkins to start
    sleep 10
    
    # Get initial admin password
    INITIAL_PASSWORD=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null || echo "Password not ready yet")
    
    if [ "$INITIAL_PASSWORD" != "Password not ready yet" ]; then
        print_status "Initial admin password: $INITIAL_PASSWORD"
    else
        print_warning "Password not ready yet. Check Jenkins logs:"
        echo "docker logs jenkins"
    fi
}

# Setup instructions
show_setup_instructions() {
    print_status "Jenkins Setup Instructions:"
    echo
    echo "1. Open http://localhost:8080 in your browser"
    echo "2. Enter the initial admin password shown above"
    echo "3. Install suggested plugins"
    echo "4. Create admin user"
    echo "5. Get API token:"
    echo "   - Go to your username → Configure"
    echo "   - Add new API token"
    echo "   - Copy the token"
    echo
    echo "6. Update your .env file:"
    echo "   JENKINS_URL=http://localhost:8080"
    echo "   JENKINS_USERNAME=admin"
    echo "   JENKINS_API_TOKEN=your_token_here"
}

# Main function
main() {
    print_status "Setting up local Jenkins for testing..."
    
    check_docker
    start_jenkins
    show_setup_instructions
    
    print_status "Local Jenkins setup completed!"
}

main "$@" 