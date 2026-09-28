import React, { useEffect, useState } from 'react';
import { Sun, Moon, Plus, Database } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { checkHealth, currentApiStatus, type ApiStatus } from '../../api/client';
import type { TabId } from './Sidebar';
import { defaultProfessor } from '../../config/professor.config';

interface HeaderProps {
  currentTab: TabId;
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNewChat }) => {
  const { theme, toggleTheme } = useTheme();
  const [status, setStatus] = useState<ApiStatus>(currentApiStatus);

  useEffect(() => {
    checkHealth().then(() => setStatus({ ...currentApiStatus }));
    const interval = setInterval(() => {
      checkHealth().then(() => setStatus({ ...currentApiStatus }));
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const tabTitles: Record<TabId, { title: string; subtitle: string }> = {
    home: { title: 'Academic Hub', subtitle: `${defaultProfessor.name}'s Digital Stand-In` },
    chat: { title: 'Ask Professor Stand-In', subtitle: `Grounded in ${defaultProfessor.name}'s Lecture Slides` },
    knowledge: { title: 'Knowledge Base', subtitle: 'Explore topics & lecture materials' },
    history: { title: 'Past Discussions', subtitle: 'Review and reopen prior questions' },
    'how-it-works': { title: 'System Architecture & Rules', subtitle: 'Transparent RAG pipeline and boundaries' },
    settings: { title: 'Settings & Preferences', subtitle: 'Personalize theme and learning profile' }
  };

  const { title, subtitle } = tabTitles[currentTab] || tabTitles.home;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#FFFAE7]/80 dark:bg-[#0E1526]/80 backdrop-blur-md border-b border-[#E4DCCB] dark:border-[#2A3556] shrink-0 z-10 transition-colors">
      {/* Title & Context */}
      <div>
        <h1 className="font-academic text-xl md:text-2xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6] leading-tight">
          {title}
        </h1>
        <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
          {subtitle}
        </p>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-3">
        {/* Status Pill */}
        <div
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            status.isLive
              ? 'bg-[#EDF0DB] text-[#1B2A4A] border-[#8A9A60]/40 dark:bg-[#152822] dark:text-[#6FB08A] dark:border-[#6FB08A]/40'
              : 'bg-[#FFF3D6] text-[#7A5C1E] border-[#B08A3E]/40 dark:bg-[#2A2314] dark:text-[#E0A94A] dark:border-[#E0A94A]/40'
          }`}
          title={status.isLive ? 'Connected directly to FastAPI backend' : 'Backend offline - operating on local course mock adapter'}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              status.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <Database className="w-3.5 h-3.5 opacity-70" />
          <span>
            {status.isLive
              ? `${status.chunks || 26} Slides Indexed`
              : 'Mock Mode (Offline Fallback)'}
          </span>
        </div>

        {/* Quick New Question Button */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] dark:hover:bg-[#E3C27A] transition-colors shadow-xs"
          title="Start fresh question session"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden md:inline">New Question</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[#5A6478] hover:text-[#1B2A4A] dark:text-[#9AA6BD] dark:hover:text-[#ECE8DD] hover:bg-[#F6F0D8] dark:hover:bg-[#151E36] transition-colors border border-[#E4DCCB] dark:border-[#2A3556]"
          title={theme === 'dark' ? 'Switch to Library Morning (Light)' : 'Switch to Library After Hours (Dark)'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-[#D4AF63]" />
          ) : (
            <Moon className="w-4 h-4 text-[#1B2A4A]" />
          )}
        </button>
      </div>
    </header>
  );
};
