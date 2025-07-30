import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatusCard from "@/components/StatusCard";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  PieChart,
  BarChart3,
  AlertTriangle,
  Target
} from "lucide-react";

const CostAnalysis = () => {
  const costByService = [
    { name: "EC2 Instances", cost: 1240, percentage: 45, change: "+12%" },
    { name: "RDS Database", cost: 680, percentage: 25, change: "+5%" },
    { name: "ECS Services", cost: 420, percentage: 15, change: "+8%" },
    { name: "Load Balancers", cost: 180, percentage: 7, change: "0%" },
    { name: "S3 Storage", cost: 120, percentage: 4, change: "-2%" },
    { name: "CloudWatch", cost: 110, percentage: 4, change: "+15%" }
  ];

  const monthlyCosts = [
    { month: "Oct", cost: 2450 },
    { month: "Nov", cost: 2680 },
    { month: "Dec", cost: 2750 },
    { month: "Jan", cost: 2850 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cost Analysis</h1>
          <p className="text-muted-foreground">AWS spend tracking and optimization insights</p>
        </div>
        <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <DollarSign className="w-3 h-3 mr-1" />
          Real-time Tracking
        </Badge>
      </div>

      {/* Cost Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Monthly Spend"
          value="$2,850"
          status="info"
          icon={DollarSign}
          subtitle="Current month"
          change="+3.6%"
          trend="up"
        />
        <StatusCard
          title="Daily Average"
          value="$95"
          status="success"
          icon={Calendar}
          subtitle="Last 30 days"
          change="-2.1%"
          trend="down"
        />
        <StatusCard
          title="Budget Usage"
          value="76%"
          status="warning"
          icon={Target}
          subtitle="$3,750 budget"
          change="+4%"
          trend="up"
        />
        <StatusCard
          title="Cost Savings"
          value="$340"
          status="success"
          icon={TrendingDown}
          subtitle="This month"
          change="+12%"
          trend="up"
        />
      </div>

      {/* Monthly Trend and Service Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Monthly Cost Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyCosts.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{month.month} 2024</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">${month.cost.toLocaleString()}</span>
                    {index > 0 && (
                      <div className="flex items-center">
                        {month.cost > monthlyCosts[index - 1].cost ? (
                          <TrendingUp className="w-3 h-3 text-destructive" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-success" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-accent" />
              <span>Cost by Service</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costByService.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{service.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">${service.cost}</span>
                      <Badge 
                        variant={service.change.startsWith('+') ? 'destructive' : service.change.startsWith('-') ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {service.change}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={service.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {service.percentage}% of total spend
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Optimization Recommendations */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Cost Optimization Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Right-size EC2 Instances</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  3 instances are running with &lt;20% CPU utilization. Consider downsizing.
                </p>
                <Badge className="bg-success/20 text-success">Potential savings: $180/month</Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-info/10 border border-info/20">
              <Target className="w-5 h-5 text-info mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Reserved Instance Opportunities</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Convert 4 on-demand instances to reserved instances for predictable workloads.
                </p>
                <Badge className="bg-success/20 text-success">Potential savings: $420/month</Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <TrendingDown className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">S3 Storage Optimization</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Enable intelligent tiering for infrequently accessed data in S3.
                </p>
                <Badge className="bg-success/20 text-success">Potential savings: $45/month</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Compute Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average CPU</span>
                <span className="text-warning font-medium">34%</span>
              </div>
              <Progress value={34} className="h-2" />
              <p className="text-xs text-muted-foreground">
                EC2 instances underutilized
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Storage Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used Storage</span>
                <span className="text-success font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Good storage utilization
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Network Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bandwidth Usage</span>
                <span className="text-info font-medium">62%</span>
              </div>
              <Progress value={62} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Optimal network utilization
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostAnalysis;