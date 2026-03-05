import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MoreHorizontal, Phone, Mail } from 'lucide-react';

const leads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    vehicle: '2024 Toyota Camry',
    stage: 'Qualified',
    priority: 'High',
    value: '$28,500',
    lastContact: '2 hours ago',
    initials: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '(555) 234-5678',
    vehicle: '2024 Honda CR-V',
    stage: 'Test Drive',
    priority: 'High',
    value: '$32,400',
    lastContact: '5 hours ago',
    initials: 'MC',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 345-6789',
    vehicle: '2023 Tesla Model 3',
    stage: 'Negotiation',
    priority: 'Medium',
    value: '$45,900',
    lastContact: '1 day ago',
    initials: 'ER',
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'dthompson@email.com',
    phone: '(555) 456-7890',
    vehicle: '2024 Ford F-150',
    stage: 'New Lead',
    priority: 'Low',
    value: '$52,300',
    lastContact: '2 days ago',
    initials: 'DT',
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    email: 'jmartinez@email.com',
    phone: '(555) 567-8901',
    vehicle: '2024 Mazda CX-5',
    stage: 'Contacted',
    priority: 'Medium',
    value: '$29,800',
    lastContact: '3 hours ago',
    initials: 'JM',
  },
  {
    id: 6,
    name: 'Robert Kim',
    email: 'rkim@email.com',
    phone: '(555) 678-9012',
    vehicle: '2024 BMW X5',
    stage: 'Qualified',
    priority: 'High',
    value: '$68,500',
    lastContact: '6 hours ago',
    initials: 'RK',
  },
];

const getStageColor = (stage: string) => {
  const colors: Record<string, string> = {
    'New Lead': 'bg-blue-100 text-blue-700',
    'Contacted': 'bg-purple-100 text-purple-700',
    'Qualified': 'bg-cyan-100 text-cyan-700',
    'Test Drive': 'bg-orange-100 text-orange-700',
    'Negotiation': 'bg-amber-100 text-amber-700',
    'Closed Won': 'bg-green-100 text-green-700',
  };
  return colors[stage] || 'bg-slate-100 text-slate-700';
};

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return colors[priority] || 'bg-slate-100 text-slate-700';
};

export function LeadsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Vehicle Interest</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Est. Value</TableHead>
          <TableHead>Last Contact</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-slate-900 text-white">
                    {lead.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-slate-900">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="w-4 h-4 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="w-4 h-4 text-slate-600" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-slate-900">{lead.vehicle}</div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className={getStageColor(lead.stage)}>
                {lead.stage}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getPriorityColor(lead.priority)}>
                {lead.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-slate-900">{lead.value}</TableCell>
            <TableCell className="text-slate-500">{lead.lastContact}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
