
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, Plus, Save, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define mock permissions and roles
const mockPermissions = {
  users: {
    view: true,
    create: true,
    edit: true,
    delete: true,
  },
  students: {
    view: true,
    create: true,
    edit: true,
    delete: true,
  },
  classes: {
    view: true,
    create: true,
    edit: true,
    delete: true,
  },
  attendance: {
    view: true,
    create: true,
    edit: true,
    delete: false,
  },
  finance: {
    view: true,
    create: true,
    edit: true,
    delete: false,
  },
  reports: {
    view: true,
    create: false,
    edit: false,
    delete: false,
  },
  settings: {
    view: true,
    create: false,
    edit: true,
    delete: false,
  },
};

// Role definitions with default permissions
const rolePermissions = {
  admin: { ...mockPermissions },
  accounts: {
    users: { view: false, create: false, edit: false, delete: false },
    students: { view: true, create: true, edit: true, delete: false },
    classes: { view: true, create: false, edit: false, delete: false },
    attendance: { view: true, create: false, edit: false, delete: false },
    finance: { view: true, create: true, edit: true, delete: false },
    reports: { view: true, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  teacher: {
    users: { view: false, create: false, edit: false, delete: false },
    students: { view: true, create: false, edit: false, delete: false },
    classes: { view: true, create: false, edit: false, delete: false },
    attendance: { view: true, create: true, edit: true, delete: false },
    finance: { view: false, create: false, edit: false, delete: false },
    reports: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
};

const modules = [
  { id: 'users', label: 'User Management' },
  { id: 'students', label: 'Students' },
  { id: 'classes', label: 'Classes' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'finance', label: 'Finance' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

const actionTypes = [
  { id: 'view', label: 'View' },
  { id: 'create', label: 'Create' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

const RolesPermissionsTab = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [permissions, setPermissions] = useState({ ...rolePermissions });

  const handlePermissionChange = (
    role: string,
    module: string,
    action: string,
    checked: boolean
  ) => {
    setPermissions({
      ...permissions,
      [role]: {
        ...permissions[role as keyof typeof permissions],
        [module]: {
          ...permissions[role as keyof typeof permissions][module as keyof typeof mockPermissions],
          [action]: checked,
        },
      },
    });
  };

  const handleSavePermissions = () => {
    // In a real app, this would save to a database
    toast.success('Role permissions updated successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>
              Configure access rights for different user roles
            </CardDescription>
          </div>
          <Button onClick={handleSavePermissions}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" onValueChange={setSelectedRole}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Administrator</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>

            {Object.keys(rolePermissions).map((role) => (
              <TabsContent key={role} value={role}>
                <div className="mt-6">
                  <div className="rounded-md border bg-white">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="w-[200px]">Module</TableHead>
                          {actionTypes.map((action) => (
                            <TableHead key={action.id}>{action.label}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {modules.map((module) => (
                          <TableRow key={module.id}>
                            <TableCell className="font-medium">{module.label}</TableCell>
                            {actionTypes.map((action) => (
                              <TableCell key={action.id}>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`${role}-${module.id}-${action.id}`} 
                                    checked={permissions[role as keyof typeof permissions][module.id as keyof typeof mockPermissions][action.id as keyof typeof mockPermissions.users]}
                                    onCheckedChange={(checked) => {
                                      handlePermissionChange(
                                        role, 
                                        module.id, 
                                        action.id, 
                                        checked as boolean
                                      );
                                    }}
                                  />
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6 p-4 bg-muted rounded-md text-sm">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium">Permission Information</p>
                <p className="text-muted-foreground mt-1">
                  <strong>View:</strong> Allows users to see and access the module.<br />
                  <strong>Create:</strong> Allows users to add new records.<br />
                  <strong>Edit:</strong> Allows users to modify existing records.<br />
                  <strong>Delete:</strong> Allows users to remove records.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolesPermissionsTab;
