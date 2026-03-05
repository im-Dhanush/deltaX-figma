import { Home, Users, Kanban, BarChart3, LineChart } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home',      label: 'Home',      icon: Home,     description: '' },
  { id: 'leads',     label: 'Leads',     icon: Users,    description: 'Lead Listing' },
  { id: 'pipeline',  label: 'Pipeline',  icon: Kanban,   description: 'Lead Management' },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Business Manager' },
  { id: 'analytics', label: 'Analytics', icon: LineChart, description: 'Advanced Analytics' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Kanban className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl">DriveFlow CRM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="text-sm block leading-tight">{item.label}</span>
                    {item.description && (
                      <span className={`text-xs block leading-tight ${isActive ? 'text-red-200' : 'text-slate-500'}`}>
                        {item.description}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">JD</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div className="flex-1">
            <div className="text-white text-sm">John Doe</div>
            <div className="text-slate-400 text-xs">Sales Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}
