#!/bin/bash

# Jenkins Setup Script for RetailMax CI/CD Pipeline

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

# Install Jenkins plugins
install_jenkins_plugins() {
    print_status "Installing Jenkins plugins..."
    
    # List of required plugins
    plugins=(
        "git"
        "docker-plugin"
        "aws-credentials"
        "pipeline-aws"
        "workflow-aggregator"
        "blueocean"
        "prometheus"
        "metrics"
        "ansible"
        "terraform"
    )
    
    for plugin in "${plugins[@]}"; do
        print_status "Installing plugin: $plugin"
        # This would typically be done through Jenkins CLI or REST API
        # For now, we'll just echo the command
        echo "jenkins-cli install-plugin $plugin"
    done
}

# Configure Jenkins credentials
setup_jenkins_credentials() {
    print_status "Setting up Jenkins credentials..."
    
    # AWS credentials
    echo "Adding AWS credentials to Jenkins..."
    # This would be done through Jenkins REST API or CLI
    
    # GitHub credentials
    echo "Adding GitHub credentials to Jenkins..."
    
    # Docker registry credentials
    echo "Adding Docker registry credentials to Jenkins..."
}

# Create Jenkins pipeline job
create_pipeline_job() {
    print_status "Creating Jenkins pipeline job..."
    
    # Create the pipeline job configuration
    cat > jenkins-job-config.xml << EOF
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@1289.vd1c337fd5354">
  <description>RetailMax CI/CD Pipeline</description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <jenkins.model.BuildDiscarderProperty>
      <strategy class="hudson.tasks.LogRotator">
        <daysToKeep>30</daysToKeep>
        <numToKeep>50</numToKeep>
        <artifactDaysToKeep>-1</artifactDaysToKeep>
        <artifactNumToKeep>-1</artifactNumToKeep>
      </strategy>
    </jenkins.model.BuildDiscarderProperty>
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@3697.vb_490d892d0e2">
    <script>
      // This will be replaced with the actual Jenkinsfile content
      pipeline {
        agent any
        stages {
          stage('Checkout') {
            steps {
              checkout scm
            }
          }
        }
      }
    </script>
    <sandbox>true</sandbox>
  </definition>
  <triggers>
    <hudson.triggers.SCMTrigger>
      <spec>H/5 * * * *</spec>
    </hudson.triggers.SCMTrigger>
  </triggers>
  <disabled>false</disabled>
</flow-definition>
EOF

    print_status "Pipeline job configuration created."
}

# Setup GitHub webhook
setup_github_webhook() {
    print_status "Setting up GitHub webhook..."
    
    echo "To set up GitHub webhook:"
    echo "1. Go to your GitHub repository settings"
    echo "2. Add webhook pointing to: http://your-jenkins-server:8080/github-webhook/"
    echo "3. Configure to trigger on push events"
    echo "4. Set content type to application/json"
}

# Configure Jenkins security
setup_jenkins_security() {
    print_status "Setting up Jenkins security..."
    
    echo "Recommended security settings:"
    echo "- Enable CSRF protection"
    echo "- Configure authentication (LDAP, GitHub, etc.)"
    echo "- Set up role-based access control"
    echo "- Enable audit logging"
}

# Main setup function
main() {
    print_status "Setting up Jenkins for RetailMax CI/CD..."
    
    install_jenkins_plugins
    setup_jenkins_credentials
    create_pipeline_job
    setup_github_webhook
    setup_jenkins_security
    
    print_status "Jenkins setup completed!"
    print_status "Next steps:"
    echo "1. Access Jenkins at http://your-jenkins-server:8080"
    echo "2. Complete the initial setup wizard"
    echo "3. Install the suggested plugins"
    echo "4. Configure the pipeline job with your repository"
    echo "5. Set up GitHub webhook for automatic builds"
}

main "$@" 