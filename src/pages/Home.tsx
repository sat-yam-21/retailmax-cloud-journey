import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Cloud,
  GitBranch,
  Activity,
  Shield,
  Server,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";

const Home = () => {
  const services = [
    {
      icon: Cloud,
      title: "AWS Infrastructure",
      description: "Automated provisioning with Terraform, VPC setup, EC2/ECS deployment, and security configuration."
    },
    {
      icon: GitBranch,
      title: "CI/CD Pipeline",
      description: "Jenkins-based continuous integration and deployment with automated testing and Docker containerization."
    },
    {
      icon: Activity,
      title: "Monitoring & Alerting",
      description: "Prometheus and Grafana integration for real-time metrics, performance monitoring, and incident alerts."
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "IAM roles, security groups, compliance monitoring, and automated security scanning."
    }
  ];

  const features = [
    { icon: CheckCircle, text: "Zero Downtime Migration" },
    { icon: Server, text: "Containerized Deployment" },
    { icon: Users, text: "Team Collaboration" },
    { icon: Clock, text: "24/7 Monitoring" },
    { icon: TrendingUp, text: "Performance Optimization" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Live Migration Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              RetailMax
              <span className="block text-primary">Cloud Migration</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Complete DevOps platform for migrating your e-commerce monolith to AWS cloud 
              with zero downtime. Automated infrastructure, CI/CD pipelines, and monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="min-w-48">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="min-w-48">
                  Login to Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Complete Migration Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to migrate, deploy, and monitor your applications on AWS
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose RetailMax Platform?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built for enterprise-grade e-commerce applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Technology Stack
          </h2>
          <p className="text-lg text-muted-foreground">
            Industry-leading tools and platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6">
            <h3 className="font-semibold text-lg mb-3">Infrastructure</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>AWS (VPC, EC2, ECS)</p>
              <p>Terraform</p>
              <p>Docker</p>
            </div>
          </Card>
          
          <Card className="text-center p-6">
            <h3 className="font-semibold text-lg mb-3">CI/CD</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Jenkins</p>
              <p>GitHub</p>
              <p>Ansible</p>
            </div>
          </Card>
          
          <Card className="text-center p-6">
            <h3 className="font-semibold text-lg mb-3">Monitoring</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Prometheus</p>
              <p>Grafana</p>
              <p>CloudWatch</p>
            </div>
          </Card>
          
          <Card className="text-center p-6">
            <h3 className="font-semibold text-lg mb-3">Security</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>IAM Roles</p>
              <p>Security Groups</p>
              <p>SSL/TLS</p>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Migrate to the Cloud?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your cloud migration journey with our automated platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="min-w-48">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/infrastructure">
              <Button variant="outline" size="lg" className="min-w-48">
                View Infrastructure
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;