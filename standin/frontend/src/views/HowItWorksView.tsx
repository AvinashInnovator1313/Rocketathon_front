import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { defaultProfessor } from '../config/professor.config';
import { fetchRules } from '../api/client';
import type { RuleItem } from '../api/types';

export const HowItWorksView: React.FC = () => {
  const [rules, setRules] = useState<RuleItem[]>([]);
  const [selectedRule, setSelectedRule] = useState<RuleItem | null>(null);

  useEffect(() => {
    fetchRules().then(({ rules }) => {
      setRules(rules);
      if (rules.length > 0) setSelectedRule(rules[0]);
    });
  }, []);

  const pipelineSteps = [
    { title: 'Professor Knowledge', desc: 'Curated lecture slides, interview answers & course policies' },
    { title: 'Structured Dataset', desc: 'Chunked markdown with exact slide & source attribution' },
    { title: 'Retrieval Engine', desc: 'ChromaDB vector cosine search & pre-model rule validation' },
    { title: 'AI Response', desc: 'Strictly grounded synthesis with slide citations or fallback' },
    { title: 'Student UI', desc: 'Conversational chat with code highlighting, voice STT & TTS' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      {/* 1. Top Card: 5-Stage Pipeline Flow matching Wireframe 3 */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A9A60] dark:bg-[#D4AF63]" />
          <h3 className="font-academic text-lg md:text-xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
            The Stand-In Knowledge Pipeline
          </h3>
        </div>

        {/* Sequential flow with capsules and arrows matching wireframe 3 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="w-full md:w-auto flex-1 p-3 rounded-xl bg-[#ECF1DD] dark:bg-[#24314F] border border-[#8A9A60]/40 dark:border-[#D4AF63]/40 text-center shadow-2xs group hover:scale-102 transition-transform">
                <span className="text-[10px] font-mono font-bold text-[#7A5C1E] dark:text-[#D4AF63] block uppercase tracking-wider">
                  0{idx + 1}
                </span>
                <span className="text-xs font-bold text-[#1B2A4A] dark:text-[#ECE8DD] block mt-0.5">
                  {step.title}
                </span>
                <span className="text-[10px] text-[#5A6478] dark:text-[#9AA6BD] mt-1 hidden lg:block leading-tight">
                  {step.desc}
                </span>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="text-[#8A9A60] dark:text-[#D4AF63] shrink-0 transform rotate-90 md:rotate-0 my-1 md:my-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 2. Middle Row: 2 Cards Side by Side matching Wireframe 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Card: Academic Context & Professor Persona */}
        <div className="p-6 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#D4AF63] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-academic text-lg font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
                Academic Authority & Context
              </h4>
              <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                {defaultProfessor.name} • {defaultProfessor.department}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-[#1A2238] dark:text-[#ECE8DD] leading-relaxed">
            <p>
              This digital stand-in is built specifically to represent <strong>{defaultProfessor.name}</strong>'s university coursework.
              It is not a generic AI chatbot — it acts as an extension of the professor's office hours and lecture hall.
            </p>
            <p className="text-[#5A6478] dark:text-[#9AA6BD]">
              {defaultProfessor.bio}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556]">
            <span className="text-[11px] font-semibold text-[#7A5C1E] dark:text-[#D4AF63] uppercase tracking-wide block mb-1">
              Curriculum Covered:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#5A6478] dark:text-[#9AA6BD]">
              <li>• OOP Concepts & Pillars</li>
              <li>• Classes & Encapsulation</li>
              <li>• Inheritance & Polymorphism</li>
              <li>• JVM, JDK & JRE Architecture</li>
              <li>• Aggregation vs Composition</li>
              <li>• Marks & Examination Schemes</li>
            </ul>
          </div>
        </div>

        {/* Right Card: Judgement Rules & Boundary Architecture */}
        <div className="p-6 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#D4AF63] flex items-center justify-center">
              <GitBranch className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-academic text-lg font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
                Pre-Model Judgement Rules
              </h4>
              <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                Deterministic integrity guardrails from <code className="font-mono text-[11px]">/api/rules</code>
              </p>
            </div>
          </div>

          <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] leading-relaxed">
            Before any prompt reaches the AI model, questions pass through strict judgement rules.
            Violations are halted immediately and directed to official university procedures.
          </p>

          {/* 4 Category capsules matching Wireframe 3 */}
          <div className="flex flex-wrap gap-2 pt-1">
            {rules.slice(0, 4).map((rule, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRule(rule)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  selectedRule?.cat === rule.cat
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] dark:bg-[#D4AF63] dark:text-[#0E1526]'
                    : 'bg-[#FFFEF9] text-[#5A6478] border-[#E4DCCB] dark:bg-[#1D2848] dark:text-[#9AA6BD] dark:border-[#2A3556] hover:border-[#B08A3E]'
                }`}
              >
                {rule.cat}
              </button>
            ))}
          </div>

          {/* Selected Rule Explanation Box */}
          {selectedRule && (
            <div className="p-3.5 rounded-xl bg-[#FAF6EE] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#A6493F] dark:text-[#D9756A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Boundary: {selectedRule.cat}</span>
              </div>
              <p className="text-[#1A2238] dark:text-[#ECE8DD]">
                <strong className="text-[#5A6478] dark:text-[#9AA6BD]">Why Refused:</strong> {selectedRule.why}
              </p>
              <p className="text-[#7A5C1E] dark:text-[#D4AF63]">
                <strong className="text-[#5A6478] dark:text-[#9AA6BD]">Proper Procedure:</strong> {selectedRule.do}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Banner with 3px Green Accent Bar matching Wireframe 3 */}
      <div className="relative rounded-2xl bg-[#ECEFDC] dark:bg-[#16242B] border border-[#A9B47A]/50 dark:border-[#6FB08A]/40 border-l-4 border-l-[#A9B47A] dark:border-l-[#6FB08A] p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-academic text-base md:text-lg font-bold text-[#1B2A4A] dark:text-[#ECE8DD]">
              Preserve the Professor's Knowledge. Make It Available to the Student.
            </h4>
            <p className="text-xs text-[#4A5D7E] dark:text-[#9AA6BD] leading-relaxed max-w-2xl">
              Personal appeals, grade re-evaluations, medical notes, or recommendation letters require the professor's direct authority.
              {defaultProfessor.name}'s weekly counseling window is {defaultProfessor.freeWindowWeekly}.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${defaultProfessor.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] text-xs font-semibold shadow-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email {defaultProfessor.name}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
