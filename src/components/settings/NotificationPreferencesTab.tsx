
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';

const NotificationPreferencesTab = () => {
  return (
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
  );
};

export default NotificationPreferencesTab;
