import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Users,
  DollarSign,
  Car,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
  Plus,
} from 'lucide-react';
import { LeadsTable } from './LeadsTable';

const statsCards = [
  {
    title: 'Total Leads',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Active Pipeline',
    value: '487',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'Revenue (MTD)',
    value: '$1.2M',
    change: '+23.1%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'text-emerald-600',
  },
  {
    title: 'Cars Sold',
    value: '156',
    change: '-3.4%',
    changeType: 'negative' as const,
    icon: Car,
    color: 'text-red-600',
  },
];

const leadsData = [
  { month: 'Jan', leads: 145, converted: 42 },
  { month: 'Feb', leads: 178, converted: 58 },
  { month: 'Mar', leads: 234, converted: 71 },
  { month: 'Apr', leads: 198, converted: 64 },
  { month: 'May', leads: 267, converted: 89 },
  { month: 'Jun', leads: 312, converted: 98 },
];

const pipelineData = [
  { stage: 'New Lead', count: 487, fill: '#3b82f6' },
  { stage: 'Contacted', count: 342, fill: '#8b5cf6' },
  { stage: 'Qualified', count: 234, fill: '#ec4899' },
  { stage: 'Test Drive', count: 156, fill: '#f59e0b' },
  { stage: 'Negotiation', count: 89, fill: '#10b981' },
  { stage: 'Closed Won', count: 67, fill: '#059669' },
];

const inventoryData = [
  { name: 'SUVs', value: 42 },
  { name: 'Sedans', value: 38 },
  { name: 'Trucks', value: 28 },
  { name: 'Coupes', value: 18 },
  { name: 'Electric', value: 14 },
];

const COLORS = ['#0F172A', '#DC2626', '#3b82f6', '#8b5cf6', '#10b981'];

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, John! Here's your sales overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-slate-600">{stat.title}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-slate-900">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Leads & Conversions</CardTitle>
            <CardDescription>Monthly lead generation and conversion tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#0F172A" strokeWidth={2} name="Total Leads" />
                <Line type="monotone" dataKey="converted" stroke="#DC2626" strokeWidth={2} name="Converted" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Stages */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Lead distribution across pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="stage" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#0F172A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Inventory & Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* Inventory Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hot Inventory</CardTitle>
            <CardDescription>Most requested vehicle types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Call Lead</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Send Email</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-sm">Schedule Test Drive</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Car className="w-5 h-5 text-red-600" />
                <span className="text-sm">Add Vehicle</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Latest customer inquiries and their status</CardDescription>
            </div>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <LeadsTable />
        </CardContent>
      </Card>
    </div>
  );
}
