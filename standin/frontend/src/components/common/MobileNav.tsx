import React from 'react';
import { Home, MessageSquare, Library, Clock, HelpCircle, Sliders } from 'lucide-react';
import type { TabId } from './Sidebar';
import { defaultProfessor } from '../../config/professor.config';

interface MobileNavProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenProfessorModal: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onTabChange,
  onOpenProfessorModal
}) => {
  const items: Array<{ id: TabId; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'knowledge', label: 'Topics', icon: Library },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'how-it-works', label: 'Rules', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Sliders }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#F6F0D8] dark:bg-[#111A30] border-t border-[#E4DCCB] dark:border-[#2A3556] flex items-center justify-around px-2 z-30 select-none shadow-lg"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => {
        const isActive = currentTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
              isActive
                ? 'bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#D4AF63]'
                : 'text-[#5A6478] dark:text-[#9AA6BD] hover:text-[#1B2A4A]'
            }`}
            aria-label={item.label}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium leading-none">{item.label}</span>
          </button>
        );
      })}

      {/* Professor avatar button on mobile */}
      <button
        onClick={onOpenProfessorModal}
        className="w-8 h-8 rounded-full bg-[#372E31] text-[#D4AF63] flex items-center justify-center font-academic font-bold text-xs shadow-xs border border-[#D4AF63]/40"
        title="Professor Profile"
        aria-label="Professor Profile"
      >
        {defaultProfessor.initials}
      </button>
    </nav>
  );
};
