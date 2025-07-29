import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  GitCommit,
  Package,
  Rocket,
  AlertTriangle
} from "lucide-react";

const Pipeline = () => {
  const pipelineRuns = [
    {
      id: "#1247",
      commit: "feat: add user analytics dashboard",
      branch: "main",
      status: "success",
      duration: "4m 32s",
      timestamp: "2 hours ago",
      triggeredBy: "john.doe"
    },
    {
      id: "#1246", 
      commit: "fix: resolve payment gateway timeout",
      branch: "hotfix/payment-fix",
      status: "running",
      duration: "2m 15s",
      timestamp: "12 minutes ago",
      triggeredBy: "jane.smith"
    },
    {
      id: "#1245",
      commit: "refactor: optimize database queries",
      branch: "feature/db-optimization", 
      status: "failed",
      duration: "6m 8s",
      timestamp: "1 day ago",
      triggeredBy: "mike.jones"
    },
    {
      id: "#1244",
      commit: "docs: update API documentation",
      branch: "docs/api-update",
      status: "success", 
      duration: "3m 45s",
      timestamp: "2 days ago",
      triggeredBy: "sarah.wilson"
    }
  ];

  const pipelineStages = [
    { name: "Code Checkout", status: "completed", duration: "15s" },
    { name: "Build & Test", status: "completed", duration: "2m 30s" },
    { name: "Security Scan", status: "completed", duration: "45s" },
    { name: "Docker Build", status: "running", duration: "1m 20s" },
    { name: "Deploy to Staging", status: "pending", duration: "-" },
    { name: "Integration Tests", status: "pending", duration: "-" },
    { name: "Deploy to Production", status: "pending", duration: "-" }
  ];

  const deploymentHistory = [
    { version: "v2.1.4", environment: "Production", status: "success", time: "3 hours ago" },
    { version: "v2.1.3", environment: "Staging", status: "success", time: "6 hours ago" },
    { version: "v2.1.2", environment: "Production", status: "success", time: "1 day ago" },
    { version: "v2.1.1", environment: "Staging", status: "failed", time: "2 days ago" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": case "completed": return <CheckCircle className="w-4 h-4 text-success" />;
      case "failed": return <XCircle className="w-4 h-4 text-destructive" />;
      case "running": return <Clock className="w-4 h-4 text-warning animate-pulse" />;
      case "pending": return <Clock className="w-4 h-4 text-muted-foreground" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": case "completed": return "bg-success/20 text-success";
      case "failed": return "bg-destructive/20 text-destructive";
      case "running": return "bg-warning/20 text-warning";
      case "pending": return "bg-muted/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CI/CD Pipeline</h1>
          <p className="text-muted-foreground">Jenkins automation and deployment status</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <GitBranch className="w-4 h-4 mr-2" />
            View Branches
          </Button>
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Run Pipeline
          </Button>
        </div>
      </div>

      {/* Current Pipeline Status */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitCommit className="w-5 h-5 text-accent" />
            <span>Current Pipeline - Build #1246</span>
            <Badge className="bg-warning/20 text-warning ml-auto">
              <Clock className="w-3 h-3 mr-1" />
              Running
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2m 15s</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">hotfix/payment-fix</div>
                <div className="text-sm text-muted-foreground">Branch</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">jane.smith</div>
                <div className="text-sm text-muted-foreground">Triggered By</div>
              </div>
            </div>

            <div className="space-y-3">
              {pipelineStages.map((stage, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border/50">
                  {getStatusIcon(stage.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{stage.name}</span>
                      <span className="text-sm text-muted-foreground">{stage.duration}</span>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(stage.status)}`}>
                    {stage.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline History & Deployments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Pipeline Runs */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-info" />
              <span>Recent Pipeline Runs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineRuns.map((run, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  {getStatusIcon(run.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{run.id}</span>
                      <Badge variant="outline" className="text-xs">
                        {run.branch}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{run.commit}</div>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                      <span>{run.duration}</span>
                      <span>•</span>
                      <span>{run.timestamp}</span>
                      <span>•</span>
                      <span>{run.triggeredBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployment History */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-primary" />
              <span>Deployment History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deploymentHistory.map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(deployment.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{deployment.version}</span>
                        <Badge variant="outline" className="text-xs">
                          {deployment.environment}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{deployment.time}</div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(deployment.status)}`}>
                    {deployment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Configuration */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Pipeline Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Build Configuration</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• Node.js 18.x</div>
                <div>• Docker Multi-stage</div>
                <div>• Unit Tests Required</div>
                <div>• Code Coverage 80%+</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Security Checks</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• SAST Scanning</div>
                <div>• Dependency Audit</div>
                <div>• Container Vulnerability</div>
                <div>• Secret Detection</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Deployment Rules</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• Auto-deploy to Staging</div>
                <div>• Manual Production</div>
                <div>• Rollback on Failure</div>
                <div>• Health Check Required</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pipeline;