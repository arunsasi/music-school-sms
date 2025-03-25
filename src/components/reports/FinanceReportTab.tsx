
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockFinancialData = [
  { month: 'Jan', income: 520000, expenses: 380000, profit: 140000 },
  { month: 'Feb', income: 550000, expenses: 400000, profit: 150000 },
  { month: 'Mar', income: 600000, expenses: 420000, profit: 180000 },
  { month: 'Apr', income: 580000, expenses: 410000, profit: 170000 },
  { month: 'May', income: 620000, expenses: 430000, profit: 190000 },
  { month: 'Jun', income: 650000, expenses: 450000, profit: 200000 },
];

const mockFeeData = [
  { id: '1', student: 'Emily Johnson', class: 'Piano Beginners', amount: 12000, status: 'Paid', date: '2023-07-05' },
  { id: '2', student: 'Michael Chen', class: 'Piano Beginners', amount: 12000, status: 'Pending', date: '2023-07-15' },
  { id: '3', student: 'Sarah Williams', class: 'Piano Beginners', amount: 12000, status: 'Paid', date: '2023-07-03' },
  { id: '4', student: 'David Rodriguez', class: 'Violin Intermediate', amount: 15000, status: 'Paid', date: '2023-07-06' },
  { id: '5', student: 'Olivia Thompson', class: 'Violin Intermediate', amount: 15000, status: 'Pending', date: '2023-07-16' },
];

const mockSalaryData = [
  { id: '1', employee: 'John Smith', role: 'Piano Teacher', amount: 45000, status: 'Paid', date: '2023-06-30' },
  { id: '2', employee: 'Anna Wilson', role: 'Violin Teacher', amount: 40000, status: 'Paid', date: '2023-06-30' },
  { id: '3', employee: 'Robert Brown', role: 'Guitar Teacher', amount: 38000, status: 'Paid', date: '2023-06-30' },
  { id: '4', employee: 'Elena Garcia', role: 'Vocal Coach', amount: 42000, status: 'Paid', date: '2023-06-30' },
  { id: '5', employee: 'Thomas Lee', role: 'Drums Teacher', amount: 35000, status: 'Paid', date: '2023-06-30' },
];

const mockExpensesData = [
  { id: '1', description: 'Rent', amount: 150000, status: 'Paid', date: '2023-07-01' },
  { id: '2', description: 'Utilities', amount: 25000, status: 'Paid', date: '2023-07-05' },
  { id: '3', description: 'Instrument Repairs', amount: 35000, status: 'Paid', date: '2023-07-10' },
  { id: '4', description: 'Marketing', amount: 20000, status: 'Paid', date: '2023-07-15' },
  { id: '5', description: 'Office Supplies', amount: 8000, status: 'Paid', date: '2023-07-20' },
];

const mockIncomeSourceData = [
  { name: 'Piano Classes', value: 450000, color: '#8884d8' },
  { name: 'Violin Classes', value: 250000, color: '#82ca9d' },
  { name: 'Guitar Classes', value: 200000, color: '#ffc658' },
  { name: 'Vocal Classes', value: 150000, color: '#ff8042' },
  { name: 'Drums Classes', value: 50000, color: '#0088fe' },
];

const FinanceReportTab: React.FC = () => {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("month");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const exportReport = () => {
    console.log(`Exporting ${reportType} financial report...`);
    // In a real app, this would generate a CSV/PDF file
  };

  // Get data based on report type
  const getReportData = () => {
    switch (reportType) {
      case "fee":
        return mockFeeData;
      case "salary":
        return mockSalaryData;
      case "expense":
        return mockExpensesData;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 p-4 bg-card rounded-md border">
        <div className="space-y-2">
          <Label htmlFor="report-type">Report Type</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="report-type" className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Financial Overview</SelectItem>
              <SelectItem value="fee">Fee Collection</SelectItem>
              <SelectItem value="salary">Salary Payments</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-range">Date Range</Label>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger id="date-range" className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {dateRange === "custom" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[180px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[180px]"
              />
            </div>
          </>
        )}

        <div className="flex items-end">
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Overview Report */}
      {reportType === "overview" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>
                Income, expenses, and profit over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${(value).toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#8884d8" />
                    <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                    <Bar dataKey="profit" name="Profit" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Sources</CardTitle>
                    <CardDescription>Breakdown by class type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={mockIncomeSourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockIncomeSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${(value).toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>Key metrics for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Income:</span>
                        <span className="font-bold">₹{mockFinancialData.reduce((sum, item) => sum + item.income, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Expenses:</span>
                        <span className="font-bold">₹{mockFinancialData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Profit:</span>
                        <span className="font-bold text-green-600">₹{mockFinancialData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Average Monthly Income:</span>
                        <span className="font-bold">₹{(mockFinancialData.reduce((sum, item) => sum + item.income, 0) / mockFinancialData.length).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Pending Fee Collection:</span>
                        <span className="font-bold text-yellow-600">₹{mockFeeData.filter(fee => fee.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Fee Collection Report */}
      {reportType === "fee" && (
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Report</CardTitle>
            <CardDescription>
              Student fee payments and pending collections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{mockFeeData.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Collected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{mockFeeData.filter(fee => fee.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">
                      ₹{mockFeeData.filter(fee => fee.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFeeData.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.student}</TableCell>
                    <TableCell>{fee.class}</TableCell>
                    <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          fee.status === 'Paid' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {fee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(fee.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Salary Report */}
      {reportType === "salary" && (
        <Card>
          <CardHeader>
            <CardTitle>Salary Payment Report</CardTitle>
            <CardDescription>
              Employee salary disbursements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Total Salaries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{mockSalaryData.reduce((sum, salary) => sum + salary.amount, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{(mockSalaryData.reduce((sum, salary) => sum + salary.amount, 0) / mockSalaryData.length).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSalaryData.map((salary) => (
                  <TableRow key={salary.id}>
                    <TableCell className="font-medium">{salary.employee}</TableCell>
                    <TableCell>{salary.role}</TableCell>
                    <TableCell>₹{salary.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {salary.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(salary.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Expenses Report */}
      {reportType === "expense" && (
        <Card>
          <CardHeader>
            <CardTitle>Expense Report</CardTitle>
            <CardDescription>
              Breakdown of all expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{mockExpensesData.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium">Largest Expense</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{Math.max(...mockExpensesData.map(expense => expense.amount)).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mockExpensesData.find(expense => expense.amount === Math.max(...mockExpensesData.map(e => e.amount)))?.description}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExpensesData.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {expense.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinanceReportTab;
