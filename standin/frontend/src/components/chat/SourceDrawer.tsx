import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ShieldAlert } from 'lucide-react';

interface SourceDrawerProps {
  sources: string[];
  isGeneral?: boolean;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({ sources, isGeneral }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-[#E4DCCB]/60 dark:border-[#2A3556]/60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#7A5C1E] dark:text-[#D4AF63] hover:underline focus:outline-hidden transition-colors"
        aria-expanded={isOpen}
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>
          {isGeneral
            ? 'Knowledge Basis: General Java Principles'
            : `Knowledge Sources (${sources.length} cited)`}
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
          {sources.map((src, index) => {
            const isRule = src.startsWith('Stop rule:');
            const isGeneralNote = src.includes('General Java knowledge');

            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs border ${
                  isRule
                    ? 'bg-[#FFF2F0] dark:bg-[#2B1B1B] text-[#A6493F] dark:text-[#D9756A] border-[#A6493F]/20'
                    : isGeneralNote
                    ? 'bg-[#F0F4FA] dark:bg-[#152336] text-[#3E6A96] dark:text-[#7FA6D6] border-[#3E6A96]/20'
                    : 'bg-[#FAF6EE] dark:bg-[#111A30] text-[#1A2238] dark:text-[#ECE8DD] border-[#E4DCCB] dark:border-[#2A3556]'
                }`}
              >
                {isRule ? (
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#A6493F]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08A3E] dark:bg-[#D4AF63] shrink-0" />
                )}
                <span className="font-mono text-[11px] truncate flex-1">{src}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
