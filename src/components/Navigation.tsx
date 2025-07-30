import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Cloud,
  GitBranch,
  Activity,
  DollarSign,
  Settings,
  Zap,
  Menu,
  X,
  Server,
  MonitorSpeaker
} from "lucide-react";

const navigationItems = [
  { 
    name: "Overview", 
    href: "/", 
    icon: LayoutDashboard,
    description: "Migration dashboard"
  },
  { 
    name: "Infrastructure", 
    href: "/infrastructure", 
    icon: Cloud,
    description: "AWS resources status"
  },
  { 
    name: "CI/CD Pipeline", 
    href: "/pipeline", 
    icon: GitBranch,
    description: "Jenkins & deployments"
  },
  { 
    name: "Monitoring", 
    href: "/monitoring", 
    icon: Activity,
    description: "Metrics & alerts"
  },
  { 
    name: "Cost Analysis", 
    href: "/costs", 
    icon: DollarSign,
    description: "AWS spend tracking"
  },
  { 
    name: "Logs", 
    href: "/logs", 
    icon: MonitorSpeaker,
    description: "System & application logs"
  }
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Server className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">RetailMax</h1>
                <p className="text-xs text-muted-foreground">Cloud Migration Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2 transition-all duration-200",
                      isActive && "bg-secondary/80 shadow-md"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Settings */}
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                      isActive 
                        ? "bg-secondary text-secondary-foreground" 
                        : "hover:bg-muted"
                    )}>
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;