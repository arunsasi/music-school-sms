
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { UserRole } from '@/types';
import UserList from './UserList';
import UserFormDialog from './UserFormDialog';
import DeleteUserDialog from './DeleteUserDialog';
import UserSearchBar from './UserSearchBar';

// Define a restricted set of roles for the form
type FormUserRole = 'admin' | 'accounts' | 'teacher';

// Define mock users - would come from API in real app
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@musicschool.com', role: 'admin' as FormUserRole, active: true },
  { id: '2', name: 'Accounts User', email: 'accounts@musicschool.com', role: 'accounts' as FormUserRole, active: true },
  { id: '3', name: 'Teacher User', email: 'teacher@musicschool.com', role: 'teacher' as FormUserRole, active: true },
  { id: '4', name: 'Inactive User', email: 'inactive@musicschool.com', role: 'teacher' as FormUserRole, active: false },
];

type User = typeof mockUsers[0];

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleCreateUser = (data: any) => {
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, name: data.name, email: data.email, role: data.role, active: data.active }
          : user
      );
      setUsers(updatedUsers);
      toast.success('User updated successfully');
    } else {
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        role: data.role as FormUserRole,
        active: data.active,
      };
      setUsers([...users, newUser]);
      toast.success('User created successfully');
    }
    closeDialog();
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      toast.success('User deleted successfully');
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
    toast.success('User status updated');
  };

  const openCreateDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Create and manage user accounts
            </CardDescription>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <UserSearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </div>
          
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <UserList 
                  users={filteredUsers}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                  onToggleUserStatus={handleToggleUserStatus}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserFormDialog 
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleCreateUser}
        selectedUser={selectedUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteUser}
        userName={selectedUser?.name || ''}
      />
    </div>
  );
};

export default UserManagementTab;
