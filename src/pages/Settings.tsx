
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagementTab from '@/components/settings/UserManagementTab';
import SmsIntegrationTab from '@/components/settings/SmsIntegrationTab';
import NotificationPreferencesTab from '@/components/settings/NotificationPreferencesTab';
import { User, MessageSquare, Bell, Smartphone, Server, LockKeyhole, Building } from 'lucide-react';
import RolesPermissionsTab from '@/components/settings/RolesPermissionsTab';
import SchoolSettingsTab from '@/components/settings/SchoolSettingsTab';
import BackupTab from '@/components/settings/BackupTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('user-management');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="user-management">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">User Management</span>
            <span className="md:hidden">Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles-permissions">
            <LockKeyhole className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Roles & Permissions</span>
            <span className="md:hidden">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="sms-settings">
            <Smartphone className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">SMS Integration</span>
            <span className="md:hidden">SMS</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
            <span className="md:hidden">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="school-info">
            <Building className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">School Information</span>
            <span className="md:hidden">School</span>
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Server className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Backup & Restore</span>
            <span className="md:hidden">Backup</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="user-management">
          <UserManagementTab />
        </TabsContent>
        
        <TabsContent value="roles-permissions">
          <RolesPermissionsTab />
        </TabsContent>
        
        <TabsContent value="sms-settings">
          <SmsIntegrationTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationPreferencesTab />
        </TabsContent>

        <TabsContent value="school-info">
          <SchoolSettingsTab />
        </TabsContent>

        <TabsContent value="backup">
          <BackupTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
