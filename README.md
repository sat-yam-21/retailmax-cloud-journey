# RetailMax Cloud Journey - Infrastructure & Deployment

This repository contains the complete infrastructure and deployment setup for the RetailMax application, implementing a modern cloud-native architecture with zero-downtime deployments.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub        │    │   Jenkins       │    │   AWS ECR       │
│   Repository    │───▶│   CI/CD         │───▶│   Container     │
│                 │    │   Pipeline      │    │   Registry      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Prometheus    │    │   AWS ECS       │    │   Application   │
│   Monitoring    │◀───│   Fargate       │◀───│   Load Balancer │
│   & Grafana     │    │   Service       │    │   (ALB)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform >= 1.0
- Docker >= 20.10
- Ansible >= 2.9
- Jenkins >= 2.375
- Node.js >= 18

### 1. Infrastructure Setup

```bash
# Navigate to infrastructure directory
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Plan the infrastructure
terraform plan

# Apply the infrastructure
terraform apply

# Get outputs
terraform output
```

### 2. Build and Push Docker Image

```bash
# Build the Docker image
docker build -t retailmax:latest .

# Tag for ECR (replace with your ECR repository URL)
docker tag retailmax:latest <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/retailmax:latest

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com

# Push to ECR
docker push <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/retailmax:latest
```

### 3. Deploy with Ansible

```bash
# Set environment variables
export APP_SERVER_IP="your-app-server-ip"
export ECR_REPO_URL="your-ecr-repo-url"
export MONITORING_SERVER_IP="your-monitoring-server-ip"

# Deploy application
ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/deploy.yml

# Setup monitoring
ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/setup-monitoring.yml
```

### 4. Configure Jenkins Pipeline

1. Create a new Jenkins pipeline job
2. Configure the pipeline to use the `Jenkinsfile` from this repository
3. Set up GitHub webhook for automatic builds
4. Configure AWS credentials in Jenkins

## 📁 Project Structure

```
retailmax-cloud-journey/
├── infrastructure/
│   └── terraform/
│       ├── main.tf          # Main infrastructure configuration
│       ├── variables.tf     # Variable definitions
│       └── outputs.tf       # Output values
├── ansible/
│   ├── inventory/
│   │   └── hosts.yml        # Ansible inventory
│   ├── playbooks/
│   │   ├── deploy.yml       # Application deployment
│   │   └── setup-monitoring.yml # Monitoring setup
│   └── templates/
│       ├── prometheus.yml.j2
│       └── grafana-dashboard.json.j2
├── monitoring/
│   ├── prometheus.yml       # Prometheus configuration
│   └── grafana/
│       └── provisioning/
│           ├── datasources/
│           └── dashboards/
├── Dockerfile               # Multi-stage Docker build
├── nginx.conf              # Nginx configuration
├── docker-compose.yml      # Local development setup
├── Jenkinsfile             # CI/CD pipeline
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

```bash
# AWS Configuration
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key

# Application Configuration
export APP_SERVER_IP=your-app-server-ip
export ECR_REPO_URL=your-ecr-repo-url
export MONITORING_SERVER_IP=your-monitoring-server-ip
export JENKINS_SERVER_IP=your-jenkins-server-ip
```

### Terraform Variables

Create a `terraform.tfvars` file:

```hcl
aws_region = "us-east-1"
project_name = "retailmax"
vpc_cidr = "10.0.0.0/16"
task_cpu = 256
task_memory = 512
service_desired_count = 2
service_min_count = 1
service_max_count = 10
```

## 🐳 Docker Configuration

### Local Development

```bash
# Start all services locally
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Build

```bash
# Build production image
docker build -t retailmax:latest .

# Run production container
docker run -p 8080:8080 retailmax:latest
```

## 📊 Monitoring Setup

### Prometheus Configuration

The monitoring stack includes:
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **Node Exporter**: System metrics
- **Custom Application Metrics**: Application-specific monitoring

### Access Monitoring

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)
- **Application Health**: http://localhost:8080/health

## 🔄 CI/CD Pipeline

### Jenkins Pipeline Stages

1. **Checkout**: Clone repository
2. **Install Dependencies**: npm ci
3. **Lint**: Code quality checks
4. **Test**: Run test suite
5. **Build Docker Image**: Create container image
6. **Push to ECR**: Upload to AWS ECR
7. **Update ECS Task Definition**: Update container image
8. **Deploy to ECS**: Zero-downtime deployment
9. **Health Check**: Verify deployment success

### GitHub Webhook Setup

1. Go to your GitHub repository settings
2. Add webhook pointing to your Jenkins server
3. Configure to trigger on push events
4. Set content type to application/json

## 🛡️ Security Best Practices

- All resources are deployed in private subnets
- Security groups restrict access to necessary ports only
- IAM roles follow principle of least privilege
- Container runs as non-root user
- HTTPS/TLS encryption for all external traffic
- Regular security updates and patches

## 📈 Auto Scaling

The infrastructure includes:
- ECS Service Auto Scaling based on CPU utilization
- Target tracking scaling policy (70% CPU threshold)
- Minimum 1, Maximum 10 tasks
- Health checks ensure only healthy instances receive traffic

## 🔍 Troubleshooting

### Common Issues

1. **Docker Build Fails**
   ```bash
   # Check Docker daemon
   docker info
   
   # Clean up Docker cache
   docker system prune -a
   ```

2. **Terraform Apply Fails**
   ```bash
   # Check AWS credentials
   aws sts get-caller-identity
   
   # Validate Terraform configuration
   terraform validate
   ```

3. **Application Not Accessible**
   ```bash
   # Check ECS service status
   aws ecs describe-services --cluster retailmax-cluster --services retailmax-service
   
   # Check ALB health
   aws elbv2 describe-target-health --target-group-arn <target-group-arn>
   ```

4. **Monitoring Not Working**
   ```bash
   # Check Prometheus targets
   curl http://localhost:9090/api/v1/targets
   
   # Check Grafana datasource
   curl http://localhost:3000/api/health
   ```

## 📚 Additional Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Ansible Documentation](https://docs.ansible.com/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the documentation links provided
