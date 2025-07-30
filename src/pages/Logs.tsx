import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MonitorSpeaker,
  Search,
  Download,
  Filter,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Calendar
} from "lucide-react";

const Logs = () => {
  const logEntries = [
    {
      timestamp: "2024-01-30 14:23:45",
      level: "INFO",
      service: "web-server",
      message: "Successfully processed user authentication request",
      instance: "web-01"
    },
    {
      timestamp: "2024-01-30 14:23:44",
      level: "WARN",
      service: "database",
      message: "Connection pool approaching maximum capacity (85%)",
      instance: "db-primary"
    },
    {
      timestamp: "2024-01-30 14:23:43",
      level: "ERROR",
      service: "payment-gateway",
      message: "Failed to process payment transaction - timeout after 30s",
      instance: "payment-01"
    },
    {
      timestamp: "2024-01-30 14:23:42",
      level: "INFO",
      service: "cache",
      message: "Cache hit ratio: 94.2% - optimal performance",
      instance: "redis-01"
    },
    {
      timestamp: "2024-01-30 14:23:41",
      level: "DEBUG",
      service: "migration-tool",
      message: "Table migration progress: users table completed (15/20)",
      instance: "migration-worker"
    }
  ];

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR": return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "WARN": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "INFO": return <Info className="w-4 h-4 text-info" />;
      case "DEBUG": return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
      default: return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR": return "bg-destructive/20 text-destructive";
      case "WARN": return "bg-warning/20 text-warning";
      case "INFO": return "bg-info/20 text-info";
      case "DEBUG": return "bg-muted/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Logs</h1>
          <p className="text-muted-foreground">Real-time application and infrastructure logs</p>
        </div>
        <Badge className="bg-gradient-to-r from-accent to-primary text-primary-foreground">
          <MonitorSpeaker className="w-3 h-3 mr-1" />
          Live Streaming
        </Badge>
      </div>

      {/* Log Controls */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search logs..." 
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-background/50">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-background/50">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="web-server">Web Server</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="payment-gateway">Payment Gateway</SelectItem>
                <SelectItem value="cache">Cache</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Stream */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MonitorSpeaker className="w-5 h-5 text-accent" />
            <span>Live Log Stream</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logEntries.map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
                <div className="flex items-center space-x-2 min-w-0">
                  {getLogLevelIcon(log.level)}
                  <Badge className={`text-xs ${getLogLevelColor(log.level)}`}>
                    {log.level}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>{log.timestamp}</span>
                    <span>•</span>
                    <span className="font-medium">{log.service}</span>
                    <span>•</span>
                    <span>{log.instance}</span>
                  </div>
                  <p className="text-sm text-foreground">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-destructive/20 border border-destructive/20">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-destructive">3</p>
                <p className="text-xs text-muted-foreground">Last hour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-warning/20 border border-warning/20">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-warning">12</p>
                <p className="text-xs text-muted-foreground">Last hour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-info/20 border border-info/20">
                <Info className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Info</p>
                <p className="text-2xl font-bold text-info">1,247</p>
                <p className="text-xs text-muted-foreground">Last hour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-success/20 border border-success/20">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-success">1,262</p>
                <p className="text-xs text-muted-foreground">Last hour</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logs;