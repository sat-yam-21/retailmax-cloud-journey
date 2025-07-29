import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/StatusCard";
import {
  Server,
  Database,
  Shield,
  Network,
  HardDrive,
  Cpu,
  MemoryStick,
  Cloud,
  ExternalLink,
  RefreshCw
} from "lucide-react";

const Infrastructure = () => {
  const awsResources = [
    { 
      name: "VPC - RetailMax-Production", 
      type: "Network", 
      status: "running", 
      region: "us-east-1",
      cost: "$45.20/month"
    },
    { 
      name: "ECS Cluster - RetailMax-App", 
      type: "Compute", 
      status: "running", 
      region: "us-east-1",
      cost: "$234.80/month"
    },
    { 
      name: "RDS PostgreSQL", 
      type: "Database", 
      status: "running", 
      region: "us-east-1",
      cost: "$156.40/month"
    },
    { 
      name: "Application Load Balancer", 
      type: "Network", 
      status: "running", 
      region: "us-east-1",
      cost: "$22.50/month"
    },
    { 
      name: "CloudFront Distribution", 
      type: "CDN", 
      status: "running", 
      region: "Global",
      cost: "$18.90/month"
    },
    { 
      name: "S3 Bucket - Static Assets", 
      type: "Storage", 
      status: "running", 
      region: "us-east-1",
      cost: "$8.30/month"
    }
  ];

  const securityGroups = [
    { name: "Web-Tier-SG", rules: 5, status: "active" },
    { name: "App-Tier-SG", rules: 8, status: "active" },
    { name: "DB-Tier-SG", rules: 3, status: "active" },
    { name: "ALB-SG", rules: 6, status: "active" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": case "active": return "bg-success/20 text-success";
      case "stopped": return "bg-destructive/20 text-destructive";
      case "pending": return "bg-warning/20 text-warning";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Infrastructure</h1>
          <p className="text-muted-foreground">AWS resources and infrastructure status</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            AWS Console
          </Button>
        </div>
      </div>

      {/* Infrastructure Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="EC2 Instances"
          value="6"
          status="success"
          icon={Server}
          subtitle="All running"
          change="No changes"
          trend="neutral"
        />
        <StatusCard
          title="ECS Services"
          value="3"
          status="success"
          icon={Cloud}
          subtitle="Healthy"
          change="+1 new"
          trend="up"
        />
        <StatusCard
          title="RDS Instances"
          value="2"
          status="success"
          icon={Database}
          subtitle="Available"
          change="No changes"
          trend="neutral"
        />
        <StatusCard
          title="Security Groups"
          value="12"
          status="info"
          icon={Shield}
          subtitle="Configured"
          change="+2 updated"
          trend="neutral"
        />
      </div>

      {/* AWS Resources */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-accent" />
            <span>AWS Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resource</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cost</th>
                </tr>
              </thead>
              <tbody>
                {awsResources.map((resource, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{resource.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{resource.region}</td>
                    <td className="py-3 px-4 font-medium text-foreground">{resource.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Utilization */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-info" />
              <span>Resource Utilization</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">CPU Usage</span>
                </div>
                <span className="text-sm font-medium text-warning">68%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{width: "68%"}}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MemoryStick className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Memory Usage</span>
                </div>
                <span className="text-sm font-medium text-success">45%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{width: "45%"}}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Storage Usage</span>
                </div>
                <span className="text-sm font-medium text-info">32%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-info h-2 rounded-full" style={{width: "32%"}}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Network I/O</span>
                </div>
                <span className="text-sm font-medium text-primary">28%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: "28%"}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Groups */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Security Groups</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityGroups.map((sg, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium text-foreground">{sg.name}</div>
                    <div className="text-sm text-muted-foreground">{sg.rules} rules configured</div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(sg.status)}`}>
                    {sg.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Infrastructure;