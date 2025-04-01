
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

const SmsIntegrationTab = () => {
  const [smsApiKey, setSmsApiKey] = useState('');
  const [absenceNotification, setAbsenceNotification] = useState(true);
  const [announcementNotification, setAnnouncementNotification] = useState(true);

  const handleSaveApiSettings = () => {
    toast.success('SMS API settings saved successfully');
  };

  return (
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
  );
};

export default SmsIntegrationTab;
