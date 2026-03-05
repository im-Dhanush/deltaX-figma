export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Test Drive Scheduled'
  | 'Not Interested'
  | 'Converted';

export type LeadSource =
  | 'Website'
  | 'Phone Call'
  | 'Facebook'
  | 'Twitter'
  | 'Google Ads'
  | 'Walk-in'
  | 'Referral';

export interface Lead {
  id: number;
  name: string;
  initials: string;
  phone: string;
  email: string;
  source: LeadSource;
  carModel: string;
  budget: string;
  location: string;
  score: number;
  status: LeadStatus;
  salesperson: string;
  lastContacted: string;
  assignedRole: string;
}

export const ALL_LEADS: Lead[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    initials: 'SJ',
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com',
    source: 'Website',
    carModel: '2024 Toyota Camry',
    budget: '$25,000 – $30,000',
    location: 'San Francisco, CA',
    score: 92,
    status: 'Qualified',
    salesperson: 'John Smith',
    lastContacted: '2 hours ago',
    assignedRole: 'Senior Sales Rep',
  },
  {
    id: 2,
    name: 'Michael Chen',
    initials: 'MC',
    phone: '(555) 234-5678',
    email: 'mchen@email.com',
    source: 'Phone Call',
    carModel: '2024 Honda CR-V',
    budget: '$30,000 – $35,000',
    location: 'Oakland, CA',
    score: 88,
    status: 'Test Drive Scheduled',
    salesperson: 'Emma Davis',
    lastContacted: '5 hours ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    initials: 'ER',
    phone: '(555) 345-6789',
    email: 'emily.r@email.com',
    source: 'Facebook',
    carModel: '2023 Tesla Model 3',
    budget: '$40,000 – $50,000',
    location: 'San Jose, CA',
    score: 95,
    status: 'Qualified',
    salesperson: 'John Smith',
    lastContacted: '1 day ago',
    assignedRole: 'Senior Sales Rep',
  },
  {
    id: 4,
    name: 'David Thompson',
    initials: 'DT',
    phone: '(555) 456-7890',
    email: 'dthompson@email.com',
    source: 'Walk-in',
    carModel: '2024 Ford F-150',
    budget: '$45,000 – $55,000',
    location: 'Fremont, CA',
    score: 67,
    status: 'New',
    salesperson: 'Mike Johnson',
    lastContacted: '2 days ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    initials: 'JM',
    phone: '(555) 567-8901',
    email: 'jmartinez@email.com',
    source: 'Referral',
    carModel: '2024 Mazda CX-5',
    budget: '$28,000 – $33,000',
    location: 'Berkeley, CA',
    score: 85,
    status: 'Contacted',
    salesperson: 'Emma Davis',
    lastContacted: '3 hours ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 6,
    name: 'Robert Kim',
    initials: 'RK',
    phone: '(555) 678-9012',
    email: 'rkim@email.com',
    source: 'Website',
    carModel: '2024 BMW X5',
    budget: '$60,000 – $75,000',
    location: 'Palo Alto, CA',
    score: 98,
    status: 'Test Drive Scheduled',
    salesperson: 'John Smith',
    lastContacted: '6 hours ago',
    assignedRole: 'Senior Sales Rep',
  },
  {
    id: 7,
    name: 'Amanda Wilson',
    initials: 'AW',
    phone: '(555) 789-0123',
    email: 'awilson@email.com',
    source: 'Google Ads',
    carModel: '2024 Audi Q5',
    budget: '$50,000 – $60,000',
    location: 'Mountain View, CA',
    score: 78,
    status: 'Contacted',
    salesperson: 'Mike Johnson',
    lastContacted: '4 hours ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 8,
    name: 'Christopher Lee',
    initials: 'CL',
    phone: '(555) 890-1234',
    email: 'clee@email.com',
    source: 'Website',
    carModel: '2024 Chevrolet Silverado',
    budget: '$40,000 – $48,000',
    location: 'Sunnyvale, CA',
    score: 82,
    status: 'Qualified',
    salesperson: 'Emma Davis',
    lastContacted: '1 day ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 9,
    name: 'Michelle Brown',
    initials: 'MB',
    phone: '(555) 901-2345',
    email: 'mbrown@email.com',
    source: 'Phone Call',
    carModel: '2024 Hyundai Tucson',
    budget: '$30,000 – $36,000',
    location: 'Santa Clara, CA',
    score: 91,
    status: 'Converted',
    salesperson: 'John Smith',
    lastContacted: '3 days ago',
    assignedRole: 'Senior Sales Rep',
  },
  {
    id: 10,
    name: 'James Anderson',
    initials: 'JA',
    phone: '(555) 012-3456',
    email: 'janderson@email.com',
    source: 'Referral',
    carModel: '2024 Nissan Rogue',
    budget: '$27,000 – $32,000',
    location: 'San Mateo, CA',
    score: 73,
    status: 'New',
    salesperson: 'Mike Johnson',
    lastContacted: '1 hour ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 11,
    name: 'Kevin Patel',
    initials: 'KP',
    phone: '(555) 111-2233',
    email: 'kpatel@email.com',
    source: 'Twitter',
    carModel: '2024 Kia Sportage',
    budget: '$28,000 – $34,000',
    location: 'Redwood City, CA',
    score: 61,
    status: 'Not Interested',
    salesperson: 'Emma Davis',
    lastContacted: '5 days ago',
    assignedRole: 'Sales Representative',
  },
  {
    id: 12,
    name: 'Laura Nguyen',
    initials: 'LN',
    phone: '(555) 444-5566',
    email: 'lnguyen@email.com',
    source: 'Twitter',
    carModel: '2024 Subaru Outback',
    budget: '$32,000 – $38,000',
    location: 'San Francisco, CA',
    score: 74,
    status: 'New',
    salesperson: 'Mike Johnson',
    lastContacted: '2 hours ago',
    assignedRole: 'Sales Representative',
  },
];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'Contacted': 'bg-purple-100 text-purple-700 border-purple-200',
  'Qualified': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Test Drive Scheduled': 'bg-orange-100 text-orange-700 border-orange-200',
  'Not Interested': 'bg-slate-100 text-slate-500 border-slate-200',
  'Converted': 'bg-green-100 text-green-700 border-green-200',
};

export const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBarColor = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 75) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const getScoreLabel = (score: number) => {
  if (score >= 90) return 'Hot Lead';
  if (score >= 75) return 'Warm Lead';
  return 'Cold Lead';
};
