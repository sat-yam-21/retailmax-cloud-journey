import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  change?: string;
  status: "success" | "warning" | "error" | "info";
  icon: LucideIcon;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}

const StatusCard = ({ 
  title, 
  value, 
  change, 
  status, 
  icon: Icon, 
  subtitle,
  trend = "neutral" 
}: StatusCardProps) => {
  const statusStyles = {
    success: "text-success border-success/20 bg-success/10",
    warning: "text-warning border-warning/20 bg-warning/10", 
    error: "text-destructive border-destructive/20 bg-destructive/10",
    info: "text-info border-info/20 bg-info/10"
  };

  const trendColors = {
    up: "text-success",
    down: "text-destructive", 
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg border",
              statusStyles[status]
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {change && (
            <Badge 
              variant="secondary" 
              className={cn("text-xs", trendColors[trend])}
            >
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;