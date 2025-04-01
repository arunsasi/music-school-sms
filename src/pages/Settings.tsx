
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagementTab from '@/components/settings/UserManagementTab';
import SmsIntegrationTab from '@/components/settings/SmsIntegrationTab';
import NotificationPreferencesTab from '@/components/settings/NotificationPreferencesTab';
import { User, MessageSquare, Bell, Smartphone } from 'lucide-react';

const Settings = () => {
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
          <UserManagementTab />
        </TabsContent>
        
        <TabsContent value="sms-settings">
          <SmsIntegrationTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationPreferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
