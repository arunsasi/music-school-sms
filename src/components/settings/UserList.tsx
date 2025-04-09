
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Edit, MoreHorizontal, Trash2, CheckSquare } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from '@/components/ui/checkbox';
import { UserRole } from '@/types';

type UserItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

interface UserListProps {
  users: UserItem[];
  onEditUser: (user: UserItem) => void;
  onDeleteUser: (user: UserItem) => void;
  onToggleUserStatus: (userId: string) => void;
  onBulkAction?: (action: string, userIds: string[]) => void;
}

const UserList: React.FC<UserListProps> = ({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onToggleUserStatus,
  onBulkAction 
}) => {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleUserSelect = (userId: string, isChecked: boolean) => {
    const newSelectedUsers = new Set(selectedUsers);
    
    if (isChecked) {
      newSelectedUsers.add(userId);
    } else {
      newSelectedUsers.delete(userId);
    }
    
    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    
    if (isChecked) {
      const allUserIds = users.map(user => user.id);
      setSelectedUsers(new Set(allUserIds));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleBulkAction = (action: string) => {
    if (onBulkAction && selectedUsers.size > 0) {
      onBulkAction(action, Array.from(selectedUsers));
    }
  };

  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
          No users found.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {selectedUsers.size > 0 && (
        <div className="flex items-center justify-between py-2 px-4 bg-muted/40 rounded-md mb-2">
          <div className="text-sm">
            {selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleBulkAction('activate')}
              className="text-xs"
            >
              <CheckCircle className="mr-1 h-3 w-3" />
              Activate
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleBulkAction('deactivate')}
              className="text-xs"
            >
              <XCircle className="mr-1 h-3 w-3" />
              Deactivate
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => handleBulkAction('delete')}
              className="text-xs"
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      )}
      {users.map((user) => (
        <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
          <TableCell className="w-10">
            <Checkbox
              checked={selectedUsers.has(user.id)}
              onCheckedChange={(checked: boolean) => handleUserSelect(user.id, checked)}
            />
          </TableCell>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell className="capitalize">{user.role}</TableCell>
          <TableCell>
            {user.active ? (
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-green-500">Active</span>
              </div>
            ) : (
              <div className="flex items-center">
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-red-500">Inactive</span>
              </div>
            )}
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditUser(user)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleUserStatus(user.id)}>
                  {user.active ? (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDeleteUser(user)}
                  className="text-destructive focus:text-destructive"
                >
                  <span className="flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default UserList;
