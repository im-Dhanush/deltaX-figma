import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import { Phone, Mail, Calendar, Search, GripVertical, Users } from 'lucide-react';
import {
  ALL_LEADS, STATUS_COLORS, getScoreColor, getScoreBarColor,
  Lead, LeadStatus,
} from '../data/leads';

const COLUMNS: { status: LeadStatus; label: string; description: string }[] = [
  { status: 'New', label: 'New', description: 'Fresh incoming leads' },
  { status: 'Contacted', label: 'Contacted', description: 'Reached out, awaiting response' },
  { status: 'Qualified', label: 'Qualified', description: 'Confirmed interest & budget' },
  { status: 'Test Drive Scheduled', label: 'Test Drive', description: 'Appointment booked' },
  { status: 'Not Interested', label: 'Not Interested', description: 'Disqualified leads' },
  { status: 'Converted', label: 'Converted', description: 'Successfully sold' },
];

export function PipelineView() {
  const [leads, setLeads] = useState<Lead[]>(ALL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [salespersonFilter, setSalespersonFilter] = useState('all');
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || lead.name.toLowerCase().includes(q) || lead.carModel.toLowerCase().includes(q);
    const matchesSalesperson = salespersonFilter === 'all' ||
      lead.salesperson.toLowerCase().split(' ')[0] === salespersonFilter;
    return matchesSearch && matchesSalesperson;
  });

  const handleDragStart = (id: number) => setDraggingId(id);
  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };
  const handleDrop = (status: LeadStatus) => {
    if (draggingId === null) return;
    setLeads((prev) =>
      prev.map((l) => l.id === draggingId ? { ...l, status } : l)
    );
    setDraggingId(null);
    setDragOverColumn(null);
  };
  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverColumn(null);
  };

  const moveLeadTo = (lead: Lead, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status } : l));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900">Lead Pipeline</h1>
          <p className="text-slate-500 mt-1">Drag and drop leads to update their stage</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-700 font-medium">3 online</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-56"
            />
          </div>
          <Select value={salespersonFilter} onValueChange={setSalespersonFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Salespeople" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Salespeople</SelectItem>
              <SelectItem value="john">John Smith</SelectItem>
              <SelectItem value="emma">Emma Davis</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-6 gap-3">
        {COLUMNS.map((col) => {
          const count = filteredLeads.filter((l) => l.status === col.status).length;
          return (
            <div key={col.status} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500">{col.label}</span>
              <Badge variant="outline" className={`${STATUS_COLORS[col.status]} text-xs`}>{count}</Badge>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-6 gap-4 overflow-x-auto">
        {COLUMNS.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.status === col.status);
          const isDropTarget = dragOverColumn === col.status;
          return (
            <div
              key={col.status}
              className={`flex flex-col min-w-[200px] rounded-xl transition-colors ${
                isDropTarget ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : 'bg-slate-100 border-2 border-transparent'
              }`}
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDrop={() => handleDrop(col.status)}
            >
              {/* Column header */}
              <div className="p-3 border-b border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-800">{col.label}</span>
                  <span className="text-xs text-slate-500 bg-white rounded-full px-2 py-0.5 border border-slate-200">
                    {colLeads.length}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{col.description}</p>
              </div>

              {/* Cards */}
              <div className="p-2 space-y-2 flex-1 min-h-[200px]">
                {colLeads.length === 0 && (
                  <div className="flex items-center justify-center h-20 text-xs text-slate-400">
                    {isDropTarget ? 'Drop here' : 'No leads'}
                  </div>
                )}
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead.id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white rounded-lg border border-slate-200 p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
                      draggingId === lead.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">{lead.initials}</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900 leading-tight">{lead.name}</p>
                          <p className="text-xs text-slate-400">{lead.salesperson.split(' ')[0]}</p>
                        </div>
                      </div>
                      <GripVertical className="w-3 h-3 text-slate-300 flex-shrink-0 mt-1" />
                    </div>

                    <p className="text-xs text-slate-600 mb-2 truncate">{lead.carModel}</p>

                    {/* Score bar */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getScoreBarColor(lead.score)}`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    </div>

                    <div className="text-xs text-slate-400 mb-2">{lead.lastContacted}</div>

                    {/* Quick move buttons */}
                    <div className="flex gap-1">
                      <button
                        className="flex-1 text-xs py-1 px-1 rounded bg-slate-50 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Call"
                      >
                        <Phone className="w-3 h-3 mx-auto" />
                      </button>
                      <button
                        className="flex-1 text-xs py-1 px-1 rounded bg-slate-50 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-3 h-3 mx-auto" />
                      </button>
                      <button
                        className="flex-1 text-xs py-1 px-1 rounded bg-slate-50 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Schedule"
                      >
                        <Calendar className="w-3 h-3 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 text-center">
        <GripVertical className="inline w-3 h-3 mr-1" />
        Tip: Drag a card to a different column to update its status instantly
      </p>
    </div>
  );
}
