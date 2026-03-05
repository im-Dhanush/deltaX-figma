import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, Users, Car, Calendar, TrendingUp, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
}

const navigationCards = [
  {
    id: 'dashboard',
    title: 'Business Manager Dashboard',
    description: 'View dealership performance, sales analytics, and lead conversion metrics.',
    icon: BarChart3,
    buttonText: 'Go to Dashboard',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 'leads',
    title: 'Sales Team Workspace',
    description: 'Manage customer leads and move them through the sales pipeline.',
    icon: Users,
    buttonText: 'View Leads',
    gradient: 'from-red-600 to-red-800',
  },
];

const overviewMetrics = [
  {
    title: 'Total Leads Today',
    value: '47',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Test Drives Scheduled',
    value: '12',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Cars Sold This Month',
    value: '156',
    icon: Car,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Conversion Rate',
    value: '32.4%',
    icon: TrendingUp,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="text-center space-y-3 pt-8">
        <h1 className="text-5xl text-slate-900">Welcome to DriveFlow CRM</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Your command center for managing leads, tracking sales, and growing your dealership
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
        {navigationCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className="border-2 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              onClick={() => onNavigate(card.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{card.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className={`w-full bg-gradient-to-r ${card.gradient} hover:opacity-90 group-hover:gap-3 transition-all`}
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(card.id);
                  }}
                >
                  {card.buttonText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dealership Overview Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl text-slate-900">Dealership Overview</h2>
          <p className="text-slate-500 mt-1">Quick snapshot of today's performance</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {overviewMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600">{metric.title}</p>
                    <p className="text-3xl text-slate-900">{metric.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl">Need help getting started?</h3>
                <p className="text-slate-300">
                  Check out our quick start guide or contact support for assistance
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="lg">
                  View Guide
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
