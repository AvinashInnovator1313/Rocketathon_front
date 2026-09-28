import React from 'react';
import { X, Mail, Clock, BookOpen } from 'lucide-react';
import { defaultProfessor } from '../../config/professor.config';

interface ProfessorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfessorModal: React.FC<ProfessorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-2xl p-6 text-[#1A2238] dark:text-[#ECE8DD] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prof-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#5A6478] hover:text-[#1A2238] dark:hover:text-[#ECE8DD] hover:bg-[#F5F0E4] dark:hover:bg-[#1D2848] transition-colors"
          aria-label="Close profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Avatar */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#E4DCCB] dark:border-[#2A3556]">
          <div className="w-16 h-16 rounded-2xl bg-[#372E31] dark:bg-[#1A2238] text-[#D4AF63] flex items-center justify-center font-academic font-bold text-2xl shadow-inner border border-[#D4AF63]/30">
            {defaultProfessor.initials}
          </div>
          <div>
            <h2 id="prof-modal-title" className="font-academic text-2xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
              {defaultProfessor.name}
            </h2>
            <p className="text-xs md:text-sm font-medium text-[#7A5C1E] dark:text-[#D4AF63]">
              {defaultProfessor.title}
            </p>
            <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
              {defaultProfessor.department} • {defaultProfessor.institution}
            </p>
          </div>
        </div>

        {/* Bio / Stand-in mission */}
        <div className="space-y-4 text-xs md:text-sm leading-relaxed">
          <p className="text-[#5A6478] dark:text-[#9AA6BD] italic">
            "{defaultProfessor.taglinePrimary} {defaultProfessor.taglineSecondary}"
          </p>

          <div className="p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556]">
            <p className="text-xs text-[#1A2238] dark:text-[#ECE8DD]">
              {defaultProfessor.bio}
            </p>
          </div>

          {/* Quick Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FFFEF9] dark:bg-[#1D2848] border border-[#E4DCCB]/60 dark:border-[#2A3556]/60">
              <Clock className="w-4 h-4 text-[#B08A3E] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#1B2A4A] dark:text-[#8FAAD6]">Counseling Window</span>
                <span className="text-[#5A6478] dark:text-[#9AA6BD]">{defaultProfessor.freeWindowWeekly}</span>
                <span className="block text-[11px] text-[#7A5C1E] dark:text-[#D4AF63] mt-0.5">{defaultProfessor.officeHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FFFEF9] dark:bg-[#1D2848] border border-[#E4DCCB]/60 dark:border-[#2A3556]/60">
              <Mail className="w-4 h-4 text-[#B08A3E] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#1B2A4A] dark:text-[#8FAAD6]">Official Handoff</span>
                <a
                  href={`mailto:${defaultProfessor.email}`}
                  className="text-xs text-[#1B2A4A] dark:text-[#8FAAD6] hover:underline break-all"
                >
                  {defaultProfessor.email}
                </a>
              </div>
            </div>
          </div>

          {/* Courses Taught */}
          <div>
            <span className="text-xs font-semibold text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#B08A3E]" />
              Courses & Subjects In Stand-In Knowledge:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {defaultProfessor.coursesTaught.map((course, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#ECE8DD] border border-[#8A9A60]/30"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#E4DCCB] dark:border-[#2A3556] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] dark:hover:bg-[#E3C27A] transition-colors shadow-xs"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
