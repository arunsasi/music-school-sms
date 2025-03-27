
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, User, MessageSquare, Bell, Smartphone } from 'lucide-react';

const Settings = () => {
  const [smsApiKey, setSmsApiKey] = useState('');
  const [absenceNotification, setAbsenceNotification] = useState(true);
  const [announcementNotification, setAnnouncementNotification] = useState(true);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('teacher');

  const handleSaveApiSettings = () => {
    toast.success('SMS API settings saved successfully');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    toast.success('User created successfully');
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('teacher');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      <Tabs defaultValue="user-management" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="user-management">
            <User className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="sms-settings">
            <Smartphone className="mr-2 h-4 w-4" />
            SMS Integration
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="user-management">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Create new user accounts and assign roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="John Doe" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="john@example.com" 
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUserRole} onValueChange={setNewUserRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="accounts">Accounts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  <User className="mr-2 h-4 w-4" />
                  Create User
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sms-settings">
          <Card>
            <CardHeader>
              <CardTitle>SMS Integration</CardTitle>
              <CardDescription>
                Configure SMS settings for notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smsApiKey">SMS API Key</Label>
                <Input 
                  id="smsApiKey" 
                  value={smsApiKey}
                  onChange={(e) => setSmsApiKey(e.target.value)}
                  placeholder="Enter your SMS API key" 
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMS Notification Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="absence-notification">Absence Notification</Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS to parents when a student is marked absent
                    </p>
                  </div>
                  <Switch 
                    id="absence-notification"
                    checked={absenceNotification}
                    onCheckedChange={setAbsenceNotification}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="announcement-notification">Announcement Notification</Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS for important announcements
                    </p>
                  </div>
                  <Switch 
                    id="announcement-notification"
                    checked={announcementNotification}
                    onCheckedChange={setAnnouncementNotification}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveApiSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save SMS Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications in the browser
                  </p>
                </div>
                <Switch id="browser-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="fee-reminders">Fee Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminders for upcoming fee payments
                  </p>
                </div>
                <Switch id="fee-reminders" defaultChecked />
              </div>
              
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
