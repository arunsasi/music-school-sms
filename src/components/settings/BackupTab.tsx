
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Database, Save, Upload, Calendar, FileBarChart, Download, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// Mock backup data
const backupHistory = [
  { id: 1, date: '2023-10-15T08:30:00Z', size: '24.5 MB', status: 'completed', type: 'automatic' },
  { id: 2, date: '2023-10-08T08:30:00Z', size: '23.8 MB', status: 'completed', type: 'automatic' },
  { id: 3, date: '2023-10-01T12:15:00Z', size: '23.1 MB', status: 'completed', type: 'manual' },
  { id: 4, date: '2023-09-24T08:30:00Z', size: '22.7 MB', status: 'completed', type: 'automatic' },
];

const BackupTab = () => {
  const [activeTab, setActiveTab] = useState('backups');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  
  const handleBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast.success('Backup completed successfully');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleRestore = () => {
    toast.success('Restoration process started');
    setShowRestoreConfirm(false);
  };
  
  const handleDownloadBackup = (id: number) => {
    toast.success(`Downloading backup #${id}`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup & Restore</CardTitle>
          <CardDescription>
            Manage database backups and restore your data if needed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="backups" onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="backups">
                <Database className="mr-2 h-4 w-4" />
                Backups
              </TabsTrigger>
              <TabsTrigger value="restore">
                <Upload className="mr-2 h-4 w-4" />
                Restore
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="backups" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Backups include all your data such as students, classes, attendance, and financial records.
                  Automatic backups are performed weekly.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Backup Now</h3>
                <Button onClick={handleBackup} disabled={isBackingUp}>
                  <Save className="mr-2 h-4 w-4" />
                  {isBackingUp ? 'Backing up...' : 'Create Backup'}
                </Button>
              </div>
              
              {isBackingUp && (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Backup in progress...</span>
                    <span>{backupProgress}%</span>
                  </div>
                  <Progress value={backupProgress} className="h-2" />
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Backup History</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-muted/50 p-3 font-medium text-sm">
                    <div>Date</div>
                    <div>Type</div>
                    <div>Size</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-border">
                    {backupHistory.map((backup) => (
                      <div key={backup.id} className="grid grid-cols-5 p-3 text-sm items-center">
                        <div>{new Date(backup.date).toLocaleString()}</div>
                        <div className="capitalize">{backup.type}</div>
                        <div>{backup.size}</div>
                        <div className="capitalize">{backup.status}</div>
                        <div className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadBackup(backup.id)}
                          >
                            <Download className="mr-2 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="restore" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Restoring a backup will replace all current data. This action cannot be undone.
                  Make sure to create a backup of your current data before proceeding.
                </AlertDescription>
              </Alert>
              
              {!showRestoreConfirm ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Restore from Backup</h3>
                    <div className="space-y-2">
                      <Label htmlFor="backupFile">Select Backup File</Label>
                      <Input id="backupFile" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restoreOption">Restore Option</Label>
                      <Select defaultValue="complete">
                        <SelectTrigger id="restoreOption">
                          <SelectValue placeholder="Select restore option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="complete">Complete Restore</SelectItem>
                          <SelectItem value="students">Students Only</SelectItem>
                          <SelectItem value="classes">Classes Only</SelectItem>
                          <SelectItem value="finance">Financial Data Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRestoreConfirm(true)}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Prepare Restore
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Restore from Backup History</h3>
                    <div className="space-y-2">
                      <Label htmlFor="backupHistory">Select from Backup History</Label>
                      <Select>
                        <SelectTrigger id="backupHistory">
                          <SelectValue placeholder="Select a backup" />
                        </SelectTrigger>
                        <SelectContent>
                          {backupHistory.map((backup) => (
                            <SelectItem key={backup.id} value={backup.id.toString()}>
                              {new Date(backup.date).toLocaleString()} ({backup.size})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRestoreConfirm(true)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Restore from History
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 p-4 border border-destructive rounded-md">
                  <h3 className="text-lg font-medium text-destructive">Confirm Restoration</h3>
                  <p className="text-sm">
                    You are about to restore your database. This action will replace all current data
                    and cannot be undone. Are you sure you want to proceed?
                  </p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowRestoreConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleRestore}
                    >
                      Yes, Restore Now
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupTab;
