import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/StatusCard";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  Bell,
  Eye
} from "lucide-react";

const Monitoring = () => {
  const alerts = [
    {
      id: "ALT-001",
      severity: "critical",
      title: "High CPU Usage",
      description: "ECS service CPU utilization above 85%",
      timestamp: "2 minutes ago",
      status: "firing"
    },
    {
      id: "ALT-002", 
      severity: "warning",
      title: "Database Connection Pool",
      description: "PostgreSQL connection pool 80% utilized",
      timestamp: "15 minutes ago",
      status: "firing"
    },
    {
      id: "ALT-003",
      severity: "info",
      title: "Deployment Completed",
      description: "v2.1.4 successfully deployed to production",
      timestamp: "2 hours ago",
      status: "resolved"
    },
    {
      id: "ALT-004",
      severity: "warning",
      title: "Disk Space Low",
      description: "EBS volume /data at 78% capacity",
      timestamp: "4 hours ago", 
      status: "acknowledged"
    }
  ];

  const metrics = [
    { name: "Response Time", value: "245ms", change: "+12ms", trend: "up", color: "warning" },
    { name: "Throughput", value: "1,247 req/s", change: "+5.2%", trend: "up", color: "success" },
    { name: "Error Rate", value: "0.12%", change: "-0.03%", trend: "down", color: "success" },
    { name: "Availability", value: "99.8%", change: "0%", trend: "neutral", color: "success" }
  ];

  const systemHealth = [
    { component: "Web Servers", status: "healthy", uptime: "99.9%", instances: "6/6" },
    { component: "Application Servers", status: "healthy", uptime: "99.8%", instances: "4/4" },
    { component: "Database", status: "warning", uptime: "98.5%", instances: "2/2" },
    { component: "Cache Layer", status: "healthy", uptime: "99.9%", instances: "3/3" },
    { component: "Load Balancer", status: "healthy", uptime: "100%", instances: "2/2" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive/20 text-destructive border-destructive/30";
      case "warning": return "bg-warning/20 text-warning border-warning/30";
      case "info": return "bg-info/20 text-info border-info/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-success/20 text-success";
      case "warning": return "bg-warning/20 text-warning";
      case "critical": return "bg-destructive/20 text-destructive";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case "firing": return "bg-destructive/20 text-destructive";
      case "acknowledged": return "bg-warning/20 text-warning";
      case "resolved": return "bg-success/20 text-success";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitoring</h1>
          <p className="text-muted-foreground">System metrics, alerts, and performance monitoring</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Grafana
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alert Manager
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="CPU Usage"
          value="68%"
          status="warning"
          icon={Cpu}
          subtitle="Average across cluster"
          change="+5%"
          trend="up"
        />
        <StatusCard
          title="Memory Usage"
          value="45%"
          status="success"
          icon={MemoryStick}
          subtitle="Available: 22GB"
          change="-2%"
          trend="down"
        />
        <StatusCard
          title="Active Alerts"
          value="3"
          status="warning"
          icon={AlertTriangle}
          subtitle="2 critical, 1 warning"
          change="+1"
          trend="up"
        />
        <StatusCard
          title="Uptime"
          value="99.8%"
          status="success"
          icon={Clock}
          subtitle="Last 30 days"
          change="+0.1%"
          trend="up"
        />
      </div>

      {/* Application Metrics */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Application Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-lg border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className={`w-5 h-5 ${metric.color === "success" ? "text-success" : "text-warning"}`} />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="w-5 h-5 text-success" />
                  ) : (
                    <Activity className="w-5 h-5 text-info" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{metric.name}</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    metric.trend === "up" && metric.color === "success" ? "text-success" :
                    metric.trend === "up" ? "text-warning" :
                    metric.trend === "down" ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Active Alerts</span>
              <Badge className="bg-warning/20 text-warning ml-auto">
                {alerts.filter(alert => alert.status === "firing").length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                      <span className="text-sm font-medium">{alert.id}</span>
                    </div>
                    <Badge className={`text-xs ${getAlertStatusColor(alert.status)}`}>
                      {alert.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">{alert.title}</div>
                  <div className="text-sm text-muted-foreground mb-2">{alert.description}</div>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-success" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      component.status === "healthy" ? "bg-success" :
                      component.status === "warning" ? "bg-warning" : "bg-destructive"
                    }`} />
                    <div>
                      <div className="font-medium text-foreground">{component.component}</div>
                      <div className="text-sm text-muted-foreground">
                        Uptime: {component.uptime} • Instances: {component.instances}
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(component.status)}`}>
                    {component.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage Over Time */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-accent" />
            <span>Resource Usage Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2">
                <Cpu className="w-4 h-4" />
                <span>CPU Usage (24h)</span>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak</span>
                  <span className="text-warning font-medium">89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average</span>
                  <span className="text-foreground">68%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="text-success">42%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2">
                <MemoryStick className="w-4 h-4" />
                <span>Memory Usage (24h)</span>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak</span>
                  <span className="text-info font-medium">67%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average</span>
                  <span className="text-foreground">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="text-success">28%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2">
                <HardDrive className="w-4 h-4" />
                <span>Disk I/O (24h)</span>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak</span>
                  <span className="text-warning font-medium">156 MB/s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average</span>
                  <span className="text-foreground">89 MB/s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="text-success">23 MB/s</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;