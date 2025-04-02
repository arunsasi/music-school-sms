
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, MessageSquare } from 'lucide-react';

const schoolSettingsSchema = z.object({
  name: z.string().min(2, { message: 'School name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  phone: z.string().min(10, { message: 'Phone number should have at least 10 digits.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  description: z.string().optional(),
  currency: z.string({ required_error: 'Please select a currency.' }),
  timezone: z.string({ required_error: 'Please select a timezone.' }),
});

type SchoolSettingsValues = z.infer<typeof schoolSettingsSchema>;

const whatsappSettingsSchema = z.object({
  apiKey: z.string().min(1, { message: 'API key is required.' }),
  phoneNumber: z.string().min(10, { message: 'Phone number should have at least 10 digits.' }),
  enableWhatsapp: z.boolean().default(false),
  defaultMessage: z.string().optional(),
  notifyOnPayment: z.boolean().default(true),
  notifyOnAttendance: z.boolean().default(false),
  notifyOnExam: z.boolean().default(false),
});

type WhatsAppSettingsValues = z.infer<typeof whatsappSettingsSchema>;

const SchoolSettingsTab = () => {
  const [activeTab, setActiveTab] = React.useState('general');
  
  const {
    register: registerSchool,
    handleSubmit: handleSubmitSchool,
    setValue: setSchoolValue,
    formState: { errors: schoolErrors },
  } = useForm<SchoolSettingsValues>({
    resolver: zodResolver(schoolSettingsSchema),
    defaultValues: {
      name: 'Music School',
      address: '123 Main St, City, State, Country',
      phone: '(123) 456-7890',
      email: 'contact@musicschool.com',
      website: 'https://www.musicschool.com',
      description: 'A premier institution offering comprehensive music education.',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
    },
  });

  const {
    register: registerWhatsApp,
    handleSubmit: handleSubmitWhatsApp,
    formState: { errors: whatsappErrors },
  } = useForm<WhatsAppSettingsValues>({
    resolver: zodResolver(whatsappSettingsSchema),
    defaultValues: {
      apiKey: '',
      phoneNumber: '',
      enableWhatsapp: false,
      defaultMessage: 'Thank you for choosing Music School. For any queries, please contact us.',
      notifyOnPayment: true,
      notifyOnAttendance: false,
      notifyOnExam: false,
    },
  });

  const onSchoolSubmit = (data: SchoolSettingsValues) => {
    // In a real app, this would save to a database
    console.log('School settings data:', data);
    toast.success('School settings updated successfully');
  };

  const onWhatsAppSubmit = (data: WhatsAppSettingsValues) => {
    // In a real app, this would save to a database
    console.log('WhatsApp settings data:', data);
    toast.success('WhatsApp integration settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="whatsapp">
            <MessageSquare className="mr-2 h-4 w-4" />
            WhatsApp Integration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Update your school's general information and settings
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitSchool(onSchoolSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">School Name</Label>
                    <Input 
                      id="name" 
                      {...registerSchool('name')} 
                    />
                    {schoolErrors.name && (
                      <p className="text-sm text-destructive">{schoolErrors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...registerSchool('email')} 
                    />
                    {schoolErrors.email && (
                      <p className="text-sm text-destructive">{schoolErrors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      {...registerSchool('phone')} 
                    />
                    {schoolErrors.phone && (
                      <p className="text-sm text-destructive">{schoolErrors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      {...registerSchool('website')} 
                    />
                    {schoolErrors.website && (
                      <p className="text-sm text-destructive">{schoolErrors.website.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address" 
                      rows={3} 
                      {...registerSchool('address')} 
                    />
                    {schoolErrors.address && (
                      <p className="text-sm text-destructive">{schoolErrors.address.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select 
                      defaultValue="INR" 
                      onValueChange={(value) => setSchoolValue('currency', value)}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                    {schoolErrors.currency && (
                      <p className="text-sm text-destructive">{schoolErrors.currency.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      defaultValue="Asia/Kolkata" 
                      onValueChange={(value) => setSchoolValue('timezone', value)}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">India Standard Time</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                    {schoolErrors.timezone && (
                      <p className="text-sm text-destructive">{schoolErrors.timezone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">School Description</Label>
                    <Textarea 
                      id="description" 
                      rows={4} 
                      {...registerSchool('description')} 
                    />
                    {schoolErrors.description && (
                      <p className="text-sm text-destructive">{schoolErrors.description.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save School Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>
                Configure your WhatsApp Business API for sending notifications to students and parents
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitWhatsApp(onWhatsAppSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">WhatsApp Business API Key</Label>
                    <Input 
                      id="apiKey" 
                      {...registerWhatsApp('apiKey')} 
                      placeholder="Enter your WhatsApp API key"
                    />
                    {whatsappErrors.apiKey && (
                      <p className="text-sm text-destructive">{whatsappErrors.apiKey.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">WhatsApp Business Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      {...registerWhatsApp('phoneNumber')} 
                      placeholder="e.g. +917123456789"
                    />
                    {whatsappErrors.phoneNumber && (
                      <p className="text-sm text-destructive">{whatsappErrors.phoneNumber.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="defaultMessage">Default Message Template</Label>
                    <Textarea 
                      id="defaultMessage" 
                      {...registerWhatsApp('defaultMessage')} 
                      placeholder="Enter a default message template for WhatsApp notifications"
                      rows={4}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label className="block mb-2">Enable Notifications For</Label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifyOnPayment"
                          {...registerWhatsApp('notifyOnPayment')}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="notifyOnPayment" className="ml-2 text-sm">
                          Payment Confirmations & Receipts
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifyOnAttendance"
                          {...registerWhatsApp('notifyOnAttendance')}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="notifyOnAttendance" className="ml-2 text-sm">
                          Attendance Updates
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifyOnExam"
                          {...registerWhatsApp('notifyOnExam')}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="notifyOnExam" className="ml-2 text-sm">
                          Exam Schedules & Results
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex items-center space-x-2 pt-4">
                    <input
                      type="checkbox"
                      id="enableWhatsapp"
                      {...registerWhatsApp('enableWhatsapp')}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="enableWhatsapp" className="font-semibold">
                      Enable WhatsApp Integration
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save WhatsApp Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolSettingsTab;
