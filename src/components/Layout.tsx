import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Trades",
    href: "/trades",
    icon: TrendingUp,
  },
  {
    name: "Statistics",
    href: "/stats",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState('real');
  const [modeLoading, setModeLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetch('/api/v1/system/mode')
      .then(res => res.json())
      .then(data => setMode(data.mode));
  }, []);

  const handleModeChange = async (newMode: string) => {
    setModeLoading(true);
    await fetch('/api/v1/system/mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: newMode })
    });
    setMode(newMode);
    setModeLoading(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarOpen ? 280 : 80,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-sidebar glass border-r border-sidebar-border relative z-10"
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
              <motion.div
                className="flex items-center space-x-3"
                animate={{ opacity: sidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                {sidebarOpen && (
                  <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    TradeJournal
                  </h1>
                )}
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={cn(
                          "flex items-center px-3 py-3 rounded-lg transition-smooth",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground glow-primary"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {sidebarOpen && (
                          <motion.span
                            className="ml-3 font-medium"
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Data Mode Toggle Section */}
            <div className="px-4 py-4 border-t border-sidebar-border">
              <div className="mb-2">
                <span className="text-xs text-muted-foreground">Data Mode:</span>
                <div className="mt-1 flex flex-col gap-1">
                  {['test', 'real', 'seed'].map(m => (
                    <Button
                      key={m}
                      variant={mode === m ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full text-left"
                      disabled={modeLoading}
                      onClick={() => handleModeChange(m)}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                      {mode === m && ' (Active)'}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent mt-2"
                onClick={() => { logout(); navigate('/login'); }}
              >
                <LogOut className="h-4 w-4" />
                {sidebarOpen && <span className="ml-3">Sign Out</span>}
              </Button>
            </div>
          </div>

          {/* Toggle button */}
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="ghost"
            size="sm"
            className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar glass"
          >
            {sidebarOpen ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
          </Button>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-card/50 glass border-b border-border backdrop-blur-xl">
            <div className="flex h-full items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Trading Journal 2090
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full glow-primary" />
                </Button>
                
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-gradient-primary hover:glow-primary transition-smooth"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trade
                </Button>

                <div className="h-8 w-8 bg-gradient-secondary rounded-full glow-secondary" />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;