import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { LeadDetailsView } from './LeadDetailsView';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from './ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Plus, Search, MoreVertical, Phone, Mail, Calendar, Edit, Trash2,
  Users, CheckCircle2, XCircle,
} from 'lucide-react';
import {
  ALL_LEADS, STATUS_COLORS, getScoreColor, getScoreBarColor,
  Lead, LeadStatus, LeadSource,
} from '../data/leads';

export function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>(ALL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [salespersonFilter, setSalespersonFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '', phone: '', email: '',
    source: 'Website' as LeadSource,
    carModel: '', budget: '', location: '',
    salesperson: 'John Smith',
  });

  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.phone.includes(q) ||
      lead.carModel.toLowerCase().includes(q) ||
      lead.salesperson.toLowerCase().includes(q);
    const matchesSource = sourceFilter === 'all' ||
      lead.source.toLowerCase().replace(/[\s-]/g, '') === sourceFilter.toLowerCase().replace(/[\s-]/g, '');
    const matchesStatus = statusFilter === 'all' ||
      lead.status.toLowerCase().replace(/[\s]/g, '') === statusFilter.toLowerCase().replace(/[\s]/g, '');
    const matchesSalesperson = salespersonFilter === 'all' ||
      lead.salesperson.toLowerCase().split(' ')[0] === salespersonFilter;
    return matchesSearch && matchesSource && matchesStatus && matchesSalesperson;
  });

  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone || !newLead.carModel) return;
    const lead: Lead = {
      id: leads.length + 1,
      name: newLead.name,
      initials: newLead.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
      phone: newLead.phone,
      email: newLead.email,
      source: newLead.source,
      carModel: newLead.carModel,
      budget: newLead.budget,
      location: newLead.location,
      score: Math.floor(Math.random() * 30) + 60,
      status: 'New',
      salesperson: newLead.salesperson,
      lastContacted: 'Just now',
      assignedRole: 'Sales Representative',
    };
    setLeads((prev) => [lead, ...prev]);
    setNewLead({ name: '', phone: '', email: '', source: 'Website', carModel: '', budget: '', location: '', salesperson: 'John Smith' });
    setShowAddModal(false);
  };

  if (selectedLead) {
    return <LeadDetailsView lead={selectedLead} onBack={() => setSelectedLead(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900">Lead Management</h1>
          <p className="text-slate-500 mt-1">Manage and track all customer leads</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-700 font-medium">3 online</span>
          </div>
          <Button className="gap-2 bg-red-600 hover:bg-red-700" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" /> Add New Lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {(['New', 'Contacted', 'Qualified', 'Test Drive Scheduled', 'Not Interested', 'Converted'] as LeadStatus[]).map((s) => {
          const count = leads.filter((l) => l.status === s).length;
          const key = s.toLowerCase().replace(/ /g, '');
          return (
            <button key={s} onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}>
              <Badge variant="outline" className={`${STATUS_COLORS[s]} cursor-pointer hover:opacity-80 transition-opacity`}>
                {s} ({count})
              </Badge>
            </button>
          );
        })}
        <span className="text-sm text-slate-400 ml-auto flex items-center gap-1">
          <Users className="w-4 h-4" /> {filteredLeads.length} of {leads.length} leads
        </span>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search leads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger><SelectValue placeholder="Lead Source" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="phonecall">Phone Call</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="googleads">Google Ads</SelectItem>
                <SelectItem value="walkin">Walk-in</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="testdrivescheduled">Test Drive Scheduled</SelectItem>
                <SelectItem value="notinterested">Not Interested</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={salespersonFilter} onValueChange={setSalespersonFilter}>
              <SelectTrigger><SelectValue placeholder="Salesperson" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Salespeople</SelectItem>
                <SelectItem value="john">John Smith</SelectItem>
                <SelectItem value="emma">Emma Davis</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Lead Source</TableHead>
                <TableHead>Interested Car Model</TableHead>
                <TableHead>Lead Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Salesperson</TableHead>
                <TableHead>Last Contacted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-slate-400">
                    No leads match your filters.
                  </TableCell>
                </TableRow>
              ) : filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">{lead.initials}</span>
                      </div>
                      <span className="font-medium text-slate-900">{lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />{lead.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50">{lead.source}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-900">{lead.carModel}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[80px] bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getScoreBarColor(lead.score)}`} style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_COLORS[lead.status]}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-900">{lead.salesperson}</TableCell>
                  <TableCell className="text-slate-500">{lead.lastContacted}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => setSelectedLead(lead)}>
                          <Edit className="w-4 h-4" /> View / Edit Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Phone className="w-4 h-4" /> Call Lead</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Mail className="w-4 h-4" /> Send Email</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Calendar className="w-4 h-4" /> Schedule Test Drive</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"
                          onClick={() => setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status: 'Not Interested' } : l))}>
                          <XCircle className="w-4 h-4 text-slate-500" /> Mark Not Interested
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"
                          onClick={() => setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status: 'Converted' } : l))}>
                          <CheckCircle2 className="w-4 h-4 text-green-600" /> Mark Converted
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600"
                          onClick={() => setLeads((prev) => prev.filter((l) => l.id !== lead.id))}>
                          <Trash2 className="w-4 h-4" /> Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium">{filteredLeads.length}</span> of <span className="font-medium">{leads.length}</span> leads
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-slate-900 text-white hover:bg-slate-800">1</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>Enter the customer's details. Fields marked * are required.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1">
              <Label>Full Name *</Label>
              <Input placeholder="e.g. Jane Smith" value={newLead.name} onChange={(e) => setNewLead((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Phone Number *</Label>
              <Input placeholder="(555) 000-0000" value={newLead.phone} onChange={(e) => setNewLead((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input placeholder="jane@email.com" value={newLead.email} onChange={(e) => setNewLead((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Interested Car Model *</Label>
              <Input placeholder="e.g. 2024 Toyota RAV4" value={newLead.carModel} onChange={(e) => setNewLead((p) => ({ ...p, carModel: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Budget</Label>
              <Input placeholder="e.g. $30,000 – $40,000" value={newLead.budget} onChange={(e) => setNewLead((p) => ({ ...p, budget: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Lead Source</Label>
              <Select value={newLead.source} onValueChange={(v) => setNewLead((p) => ({ ...p, source: v as LeadSource }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Walk-in">Walk-in</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Assign To</Label>
              <Select value={newLead.salesperson} onValueChange={(v) => setNewLead((p) => ({ ...p, salesperson: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Location</Label>
              <Input placeholder="e.g. San Francisco, CA" value={newLead.location} onChange={(e) => setNewLead((p) => ({ ...p, location: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddLead} disabled={!newLead.name || !newLead.phone || !newLead.carModel}>
              <Plus className="w-4 h-4 mr-1" /> Add Lead
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
