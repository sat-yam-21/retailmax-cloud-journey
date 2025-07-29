import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StatusCard from "@/components/StatusCard";
import {
  Server,
  Database,
  Shield,
  Clock,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap
} from "lucide-react";

const Dashboard = () => {
  const migrationSteps = [
    { name: "Infrastructure Provisioning", status: "completed", progress: 100 },
    { name: "Application Containerization", status: "completed", progress: 100 },
    { name: "CI/CD Pipeline Setup", status: "in-progress", progress: 75 },
    { name: "Database Migration", status: "in-progress", progress: 60 },
    { name: "Load Testing", status: "pending", progress: 0 },
    { name: "Production Deployment", status: "pending", progress: 0 }
  ];

  const recentActivities = [
    { action: "Terraform apply completed", time: "2 minutes ago", status: "success" },
    { action: "Docker image built successfully", time: "5 minutes ago", status: "success" },
    { action: "Jenkins pipeline triggered", time: "12 minutes ago", status: "info" },
    { action: "ECS service scaling up", time: "18 minutes ago", status: "warning" },
    { action: "Database backup completed", time: "25 minutes ago", status: "success" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "in-progress": return "text-warning";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-success/20 text-success";
      case "warning": return "bg-warning/20 text-warning";
      case "info": return "bg-info/20 text-info";
      case "error": return "bg-destructive/20 text-destructive";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Migration Dashboard</h1>
          <p className="text-muted-foreground">RetailMax cloud migration progress and system status</p>
        </div>
        <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <Zap className="w-3 h-3 mr-1" />
          Migration Active
        </Badge>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Infrastructure"
          value="AWS Ready"
          status="success"
          icon={Server}
          subtitle="All resources provisioned"
          change="+12 resources"
          trend="up"
        />
        <StatusCard
          title="Deployments"
          value="24"
          status="info"
          icon={Activity}
          subtitle="This week"
          change="+18%"
          trend="up"
        />
        <StatusCard
          title="Uptime"
          value="99.8%"
          status="success"
          icon={Shield}
          subtitle="Last 30 days"
          change="+0.2%"
          trend="up"
        />
        <StatusCard
          title="Response Time"
          value="240ms"
          status="warning"
          icon={Clock}
          subtitle="Average"
          change="+15ms"
          trend="up"
        />
      </div>

      {/* Migration Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Migration Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {migrationSteps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {step.status === "completed" ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : step.status === "in-progress" ? (
                      <AlertCircle className="w-4 h-4 text-warning animate-pulse" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted" />
                    )}
                    <span className={`text-sm font-medium ${getStatusColor(step.status)}`}>
                      {step.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{step.progress}%</span>
                </div>
                <Progress value={step.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-accent" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${getActivityStatusColor(activity.status)}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Database className="w-4 h-4 text-info" />
              <span>Database Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Migration Progress</span>
                <span className="text-warning font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Tables migrated: 12/20
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-success" />
              <span>Active Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-success">1,247</div>
              <p className="text-xs text-muted-foreground">
                +12% from last hour
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span>Security Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">98/100</div>
              <p className="text-xs text-muted-foreground">
                Excellent security posture
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;