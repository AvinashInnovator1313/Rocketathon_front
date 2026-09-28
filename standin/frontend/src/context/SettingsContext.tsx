import React, { createContext, useContext, useEffect, useState } from 'react';

export interface StudentProfile {
  name: string;
  studentId: string;
  semester: string;
}

export interface AppSettings {
  profile: StudentProfile;
  autoPlayTTS: boolean;
  language: 'en' | 'ur';
  soundEffects: boolean;
}

interface SettingsContextType {
  settings: AppSettings;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  toggleAutoPlayTTS: () => void;
  toggleSoundEffects: () => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  clearAllData: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  profile: {
    name: 'CS Student',
    studentId: 'CS-2024-042',
    semester: 'Semester 3 (Fall)'
  },
  autoPlayTTS: false,
  language: 'en',
  soundEffects: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('standin_settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('standin_settings', JSON.stringify(settings));
  }, [settings]);

  const updateProfile = (profile: Partial<StudentProfile>) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
  };

  const toggleAutoPlayTTS = () => {
    setSettings(prev => ({ ...prev, autoPlayTTS: !prev.autoPlayTTS }));
  };

  const toggleSoundEffects = () => {
    setSettings(prev => ({ ...prev, soundEffects: !prev.soundEffects }));
  };

  const setLanguage = (language: 'en' | 'ur') => {
    setSettings(prev => ({ ...prev, language }));
  };

  const clearAllData = () => {
    localStorage.removeItem('standin_sessions');
    localStorage.removeItem('standin_current_session_id');
    setSettings(DEFAULT_SETTINGS);
    window.location.reload();
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateProfile,
        toggleAutoPlayTTS,
        toggleSoundEffects,
        setLanguage,
        clearAllData
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
