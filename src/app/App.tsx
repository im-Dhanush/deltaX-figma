import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { HomeView } from './components/HomeView';
import { LeadsView } from './components/LeadsView';
import { PipelineView } from './components/PipelineView';
import { BusinessManagerView } from './components/BusinessManagerView';
import { AnalyticsView } from './components/AnalyticsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':      return <HomeView onNavigate={setActiveTab} />;
      case 'leads':     return <LeadsView />;
      case 'pipeline':  return <PipelineView />;
      case 'dashboard': return <BusinessManagerView />;
      case 'analytics': return <AnalyticsView />;
      default:          return <HomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <TopNav />
      <div className="ml-64 pt-16">
        <div className="p-8 max-w-[1440px] mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
