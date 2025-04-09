
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, CheckSquare } from 'lucide-react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { UserRole } from '@/types';
import UserList from './UserList';
import UserFormDialog from './UserFormDialog';
import DeleteUserDialog from './DeleteUserDialog';
import UserSearchBar from './UserSearchBar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';

// Define a local User type to avoid conflicts with Supabase's User type
type UserItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserItem[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const { hasPermission } = useAuth();

  // Fetch users from Supabase on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('id, full_name, email, role, created_at')
          .order('created_at', { ascending: false });
          
        if (error) throw error;

        const formattedUsers = profiles.map(profile => ({
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          role: profile.role as UserRole,
          active: true // Assuming all users in the database are active
        }));
        
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  const handleCreateUser = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      if (selectedUser) {
        // Update existing user in Supabase
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: data.name,
            email: data.email,
            role: data.role,
            updated_at: new Date().toISOString() // Convert Date to string
          })
          .eq('id', selectedUser.id);
          
        if (profileError) throw profileError;
        
        // Update local state
        const updatedUsers = users.map(user => 
          user.id === selectedUser.id 
            ? { ...user, name: data.name, email: data.email, role: data.role, active: data.active }
            : user
        );
        setUsers(updatedUsers);
        toast.success('User updated successfully');
      } else {
        // Create new user in Supabase
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: data.email,
          password: data.password,
          email_confirm: true,
          user_metadata: {
            full_name: data.name,
            role: data.role
          }
        });
        
        if (authError) throw authError;
        
        // Add the new user to local state
        if (authData.user) {
          const newUser: UserItem = {
            id: authData.user.id,
            name: data.name,
            email: data.email,
            role: data.role,
            active: data.active,
          };
          setUsers([newUser, ...users]);
        }
        
        toast.success('User created successfully');
      }
    } catch (error: any) {
      console.error('Error creating/updating user:', error);
      toast.error(error.message || 'Failed to create/update user');
    } finally {
      setIsSubmitting(false);
      closeDialog();
    }
  };

  const handleEditUser = (user: UserItem) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (user: UserItem) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      // Delete the user from Supabase Auth
      const { error } = await supabase.auth.admin.deleteUser(selectedUser.id);
      
      if (error) throw error;
      
      // Update local state
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      
      toast.success('User deleted successfully');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // For now, just update the local state as Supabase doesn't have a direct "active" field
    // In a real application, you might want to update a custom field or use auth.updateUserById
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
    toast.success(`User ${user.active ? 'deactivated' : 'activated'} successfully`);
  };

  const handleBulkAction = async (action: string, userIds: string[]) => {
    if (userIds.length === 0) return;
    
    try {
      if (action === 'delete') {
        setSelectedUserIds(userIds);
        setIsBulkDeleteDialogOpen(true);
        return;
      }
      
      if (action === 'activate' || action === 'deactivate') {
        const isActive = action === 'activate';
        const updatedUsers = users.map(user => 
          userIds.includes(user.id) ? { ...user, active: isActive } : user
        );
        setUsers(updatedUsers);
        toast.success(`${userIds.length} users ${isActive ? 'activated' : 'deactivated'} successfully`);
      }
    } catch (error: any) {
      console.error(`Error during bulk ${action}:`, error);
      toast.error(`Failed to ${action} users`);
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedUserIds.length === 0) return;
    
    try {
      // In a real app, we would use a batch operation or transaction
      for (const userId of selectedUserIds) {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) throw error;
      }
      
      // Update local state
      const updatedUsers = users.filter(user => !selectedUserIds.includes(user.id));
      setUsers(updatedUsers);
      
      toast.success(`${selectedUserIds.length} users deleted successfully`);
    } catch (error: any) {
      console.error('Error deleting users:', error);
      toast.error(error.message || 'Failed to delete users');
    } finally {
      setIsBulkDeleteDialogOpen(false);
      setSelectedUserIds([]);
    }
  };

  const openCreateDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  // Check if user has permission to manage users
  if (!hasPermission('manage_employees')) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">You don't have permission to access this page.</p>
      </div>
    );
  }

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
                  <TableHead className="w-10">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableHead colSpan={6} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Loading users...
                      </div>
                    </TableHead>
                  </TableRow>
                ) : (
                  <UserList 
                    users={filteredUsers}
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                    onToggleUserStatus={handleToggleUserStatus}
                    onBulkAction={handleBulkAction}
                  />
                )}
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
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteUser}
        userName={selectedUser?.name || ''}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <DeleteUserDialog 
        isOpen={isBulkDeleteDialogOpen}
        onClose={() => setIsBulkDeleteDialogOpen(false)}
        onConfirm={confirmBulkDelete}
        userName={`${selectedUserIds.length} users`}
        isBulkDelete={true}
      />
    </div>
  );
};

export default UserManagementTab;
