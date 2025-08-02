pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY = 'retailmax'
        ECS_CLUSTER = 'retailmax-cluster'
        ECS_SERVICE = 'retailmax-service'
        ECS_TASK_DEFINITION = 'retailmax-task'
        DOCKER_IMAGE = 'retailmax:latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Lint') {
            steps {
                script {
                    sh 'npm run lint'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Add your test commands here
                    echo 'Running tests...'
                    // sh 'npm test'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    
                    // Tag for ECR
                    sh "docker tag ${DOCKER_IMAGE} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest"
                    sh "docker tag ${DOCKER_IMAGE} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${BUILD_NUMBER}"
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                script {
                    // Login to ECR
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                    
                    // Push images to ECR
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest"
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${BUILD_NUMBER}"
                }
            }
        }
        
        stage('Update ECS Task Definition') {
            steps {
                script {
                    // Get current task definition
                    sh "aws ecs describe-task-definition --task-definition ${ECS_TASK_DEFINITION} --region ${AWS_REGION} > task-definition.json"
                    
                    // Update image in task definition
                    sh """
                        jq '.taskDefinition | .containerDefinitions[0].image = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${BUILD_NUMBER}" | {containerDefinitions: .containerDefinitions, family: .family, taskRoleArn: .taskRoleArn, executionRoleArn: .executionRoleArn, networkMode: .networkMode, requiresCompatibilities: .requiresCompatibilities, cpu: .cpu, memory: .memory}' task-definition.json > new-task-definition.json
                    """
                    
                    // Register new task definition
                    sh "aws ecs register-task-definition --cli-input-json file://new-task-definition.json --region ${AWS_REGION}"
                }
            }
        }
        
        stage('Deploy to ECS') {
            steps {
                script {
                    // Update ECS service with new task definition
                    sh "aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --task-definition ${ECS_TASK_DEFINITION} --region ${AWS_REGION}"
                    
                    // Wait for deployment to complete
                    sh """
                        aws ecs wait services-stable \
                            --cluster ${ECS_CLUSTER} \
                            --services ${ECS_SERVICE} \
                            --region ${AWS_REGION}
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // Get ALB DNS name from Terraform outputs or environment variable
                    def alb_dns = env.ALB_DNS_NAME ?: 'your-alb-dns-name'
                    
                    // Wait for application to be ready
                    sh "sleep 30"
                    
                    // Perform health check
                    sh "curl -f http://${alb_dns}/health || exit 1"
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images
            sh "docker rmi ${DOCKER_IMAGE} || true"
            sh "docker rmi ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest || true"
            sh "docker rmi ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${BUILD_NUMBER} || true"
            
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
} 