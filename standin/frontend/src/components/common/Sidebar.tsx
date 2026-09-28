import React from 'react';
import { Home, MessageSquare, Library, Clock, HelpCircle, Sliders } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { defaultProfessor } from '../../config/professor.config';

export type TabId = 'home' | 'chat' | 'knowledge' | 'history' | 'how-it-works' | 'settings';

interface SidebarProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenProfessorModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onOpenProfessorModal
}) => {
  const navItems: Array<{ id: TabId; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat & Ask', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Base', icon: Library },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle }
  ];

  return (
    <aside
      className="hidden md:flex flex-col items-center justify-between w-20 lg:w-24 py-6 bg-[#F6F0D8] dark:bg-[#111A30] border-r border-[#E4DCCB] dark:border-[#2A3556] select-none shrink-0 transition-colors duration-200 z-20"
      aria-label="Main Navigation"
    >
      <div className="flex flex-col items-center">
        <BrandLogo collapsed={true} onClick={() => onTabChange('home')} />
      </div>

      <nav className="flex flex-col items-center gap-4 w-full px-2 my-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex items-center justify-center w-14 h-12 rounded-xl transition-all duration-150 group ${
                isActive
                  ? 'bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#D4AF63] shadow-xs'
                  : 'text-[#5A6478] dark:text-[#9AA6BD] hover:bg-[#FFFCF3]/60 dark:hover:bg-[#151E36] hover:text-[#1B2A4A] dark:hover:text-[#ECE8DD]'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5 stroke-[1.8]" />

              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#8A9A60] dark:bg-[#D4AF63]" />
              )}

              <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded-md bg-[#1B2A4A] text-[#ECE8DD] dark:bg-[#1D2848] dark:text-[#ECE8DD] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-30">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-4 w-full px-2 pt-4 border-t border-[#E4DCCB]/80 dark:border-[#2A3556]">
        <button
          onClick={() => onTabChange('settings')}
          className={`relative flex items-center justify-center w-14 h-12 rounded-xl transition-all duration-150 group ${
            currentTab === 'settings'
              ? 'bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#D4AF63] shadow-xs'
              : 'text-[#5A6478] dark:text-[#9AA6BD] hover:bg-[#FFFCF3]/60 dark:hover:bg-[#151E36] hover:text-[#1B2A4A] dark:hover:text-[#ECE8DD]'
          }`}
          title="Settings & Preferences"
          aria-label="Settings"
        >
          <Sliders className="w-5 h-5 stroke-[1.8]" />
          {currentTab === 'settings' && (
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#8A9A60] dark:bg-[#D4AF63]" />
          )}
          <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded-md bg-[#1B2A4A] text-[#ECE8DD] dark:bg-[#1D2848] dark:text-[#ECE8DD] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-30">
            Settings
          </span>
        </button>

        <button
          onClick={onOpenProfessorModal}
          className="relative group w-11 h-11 rounded-full bg-[#372E31] dark:bg-[#1A2238] text-[#ECE8DD] flex items-center justify-center font-academic font-bold text-sm tracking-wide shadow-md border-2 border-[#D4AF63]/40 hover:border-[#D4AF63] hover:scale-105 transition-all"
          title={`View Profile: ${defaultProfessor.name}`}
          aria-label={`Professor Profile ${defaultProfessor.name}`}
        >
          {defaultProfessor.initials}
          <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded-md bg-[#1B2A4A] text-[#ECE8DD] dark:bg-[#1D2848] dark:text-[#ECE8DD] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-30">
            {defaultProfessor.name} Profile
          </span>
        </button>
      </div>
    </aside>
  );
};
