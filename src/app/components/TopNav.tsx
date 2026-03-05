import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const onlineUsers = [
  { initials: 'JS', name: 'John Smith', color: 'bg-blue-600' },
  { initials: 'ED', name: 'Emma Davis', color: 'bg-purple-600' },
  { initials: 'MJ', name: 'Mike Johnson', color: 'bg-green-600' },
];

export function TopNav() {
  return (
    <div className="h-16 bg-white border-b border-slate-200 fixed top-0 left-64 right-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search leads, vehicles, or customers..."
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Online collaborators */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {onlineUsers.map((u) => (
                <div
                  key={u.initials}
                  title={`${u.name} is online`}
                  className={`w-7 h-7 rounded-full ${u.color} border-2 border-white flex items-center justify-center`}
                >
                  <span className="text-white text-xs leading-none">{u.initials}</span>
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500">3 online</span>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-slate-600" />
          </Button>

          <div className="h-8 w-px bg-slate-200" />

          <Button variant="ghost" className="gap-2">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-700 text-sm">JD</span>
            </div>
            <span className="text-sm">John Doe</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>
    </div>
  );
}
