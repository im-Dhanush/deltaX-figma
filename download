import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Percent,
  Car,
  Award,
  Target,
  ArrowUp,
  ArrowDown,
  Clock,
} from 'lucide-react';

const metricCards = [
  {
    title: 'Total Leads Today',
    value: '47',
    change: '+18.2%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    trend: 'vs yesterday',
  },
  {
    title: 'Monthly Leads',
    value: '1,284',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    trend: 'vs last month',
  },
  {
    title: 'Conversion Rate',
    value: '32.4%',
    change: '+4.3%',
    changeType: 'positive' as const,
    icon: Percent,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    trend: 'vs last month',
  },
  {
    title: 'Cars Sold',
    value: '156',
    change: '-3.2%',
    changeType: 'negative' as const,
    icon: Car,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    trend: 'vs last month',
  },
];

const leadsBySource = [
  { source: 'Website', leads: 487, fill: '#0F172A' },
  { source: 'Phone Call', leads: 342, fill: '#DC2626' },
  { source: 'Facebook', leads: 234, fill: '#3b82f6' },
  { source: 'Google Ads', leads: 198, fill: '#8b5cf6' },
  { source: 'Walk-in', leads: 156, fill: '#10b981' },
  { source: 'Referral', leads: 124, fill: '#f59e0b' },
];

const salesFunnelData = [
  { stage: 'New Leads', count: 1284, fill: '#3b82f6', percentage: 100 },
  { stage: 'Contacted', count: 982, fill: '#8b5cf6', percentage: 76 },
  { stage: 'Qualified', count: 687, fill: '#ec4899', percentage: 54 },
  { stage: 'Test Drive', count: 423, fill: '#f59e0b', percentage: 33 },
  { stage: 'Negotiation', count: 256, fill: '#10b981', percentage: 20 },
  { stage: 'Converted', count: 156, fill: '#059669', percentage: 12 },
];

const teamPerformance = [
  {
    id: 1,
    name: 'John Smith',
    initials: 'JS',
    role: 'Senior Sales Rep',
    leads: 89,
    converted: 42,
    revenue: '$1,247,500',
    conversionRate: 47.2,
    rank: 1,
  },
  {
    id: 2,
    name: 'Emma Davis',
    initials: 'ED',
    role: 'Sales Representative',
    leads: 76,
    converted: 34,
    revenue: '$986,300',
    conversionRate: 44.7,
    rank: 2,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    initials: 'MJ',
    role: 'Sales Representative',
    leads: 82,
    converted: 31,
    revenue: '$892,100',
    conversionRate: 37.8,
    rank: 3,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    initials: 'SW',
    role: 'Junior Sales Rep',
    leads: 64,
    converted: 22,
    revenue: '$634,800',
    conversionRate: 34.4,
    rank: 4,
  },
  {
    id: 5,
    name: 'David Brown',
    initials: 'DB',
    role: 'Sales Representative',
    leads: 58,
    converted: 19,
    revenue: '$548,200',
    conversionRate: 32.8,
    rank: 5,
  },
];

const monthlySalesTrend = [
  { month: 'Sep', sales: 124, revenue: 3.2, leads: 892 },
  { month: 'Oct', sales: 142, revenue: 3.8, leads: 1045 },
  { month: 'Nov', sales: 156, revenue: 4.1, leads: 1123 },
  { month: 'Dec', sales: 189, revenue: 4.9, leads: 1267 },
  { month: 'Jan', sales: 167, revenue: 4.3, leads: 1156 },
  { month: 'Feb', sales: 178, revenue: 4.6, leads: 1198 },
];

const getRankBadgeColor = (rank: number) => {
  if (rank === 1) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
  if (rank === 2) return 'bg-slate-200 text-slate-700 border-slate-300';
  if (rank === 3) return 'bg-orange-100 text-orange-700 border-orange-300';
  return 'bg-slate-100 text-slate-600 border-slate-200';
};

export function BusinessManagerView() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900">Business Manager Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Comprehensive analytics and team performance overview
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>Last updated: March 5, 2026</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      metric.changeType === 'positive'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {metric.changeType === 'positive' ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-600">{metric.title}</p>
                  <p className="text-3xl text-slate-900">{metric.value}</p>
                  <p className="text-xs text-slate-500">{metric.trend}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leads by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Distribution of lead acquisition channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={leadsBySource} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="source" type="category" stroke="#64748b" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="leads" radius={[0, 4, 4, 0]}>
                  {leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead progression through sales pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salesFunnelData.map((stage, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-700">{stage.stage}</span>
                    <span className="text-sm text-slate-900">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="relative h-10 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-lg flex items-center justify-end pr-4 text-white text-sm transition-all"
                      style={{
                        width: `${stage.percentage}%`,
                        backgroundColor: stage.fill,
                      }}
                    >
                      {stage.percentage > 15 && (
                        <span className="font-medium">{stage.count}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600">Overall Conversion Rate</p>
                  <p className="text-2xl text-slate-900 mt-1">12.2%</p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">+2.4%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sales Team Performance Leaderboard */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Team Performance</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </div>
              <Target className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Badge
                    variant="outline"
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${getRankBadgeColor(
                      member.rank
                    )}`}
                  >
                    #{member.rank}
                  </Badge>

                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-slate-900 text-white">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h4 className="text-sm text-slate-900">{member.name}</h4>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xs text-slate-500">Leads</p>
                    <p className="text-sm text-slate-900">{member.leads}</p>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xs text-slate-500">Converted</p>
                    <p className="text-sm text-slate-900">{member.converted}</p>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xs text-slate-500">Conv. Rate</p>
                    <p className="text-sm text-slate-900">{member.conversionRate}%</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">Revenue</p>
                    <p className="text-sm text-slate-900">{member.revenue}</p>
                  </div>

                  {member.rank === 1 && (
                    <Award className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlySalesTrend}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#0F172A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                  name="Cars Sold"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Avg. Monthly Sales</p>
                <p className="text-xl text-slate-900 mt-1">161</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-red-600">Revenue/Month</p>
                <p className="text-xl text-red-600 mt-1">$4.3M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Test Drives</p>
                <p className="text-2xl text-slate-900 mt-1">23</p>
                <p className="text-xs text-slate-500 mt-1">Scheduled this week</p>
              </div>
              <Car className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Response Time</p>
                <p className="text-2xl text-slate-900 mt-1">4.2 hrs</p>
                <p className="text-xs text-green-600 mt-1">12% faster than last month</p>
              </div>
              <Clock className="w-10 h-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Customer Satisfaction</p>
                <p className="text-2xl text-slate-900 mt-1">4.8/5</p>
                <p className="text-xs text-slate-500 mt-1">Based on 247 reviews</p>
              </div>
              <Award className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
