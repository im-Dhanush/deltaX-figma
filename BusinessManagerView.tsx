import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import {
  ArrowLeft, Phone, Mail, MapPin, DollarSign, Car, Calendar, Clock,
  User, FileText, Bell, CheckCircle2, Circle, ChevronRight, Plus,
} from 'lucide-react';
import {
  Lead, LeadStatus, STATUS_COLORS, getScoreLabel, getScoreColor,
} from '../data/leads';

interface LeadDetailsViewProps {
  lead: Lead;
  onBack: () => void;
}

const pipelineStagesOrder: LeadStatus[] = [
  'New', 'Contacted', 'Qualified', 'Test Drive Scheduled', 'Converted',
];

const activityTimeline = [
  { id: 1, type: 'call', title: 'Phone call completed', description: 'Discussed financing options and scheduled test drive', time: '2 hours ago', user: 'John Smith' },
  { id: 2, type: 'email', title: 'Email sent', description: 'Sent vehicle information and pricing details', time: '1 day ago', user: 'John Smith' },
  { id: 3, type: 'note', title: 'Note added', description: 'Customer is interested in leather interior upgrade', time: '2 days ago', user: 'John Smith' },
  { id: 4, type: 'status', title: 'Status updated', description: 'Lead moved to Qualified stage', time: '3 days ago', user: 'System' },
];

const callLogs = [
  { id: 1, type: 'outbound', duration: '12:34', outcome: 'Connected', notes: 'Discussed features and pricing', time: '2 hours ago' },
  { id: 2, type: 'outbound', duration: '8:15', outcome: 'Voicemail', notes: 'Left message about special financing offer', time: '1 day ago' },
  { id: 3, type: 'inbound', duration: '15:42', outcome: 'Connected', notes: 'Customer asked about trade-in value', time: '3 days ago' },
];

const reminders = [
  { id: 1, title: 'Follow-up call scheduled', date: 'Tomorrow, 10:00 AM', priority: 'high' },
  { id: 2, title: 'Test drive appointment', date: 'Mar 8, 2026 at 2:00 PM', priority: 'high' },
  { id: 3, title: 'Send financing options', date: 'Mar 10, 2026', priority: 'medium' },
];

