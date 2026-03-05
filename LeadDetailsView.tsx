import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
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
  Cell,
} from 'recharts';
import {
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Car,
  BarChart3,
} from 'lucide-react';

// Lead Source Performance Data
const leadSourceData = [
  {
    source: 'Website',
    leadsGenerated: 487,
    contacted: 389,
    converted: 156,
    conversionRate: 32.0,
    revenue: '$4,524,800',
    avgDealSize: '$29,000',
    trend: 'up',
    trendValue: '+12%',
  },
  {
    source: 'Phone Call',
    leadsGenerated: 342,
    contacted: 298,
    converted: 128,
    conversionRate: 37.4,
    revenue: '$3,968,000',
    avgDealSize: '$31,000',
    trend: 'up',
    trendValue: '+8%',
  },
  {
    source: 'Facebook',
    leadsGenerated: 234,
    contacted: 187,
    converted: 67,
    conversionRate: 28.6,
    revenue: '$1,876,500',
    avgDealSize: '$28,000',
    trend: 'down',
    trendValue: '-5%',
  },
  {
    source: 'Google Ads',
    leadsGenerated: 198,
    contacted: 156,
    converted: 54,
    conversionRate: 27.3,
    revenue: '$1,674,000',
    avgDealSize: '$31,000',
    trend: 'up',
    trendValue: '+18%',
  },
  {
    source: 'Walk-in',
    leadsGenerated: 156,
    contacted: 142,
    converted: 89,
    conversionRate: 57.1,
    revenue: '$2,758,000',
    avgDealSize: '$31,000',
    trend: 'up',
    trendValue: '+3%',
  },
  {
    source: 'Referral',
    leadsGenerated: 124,
    contacted: 118,
    converted: 78,
    conversionRate: 62.9,
    revenue: '$2,652,000',
    avgDealSize: '$34,000',
    trend: 'up',
    trendValue: '+22%',
  },
];

// Salesperson Performance Data
const salespersonData = [
  {
    name: 'John Smith',
    leadsAssigned: 89,
    carsSold: 42,
    conversionRate: 47.2,
    revenue: '$1,247,500',
    avgResponseTime: '2.3 hrs',
    testDrives: 56,
    status: 'Exceeding',
  },
  {
    name: 'Emma Davis',
    leadsAssigned: 76,
    carsSold: 34,
    conversionRate: 44.7,
    revenue: '$986,300',
    avgResponseTime: '3.1 hrs',
    testDrives: 48,
    status: 'Exceeding',
  },
  {
    name: 'Mike Johnson',
    leadsAssigned: 82,
    carsSold: 31,
    conversionRate: 37.8,
    revenue: '$892,100',
    avgResponseTime: '4.2 hrs',
    testDrives: 44,
    status: 'Meeting',
  },
  {
    name: 'Sarah Williams',
    leadsAssigned: 64,
    carsSold: 22,
    conversionRate: 34.4,
    revenue: '$634,800',
    avgResponseTime: '5.1 hrs',
    testDrives: 32,
    status: 'Meeting',
  },
  {
    name: 'David Brown',
    leadsAssigned: 58,
    carsSold: 19,
    conversionRate: 32.8,
    revenue: '$548,200',
    avgResponseTime: '6.3 hrs',
    testDrives: 28,
    status: 'Below',
  },
  {
    name: 'Lisa Anderson',
    leadsAssigned: 47,
    carsSold: 18,
    conversionRate: 38.3,
    revenue: '$521,400',
    avgResponseTime: '3.8 hrs',
    testDrives: 26,
    status: 'Meeting',
  },
];

// Customer Interest Analysis Data
const customerInterestData = [
  { model: 'Toyota Camry', count: 187, revenue: '$5,234,000', fill: '#0F172A' },
  { model: 'Honda CR-V', count: 156, revenue: '$4,876,000', fill: '#DC2626' },
  { model: 'Tesla Model 3', count: 134, revenue: '$6,432,000', fill: '#3b82f6' },
  { model: 'Ford F-150', count: 128, revenue: '$6,784,000', fill: '#8b5cf6' },
  { model: 'BMW X5', count: 98, revenue: '$6,234,000', fill: '#10b981' },
  { model: 'Mazda CX-5', count: 87, revenue: '$2,598,000', fill: '#f59e0b' },
  { model: 'Audi Q5', count: 76, revenue: '$4,104,000', fill: '#ec4899' },
  { model: 'Chevrolet Silverado', count: 68, revenue: '$3,672,000', fill: '#14b8a6' },
];

