import React, { useState } from 'react';
import { Search, Trash2, Clock, MessageSquare } from 'lucide-react';
import type { ChatSession } from '../api/types';

interface HistoryViewProps {
  sessions: ChatSession[];
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  sessions,
  onSelectSession,
  onDeleteSession
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Today' | 'This Week' | 'Older'>('Today');

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const ONE_WEEK = 7 * ONE_DAY;

  const filteredSessions = sessions.filter((session) => {
    // Search match
    const titleMatch = session.title.toLowerCase().includes(searchQuery.toLowerCase());
    const queryMatch = session.turns.some(t => t.question.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!titleMatch && !queryMatch) return false;

    // Time filter match
    const age = now - session.updatedAt;
    if (activeFilter === 'Today') {
      return age < ONE_DAY;
    } else if (activeFilter === 'This Week') {
      return age >= ONE_DAY && age < ONE_WEEK;
    } else {
      return age >= ONE_WEEK;
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Row: Search Input + Time Filter Pills matching Wireframe 2 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input on the left */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#5A6478] dark:text-[#9AA6BD]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past conversations or questions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFEF9] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] text-[#1A2238] dark:text-[#ECE8DD] text-xs md:text-sm placeholder-[#5A6478]/60 focus:outline-hidden focus:border-[#B08A3E] shadow-xs"
          />
        </div>

        {/* Filter Pills on the right: Today, This Week, Older */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
          {(['Today', 'This Week', 'Older'] as const).map((period) => {
            const isActive = activeFilter === period;
            return (
              <button
                key={period}
                onClick={() => setActiveFilter(period)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                  isActive
                    ? 'bg-[#ECF1DD] text-[#1B2A4A] border-[#8A9A60] dark:bg-[#24314F] dark:text-[#D4AF63] dark:border-[#D4AF63]'
                    : 'bg-[#FFFEF9] text-[#5A6478] border-[#E4DCCB] dark:bg-[#151E36] dark:text-[#9AA6BD] dark:border-[#2A3556] hover:bg-[#FAF6EE]'
                }`}
              >
                {period}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List Container matching Wireframe 2 */}
      <div className="rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xs overflow-hidden">
        {filteredSessions.length > 0 ? (
          <div className="divide-y divide-[#E4DCCB]/60 dark:divide-[#2A3556]/60">
            {filteredSessions.map((session) => {
              const lastTurn = session.turns[session.turns.length - 1];
              const dateLabel = new Date(session.updatedAt).toLocaleDateString([], {
                month: 'short',
                day: 'numeric'
              });
              const timeLabel = new Date(session.updatedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 md:p-5 hover:bg-[#FAF6EE]/70 dark:hover:bg-[#1D2848]/60 transition-colors group cursor-pointer"
                  onClick={() => onSelectSession(session.id)}
                >
                  {/* Left: Title & Question Details */}
                  <div className="flex items-start gap-3.5 min-w-0 pr-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h4 className="font-academic text-sm md:text-base font-bold text-[#1B2A4A] dark:text-[#ECE8DD] group-hover:text-[#B08A3E] dark:group-hover:text-[#D4AF63] truncate">
                        {session.title || 'Discussion with Dr. Ahmed'}
                      </h4>
                      <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] truncate">
                        {lastTurn ? lastTurn.question : 'No questions recorded.'}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-[#5A6478] dark:text-[#9AA6BD] pt-0.5">
                        <Clock className="w-3 h-3 text-[#B08A3E]" />
                        <span>{dateLabel} at {timeLabel}</span>
                        <span>•</span>
                        <span>{session.turns.length} {session.turns.length === 1 ? 'question' : 'questions'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side matching Wireframe 2: Radio badge & Trash Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#ECE8DD]">
                      Active
                    </span>

                    {/* Trash Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this conversation history?')) {
                          onDeleteSession(session.id);
                        }
                      }}
                      className="p-2 rounded-lg text-[#5A6478] hover:text-[#A6493F] dark:text-[#9AA6BD] dark:hover:text-[#D9756A] hover:bg-[#F5F0E4] dark:hover:bg-[#151E36] transition-colors"
                      title="Delete conversation"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.8]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-[#5A6478] dark:text-[#9AA6BD] space-y-2">
            <Clock className="w-8 h-8 mx-auto text-[#B08A3E] opacity-60" />
            <p className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
              No conversations found for "{activeFilter}".
            </p>
            <p className="text-xs">
              {searchQuery
                ? 'Try a different search keyword.'
                : 'Ask a question in Chat to automatically record your session history here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
