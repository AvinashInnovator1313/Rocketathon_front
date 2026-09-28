import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Clock, Sparkles, HelpCircle, MessageSquare } from 'lucide-react';
import { defaultProfessor } from '../config/professor.config';
import type { TabId } from '../components/common/Sidebar';

interface HomeViewProps {
  onStartQuestion: (question: string) => void;
  onNavigateTab: (tab: TabId) => void;
  onOpenProfessorModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartQuestion,
  onNavigateTab,
  onOpenProfessorModal
}) => {
  const suggestedQuestions = [
    "What is the difference between aggregation and composition?",
    "How are the 100 marks distributed in theory and practical?",
    "Can you explain polymorphism with a simple Java analogy?",
    "Which IDE does the professor recommend for beginners?"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFCF3] via-[#FAF6EE] to-[#F1E7D0]/50 dark:from-[#151E36] dark:via-[#111A30] dark:to-[#1D2848] border border-[#E4DCCB] dark:border-[#2A3556] p-6 md:p-10 shadow-xs overflow-hidden">
        {/* Subtle decorative watermark */}
        <div className="absolute right-4 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-[#1B2A4A] dark:text-[#8FAAD6]" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#D4AF63] border border-[#8A9A60]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#B08A3E]" />
            <span>Digital Stand-In • Active 24/7 for Students</span>
          </div>

          <h2 className="font-academic text-3xl md:text-5xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6] tracking-tight leading-tight">
            Assalam o Alaikum!
          </h2>

          <p className="font-academic italic text-lg md:text-xl text-[#7A5C1E] dark:text-[#D4AF63]">
            "{defaultProfessor.taglinePrimary} {defaultProfessor.taglineSecondary}"
          </p>

          <p className="text-sm md:text-base text-[#5A6478] dark:text-[#9AA6BD] leading-relaxed">
            Welcome to <strong className="font-semibold text-[#1B2A4A] dark:text-[#ECE8DD]">{defaultProfessor.name}</strong>'s academic stand-in.
            Ask questions late at night, explore lecture slides, clarify OOP concepts, and check official course policies.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('chat')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] dark:hover:bg-[#E3C27A] font-medium text-sm transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask a Question Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenProfessorModal}
              className="px-4 py-2.5 rounded-xl bg-[#FFFEF9] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#ECE8DD] border border-[#E4DCCB] dark:border-[#2A3556] hover:bg-[#FAF6EE] font-medium text-sm transition-colors"
            >
              Meet {defaultProfessor.name}
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-academic text-xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
            Suggested Inquiries from Recent Lectures
          </h3>
          <span className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
            Click any question to ask
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onStartQuestion(q)}
              className="flex items-start text-left gap-3 p-4 rounded-xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] hover:border-[#B08A3E] dark:hover:border-[#D4AF63] hover:shadow-xs transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FAF6EE] dark:bg-[#1D2848] text-[#B08A3E] dark:text-[#D4AF63] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1A2238] dark:text-[#ECE8DD] group-hover:text-[#B08A3E] dark:group-hover:text-[#D4AF63] transition-colors">
                  {q}
                </p>
                <span className="text-[11px] text-[#5A6478] dark:text-[#9AA6BD] mt-0.5 block">
                  Click to consult stand-in
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Three Pillars Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Grounded RAG */}
        <div
          onClick={() => onNavigateTab('knowledge')}
          className="p-5 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#D4AF63] flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#8FAAD6] group-hover:text-[#B08A3E] transition-colors">
            Lecture Slides Knowledge
          </h4>
          <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] mt-1.5 leading-relaxed">
            26 curated slide chunks indexing OOP principles, JVM mechanics, marks distribution, and syllabus details.
          </p>
        </div>

        {/* Card 2: Judgement & Honesty */}
        <div
          onClick={() => onNavigateTab('how-it-works')}
          className="p-5 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF3D6] dark:bg-[#2A2314] text-[#C98A1B] dark:text-[#E0A94A] flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#8FAAD6] group-hover:text-[#C98A1B] transition-colors">
            Academic Boundaries
          </h4>
          <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] mt-1.5 leading-relaxed">
            Deterministic pre-model rules safeguard exam integrity, prohibit code-writing for homework, and escalate personal requests.
          </p>
        </div>

        {/* Card 3: Professor Handoff */}
        <div
          onClick={onOpenProfessorModal}
          className="p-5 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E6ECF4] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#8FAAD6] group-hover:text-[#8FAAD6] transition-colors">
            Office Hours & Counseling
          </h4>
          <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] mt-1.5 leading-relaxed">
            {defaultProfessor.freeWindowWeekly} counseling window. Connect with {defaultProfessor.name} directly for retakes or recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};
