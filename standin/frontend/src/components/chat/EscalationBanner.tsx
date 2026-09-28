import React from 'react';
import { AlertCircle, Mail, Calendar } from 'lucide-react';
import { defaultProfessor } from '../../config/professor.config';

interface EscalationBannerProps {
  cat: string | null;
  text: string;
  sources: string[];
}

export const EscalationBanner: React.FC<EscalationBannerProps> = ({ cat, text, sources: _sources }) => {
  return (
    <div className="rounded-xl border-l-4 border-l-[#C98A1B] bg-[#FFFBF0] dark:bg-[#1E1C15] border border-[#E4DCCB] dark:border-[#2A3556] p-4 text-xs md:text-sm leading-relaxed shadow-xs">
      {/* Header with escalation tag */}
      <div className="flex items-center gap-2 mb-2.5">
        <AlertCircle className="w-4 h-4 text-[#C98A1B] dark:text-[#E0A94A] shrink-0" />
        <span className="font-semibold text-[#1B2A4A] dark:text-[#E0A94A] uppercase tracking-wide text-[11px]">
          Academic Boundary Escalation
        </span>
        {cat && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F1E7D0] dark:bg-[#2B261A] text-[#7A5C1E] dark:text-[#D4AF63] border border-[#B08A3E]/30">
            {cat}
          </span>
        )}
      </div>

      {/* Body text */}
      <div className="text-[#1A2238] dark:text-[#ECE8DD] space-y-2 whitespace-pre-line">
        {text}
      </div>

      {/* Official Handoff Callout */}
      <div className="mt-3 pt-2.5 border-t border-[#E4DCCB]/60 dark:border-[#2A3556]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-[#5A6478] dark:text-[#9AA6BD]">
          <Calendar className="w-3.5 h-3.5 text-[#B08A3E]" />
          <span>Office counseling: {defaultProfessor.freeWindowWeekly}</span>
        </div>
        <a
          href={`mailto:${defaultProfessor.email}`}
          className="inline-flex items-center gap-1 font-medium text-[#1B2A4A] dark:text-[#8FAAD6] hover:underline"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{defaultProfessor.email}</span>
        </a>
      </div>
    </div>
  );
};
