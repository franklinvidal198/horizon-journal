import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Camera, Save, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "John Trader",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    tradeAlerts: true,
    weeklyReport: false,
    marketNews: true,
  });

  const handleProfileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleNotificationChange = (field: string) => (checked: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: checked }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
  };

  const handleChangePassword = () => {
    console.log("Changing password");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <User className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="h-20 w-20 bg-gradient-primary rounded-full flex items-center justify-center glow-primary">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-accent p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <Separator className="bg-border/50" />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={handleProfileChange("name")}
                    className="bg-input/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange("email")}
                    className="bg-input/50 border-border/50"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveProfile}
                className="bg-gradient-primary hover:glow-primary transition-smooth"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Lock className="h-5 w-5 mr-2 text-accent" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={profileData.currentPassword}
                  onChange={handleProfileChange("currentPassword")}
                  className="bg-input/50 border-border/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profileData.newPassword}
                    onChange={handleProfileChange("newPassword")}
                    className="bg-input/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={handleProfileChange("confirmPassword")}
                    className="bg-input/50 border-border/50"
                  />
                </div>
              </div>
              <Button 
                onClick={handleChangePassword}
                variant="outline" 
                className="border-border/50"
              >
                <Shield className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Notifications */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Bell className="h-5 w-5 mr-2 text-secondary" />
                Notifications
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={handleNotificationChange("email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Trade Alerts</div>
                  <div className="text-sm text-muted-foreground">Get notified about trade status</div>
                </div>
                <Switch
                  checked={notifications.tradeAlerts}
                  onCheckedChange={handleNotificationChange("tradeAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Weekly Report</div>
                  <div className="text-sm text-muted-foreground">Weekly performance summary</div>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={handleNotificationChange("weeklyReport")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Market News</div>
                  <div className="text-sm text-muted-foreground">Important market updates</div>
                </div>
                <Switch
                  checked={notifications.marketNews}
                  onCheckedChange={handleNotificationChange("marketNews")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Account Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium text-foreground">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total trades</span>
                <span className="font-medium text-foreground">67</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Success rate</span>
                <span className="font-medium text-success">73.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account level</span>
                <span className="font-medium text-primary">Pro Trader</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}