// Monthly Revenue Trends Data
const monthlyRevenueTrends = [
  { month: 'Aug 2025', revenue: 3.2, leads: 892, sales: 124, avgDeal: 25.8 },
  { month: 'Sep 2025', revenue: 3.8, leads: 1045, sales: 142, avgDeal: 26.8 },
  { month: 'Oct 2025', revenue: 4.1, leads: 1123, sales: 156, avgDeal: 26.3 },
  { month: 'Nov 2025', revenue: 4.9, leads: 1267, sales: 189, avgDeal: 25.9 },
  { month: 'Dec 2025', revenue: 4.3, leads: 1156, sales: 167, avgDeal: 25.7 },
  { month: 'Jan 2026', revenue: 4.6, leads: 1198, sales: 178, avgDeal: 25.8 },
  { month: 'Feb 2026', revenue: 5.2, leads: 1284, sales: 198, avgDeal: 26.3 },
  { month: 'Mar 2026', revenue: 5.8, leads: 1421, sales: 212, avgDeal: 27.4 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Exceeding':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Meeting':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Below':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export function AnalyticsView() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [leadSource, setLeadSource] = useState('all');
  const [carModel, setCarModel] = useState('all');
  const [salesperson, setSalesperson] = useState('all');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900">Advanced Analytics</h1>
          <p className="text-slate-500 mt-1">Deep insights into sales performance and trends</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            {/* Date Range Filter */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-6-months">Last 6 months</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lead Source Filter */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Lead Source</label>
              <Select value={leadSource} onValueChange={setLeadSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="walkin">Walk-in</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Car Model Filter */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Car Model</label>
              <Select value={carModel} onValueChange={setCarModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  <SelectItem value="camry">Toyota Camry</SelectItem>
                  <SelectItem value="crv">Honda CR-V</SelectItem>
                  <SelectItem value="model3">Tesla Model 3</SelectItem>
                  <SelectItem value="f150">Ford F-150</SelectItem>
                  <SelectItem value="x5">BMW X5</SelectItem>
                  <SelectItem value="cx5">Mazda CX-5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Salesperson Filter */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Salesperson</label>
              <Select value={salesperson} onValueChange={setSalesperson}>
                <SelectTrigger>
                  <SelectValue placeholder="Select salesperson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Salespeople</SelectItem>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="emma">Emma Davis</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                  <SelectItem value="sarah">Sarah Williams</SelectItem>
                  <SelectItem value="david">David Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Leads</p>
                <p className="text-3xl text-slate-900 mt-1">1,541</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">+15.3% from last period</span>
                </div>
              </div>
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-3xl text-slate-900 mt-1">$5.8M</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">+23.1% from last period</span>
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Conversion</p>
                <p className="text-3xl text-slate-900 mt-1">38.7%</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">+4.2% from last period</span>
                </div>
              </div>
              <BarChart3 className="w-10 h-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Deal Size</p>
                <p className="text-3xl text-slate-900 mt-1">$27,400</p>
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs">-2.1% from last period</span>
                </div>
              </div>
              <Car className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Source Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Source Performance</CardTitle>
          <CardDescription>Detailed breakdown of lead generation and conversion by source</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Source</TableHead>
                <TableHead className="text-right">Leads Generated</TableHead>
                <TableHead className="text-right">Contacted</TableHead>
                <TableHead className="text-right">Converted</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Avg Deal Size</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadSourceData.map((source) => (
                <TableRow key={source.source}>
                  <TableCell className="font-medium">{source.source}</TableCell>
                  <TableCell className="text-right">{source.leadsGenerated}</TableCell>
                  <TableCell className="text-right">{source.contacted}</TableCell>
                  <TableCell className="text-right">{source.converted}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        source.conversionRate >= 50
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : source.conversionRate >= 30
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {source.conversionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{source.revenue}</TableCell>
                  <TableCell className="text-right">{source.avgDealSize}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        source.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {source.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm">{source.trendValue}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Salesperson Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salesperson Performance</CardTitle>
          <CardDescription>Individual performance metrics and KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Salesperson</TableHead>
                <TableHead className="text-right">Leads Assigned</TableHead>
                <TableHead className="text-right">Cars Sold</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Avg Response Time</TableHead>
                <TableHead className="text-right">Test Drives</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salespersonData.map((person) => (
                <TableRow key={person.name}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell className="text-right">{person.leadsAssigned}</TableCell>
                  <TableCell className="text-right">{person.carsSold}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        person.conversionRate >= 40
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : person.conversionRate >= 35
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {person.conversionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{person.revenue}</TableCell>
                  <TableCell className="text-right">{person.avgResponseTime}</TableCell>
                  <TableCell className="text-right">{person.testDrives}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={getStatusColor(person.status)}>
                      {person.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Customer Interest Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Interest Analysis</CardTitle>
            <CardDescription>Most popular car models by lead count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={customerInterestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="model" stroke="#64748b" fontSize={11} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {customerInterestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trends</CardTitle>
            <CardDescription>Revenue growth over the last 8 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyRevenueTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#64748b" label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#DC2626"
                  strokeWidth={3}
                  dot={{ fill: '#DC2626', r: 5 }}
                  name="Revenue ($M)"
                />
                <Line
                  type="monotone"
                  dataKey="avgDeal"
                  stroke="#0F172A"
                  strokeWidth={2}
                  dot={{ fill: '#0F172A', r: 4 }}
                  name="Avg Deal ($K)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 text-white">
        <CardContent className="p-6">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Key Insights & Recommendations
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-slate-300 mb-1">Best Performing Source</p>
              <p className="text-lg">Referral (62.9% conversion)</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-slate-300 mb-1">Top Salesperson</p>
              <p className="text-lg">John Smith (47.2% conversion)</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-slate-300 mb-1">Highest Demand</p>
              <p className="text-lg">Toyota Camry (187 leads)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
