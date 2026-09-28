import React, { useState } from 'react';
import {
  User,
  Sun,
  Bell,
  Globe,
  HelpCircle,
  Trash2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateProfile, toggleAutoPlayTTS, setLanguage, clearAllData } = useSettings();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(settings.profile.name);
  const [idInput, setIdInput] = useState(settings.profile.studentId);
  const [semesterInput, setSemesterInput] = useState(settings.profile.semester);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      studentId: idInput,
      semester: semesterInput
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Centered Structured Settings Card matching Wireframe 4 */}
      <div className="rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xs overflow-hidden">
        <div className="divide-y divide-[#E4DCCB]/70 dark:divide-[#2A3556]/70">
          {/* Row 1: User Profile */}
          <div className="p-5 md:p-6 hover:bg-[#FAF6EE]/50 dark:hover:bg-[#1D2848]/40 transition-colors">
            <div className="flex items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#ECE8DD]">
                    Student Profile
                  </h4>
                  <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                    {settings.profile.name} • {settings.profile.studentId} • {settings.profile.semester}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FFFEF9] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#ECE8DD] border border-[#E4DCCB] dark:border-[#2A3556] hover:bg-[#FAF6EE] transition-colors shrink-0"
              >
                {isEditingProfile ? 'Cancel' : 'Edit Info'}
              </button>
            </div>

            {/* Profile Edit Drawer Form */}
            {isEditingProfile && (
              <form onSubmit={handleSaveProfile} className="mt-4 pt-4 border-t border-[#E4DCCB]/60 dark:border-[#2A3556]/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6478] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#FFFEF9] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] text-[#1A2238] dark:text-[#ECE8DD]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6478] mb-1">Student ID / Roll #</label>
                  <input
                    type="text"
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#FFFEF9] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] text-[#1A2238] dark:text-[#ECE8DD]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6478] mb-1">Semester</label>
                  <input
                    type="text"
                    value={semesterInput}
                    onChange={(e) => setSemesterInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#FFFEF9] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] text-[#1A2238] dark:text-[#ECE8DD]"
                  />
                </div>
                <div className="sm:col-span-3 flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Row 2: Theme Switch matching Wireframe 4 (Sun icon + Toggle) */}
          <div className="p-5 md:p-6 hover:bg-[#FAF6EE]/50 dark:hover:bg-[#1D2848]/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#ECE8DD]">
                  Library Theme
                </h4>
                <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                  {theme === 'dark' ? 'Library After Hours (Dark Mode)' : 'Library Morning (Warm Academic Light)'}
                </p>
              </div>
            </div>

            {/* Custom Toggle Switch matching Wireframe 4 hex #A6BC69 */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-hidden ${
                theme === 'dark' ? 'bg-[#A6BC69]' : 'bg-[#A6BC69]'
              }`}
              role="switch"
              aria-checked={theme === 'dark'}
              title="Toggle theme"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Row 3: Audio / Speech Synthesis (Bell icon + Toggle) */}
          <div className="p-5 md:p-6 hover:bg-[#FAF6EE]/50 dark:hover:bg-[#1D2848]/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#ECE8DD]">
                  Audio Speech Output (Piper TTS)
                </h4>
                <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                  Automatically synthesize voice playback for responses
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleAutoPlayTTS}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-hidden ${
                settings.autoPlayTTS ? 'bg-[#A6BC69]' : 'bg-[#D5D1C3] dark:bg-[#2A3556]'
              }`}
              role="switch"
              aria-checked={settings.autoPlayTTS}
              title="Toggle auto-play speech"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                  settings.autoPlayTTS ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Row 4: Language Selection matching Wireframe 4 */}
          <div className="p-5 md:p-6 hover:bg-[#FAF6EE]/50 dark:hover:bg-[#1D2848]/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#ECE8DD]">
                  Language / Accent Support
                </h4>
                <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                  Speech-to-text transcription model tuning
                </p>
              </div>
            </div>

            <select
              value={settings.language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ur')}
              className="px-3 py-1.5 text-xs rounded-lg bg-[#FFFEF9] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] text-[#1A2238] dark:text-[#ECE8DD] focus:outline-hidden"
            >
              <option value="en">English (US / Academic)</option>
              <option value="ur">Urdu / Bilingual Support</option>
            </select>
          </div>

          {/* Row 5: FAQ & System Details matching Wireframe 4 */}
          <div className="p-5 md:p-6 hover:bg-[#FAF6EE]/50 dark:hover:bg-[#1D2848]/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#8FAAD6] flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#ECE8DD]">
                  About Professor Stand-In
                </h4>
                <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                  System architecture, model parameters, and honesty manifesto
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFaqModal(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FFFEF9] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#ECE8DD] border border-[#E4DCCB] dark:border-[#2A3556] hover:bg-[#FAF6EE]"
            >
              View Info
            </button>
          </div>

          {/* Row 6: Clear History / Reset Data matching Wireframe 4 */}
          <div className="p-5 md:p-6 hover:bg-[#FFF2F0]/40 dark:hover:bg-[#2B1B1B]/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2F0] dark:bg-[#2B1B1B] text-[#A6493F] dark:text-[#D9756A] flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-academic text-base font-bold text-[#A6493F] dark:text-[#D9756A]">
                  Clear All History & Preferences
                </h4>
                <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">
                  Permanently deletes stored browser conversation turns and cached reviews
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all conversation history and reset preferences?')) {
                  clearAllData();
                }
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#FFF2F0] dark:bg-[#2B1B1B] text-[#A6493F] dark:text-[#D9756A] border border-[#A6493F]/30 hover:bg-[#A6493F] hover:text-white transition-colors"
            >
              Clear Storage
            </button>
          </div>
        </div>
      </div>

      {/* About & FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xl space-y-4">
            <h3 className="font-academic text-xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
              About Professor Stand-In
            </h3>
            <div className="space-y-3 text-xs md:text-sm text-[#5A6478] dark:text-[#9AA6BD] leading-relaxed">
              <p>
                <strong>Professor Stand-In</strong> preserves university professors' genuine teaching knowledge and makes it accessible to students at all hours.
              </p>
              <div className="p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] space-y-1">
                <p className="text-xs font-semibold text-[#1B2A4A] dark:text-[#ECE8DD]">Key Architecture Principles:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>Grounded Slides RAG:</strong> Semantic vector search over lecture notes before answering.</li>
                  <li><strong>Deterministic Stop Rules:</strong> Academic integrity filters prevent exam cheating and homework automation.</li>
                  <li><strong>Speech Integration:</strong> Whisper speech-to-text and offline Piper neural audio synthesis.</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFaqModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