export function LeadDetailsView({ lead, onBack }: LeadDetailsViewProps) {
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead.status);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<{ id: number; text: string; time: string }[]>([]);

  const currentStageIndex = pipelineStagesOrder.indexOf(
    currentStatus === 'Not Interested' ? 'New' : currentStatus
  );

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    setNotes((prev) => [{ id: prev.length + 1, text: noteText, time: 'Just now' }, ...prev]);
    setNoteText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white text-sm">{lead.initials}</span>
          </div>
          <div>
            <h1 className="text-3xl text-slate-900">{lead.name}</h1>
            <p className="text-slate-500 mt-0.5">Lead Details · {lead.source}</p>
          </div>
          <Badge variant="outline" className={STATUS_COLORS[currentStatus]}>{currentStatus}</Badge>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" /> Schedule Follow-up
          </Button>
          <Button variant="outline" className="gap-2">
            <Car className="w-4 h-4" /> Book Test Drive
          </Button>
          <div className="flex items-center gap-2">
            <Select value={currentStatus} onValueChange={(v) => setCurrentStatus(v as LeadStatus)}>
              <SelectTrigger className="w-44 bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Test Drive Scheduled">Test Drive Scheduled</SelectItem>
                <SelectItem value="Not Interested">Not Interested</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left — Lead Info */}
        <div className="col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
              <CardDescription>Contact and lead details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div><p className="text-xs text-slate-500">Name</p><p className="text-sm text-slate-900">{lead.name}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div><p className="text-xs text-slate-500">Phone</p><p className="text-sm text-slate-900">{lead.phone}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div><p className="text-xs text-slate-500">Email</p><p className="text-sm text-slate-900">{lead.email || '—'}</p></div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div><p className="text-xs text-slate-500">Interested Car Model</p><p className="text-sm text-slate-900">{lead.carModel}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div><p className="text-xs text-slate-500">Budget</p><p className="text-sm text-slate-900">{lead.budget || '—'}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div><p className="text-xs text-slate-500">Location</p><p className="text-sm text-slate-900">{lead.location || '—'}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500">Lead Source</p>
                    <Badge variant="outline" className="mt-1 bg-slate-50">{lead.source}</Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs text-slate-500">Assigned To</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">
                      {lead.salesperson.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">{lead.salesperson}</p>
                    <p className="text-xs text-slate-500">{lead.assignedRole}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Score */}
          <Card>
            <CardHeader><CardTitle>Lead Score</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                    <circle
                      cx="64" cy="64" r="56"
                      stroke={lead.score >= 90 ? '#10b981' : lead.score >= 75 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8" fill="none"
                      strokeDasharray={`${lead.score * 3.51} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    <span className="text-xs text-slate-500">{getScoreLabel(lead.score)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center — Pipeline + Quick Actions */}
        <div className="col-span-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline Progress</CardTitle>
              <CardDescription>Track the lead journey through sales stages</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {currentStatus === 'Not Interested' ? (
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500 text-xl">✕</span>
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium">Lead marked as Not Interested</p>
                    <p className="text-sm text-slate-500 mt-0.5">This lead has been disqualified from the pipeline.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {pipelineStagesOrder.map((stage, index) => {
                    const completed = index < currentStageIndex;
                    const active = index === currentStageIndex;
                    return (
                      <div key={stage}>
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {completed ? (
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              </div>
                            ) : active ? (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Circle className="w-6 h-6 text-blue-600 fill-blue-600" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <Circle className="w-6 h-6 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-base ${active || completed ? 'text-slate-900' : 'text-slate-400'}`}>{stage}</h4>
                            {completed && <p className="text-sm text-slate-500 mt-1">Completed</p>}
                            {active && <p className="text-sm text-blue-600 mt-1">Current Stage</p>}
                          </div>
                          {(active || completed) && <ChevronRight className="w-5 h-5 text-slate-400" />}
                        </div>
                        {index < pipelineStagesOrder.length - 1 && (
                          <div className="ml-5 h-8 w-0.5 bg-slate-200"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2"><Phone className="w-4 h-4" /> Call Lead</Button>
                <Button variant="outline" className="gap-2"><Mail className="w-4 h-4" /> Send Email</Button>
                <Button variant="outline" className="gap-2"><FileText className="w-4 h-4" /> Add Note</Button>
                <Button variant="outline" className="gap-2"><Calendar className="w-4 h-4" /> Set Reminder</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — Activity Panel */}
        <div className="col-span-3 space-y-6">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader><CardTitle>Activity & Notes</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="w-full grid grid-cols-3 px-4">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="calls">Calls</TabsTrigger>
                  <TabsTrigger value="reminders">Reminders</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="px-4 pb-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add a note..."
                        className="text-sm resize-none"
                        rows={2}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      />
                      <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleAddNote} disabled={!noteText.trim()}>
                        <Plus className="w-4 h-4" /> Add Note
                      </Button>
                    </div>
                    <div className="space-y-4 max-h-[calc(100vh-30rem)] overflow-y-auto pr-2">
                      {notes.map((n) => (
                        <div key={n.id} className="relative pl-6 pb-4 border-l-2 border-blue-300 last:border-0">
                          <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-600 rounded-full"></div>
                          <div className="space-y-1">
                            <h4 className="text-sm text-slate-900">Note added</h4>
                            <p className="text-xs text-slate-600">{n.text}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="w-3 h-3" /><span>{n.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {activityTimeline.map((activity) => (
                        <div key={activity.id} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-0">
                          <div className="absolute -left-1.5 top-0 w-3 h-3 bg-slate-400 rounded-full"></div>
                          <div className="space-y-1">
                            <h4 className="text-sm text-slate-900">{activity.title}</h4>
                            <p className="text-xs text-slate-600">{activity.description}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="w-3 h-3" /><span>{activity.time}</span>
                              <span>·</span><span>{activity.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="calls" className="px-4 pb-4 mt-4">
                  <div className="space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2">
                    {callLogs.map((call) => (
                      <Card key={call.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={call.type === 'inbound' ? 'default' : 'secondary'}>
                              {call.type === 'inbound' ? 'Inbound' : 'Outbound'}
                            </Badge>
                            <span className="text-xs text-slate-500">{call.time}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-900">{call.duration}</span>
                              <Badge variant="outline" className="ml-auto text-xs">{call.outcome}</Badge>
                            </div>
                            <p className="text-xs text-slate-600">{call.notes}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reminders" className="px-4 pb-4 mt-4">
                  <div className="space-y-4">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Plus className="w-4 h-4" /> New Reminder
                    </Button>
                    <div className="space-y-3 max-h-[calc(100vh-28rem)] overflow-y-auto pr-2">
                      {reminders.map((reminder) => (
                        <Card key={reminder.id} className="border-l-4 border-l-red-600">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-sm text-slate-900">{reminder.title}</h4>
                              <Badge variant="outline" className={reminder.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>
                                {reminder.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <Calendar className="w-3 h-3" /><span>{reminder.date}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
