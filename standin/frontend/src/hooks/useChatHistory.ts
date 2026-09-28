import { useState, useEffect } from 'react';
import type { ChatSession, ChatTurn } from '../api/types';

const SESSIONS_KEY = 'standin_sessions';
const CURRENT_ID_KEY = 'standin_current_session_id';

const INITIAL_STARTER_SESSION: ChatSession = {
  id: 'welcome-session',
  title: 'Introduction to OOP Java',
  createdAt: Date.now() - 1000 * 60 * 30, // 30 mins ago
  updatedAt: Date.now() - 1000 * 60 * 30,
  turns: [
    {
      id: 'turn-welcome-1',
      timestamp: Date.now() - 1000 * 60 * 30,
      question: 'What is the marks distribution for this course?',
      response: {
        type: 'ans',
        text: 'Assalam o Alaikum! The course is **OOP (Java)** with **3+1 Credit Hours**:\n\n- **Theory (3 Credit Hours, Total 100 Marks):**\n  - Midterm Exam: **30 marks**\n  - Final Exam: **50 marks**\n  - Sessional: **20 marks** (Assignments 5, Semester Project 10, Quizzes 5)\n\n- **Practical (1 Credit Hour, Total 50 Marks):**\n  - Practical Exam: **25 marks**\n  - Project Viva: **10 marks**\n  - Student Portfolio: **15 marks**',
        cat: null,
        sources: ['Introduction lecture, slide 4'],
        general: false
      }
    }
  ]
};

export function useChatHistory() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse sessions from local storage', e);
      }
    }
    return [INITIAL_STARTER_SESSION];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const savedId = localStorage.getItem(CURRENT_ID_KEY);
    if (savedId && sessions.some(s => s.id === savedId)) {
      return savedId;
    }
    return sessions[0]?.id || 'session-1';
  });

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(CURRENT_ID_KEY, currentSessionId);
  }, [currentSessionId]);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0] || null;

  const createNewSession = (title = 'New Discussion'): string => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      turns: []
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    return newId;
  };

  const selectSession = (id: string) => {
    if (sessions.some(s => s.id === id)) {
      setCurrentSessionId(id);
    }
  };

  const deleteSession = (id: string) => {
    setSessions(prev => {
      const remaining = prev.filter(s => s.id !== id);
      if (currentSessionId === id) {
        const nextId = remaining[0]?.id || '';
        setCurrentSessionId(nextId);
      }
      return remaining;
    });
  };

  const addTurnToCurrentSession = (turn: ChatTurn, sessionOverrideId?: string) => {
    const targetId = sessionOverrideId || currentSessionId;
    setSessions(prev =>
      prev.map(s => {
        if (s.id === targetId) {
          const isFirstTurn = s.turns.length === 0;
          const updatedTitle = isFirstTurn
            ? turn.question.length > 45
              ? turn.question.slice(0, 42) + '...'
              : turn.question
            : s.title;

          return {
            ...s,
            title: updatedTitle,
            updatedAt: Date.now(),
            turns: [...s.turns, turn]
          };
        }
        return s;
      })
    );
  };

  const updateTurnInCurrentSession = (turnId: string, updates: Partial<ChatTurn>, sessionOverrideId?: string) => {
    const targetId = sessionOverrideId || currentSessionId;
    setSessions(prev =>
      prev.map(s => {
        if (s.id === targetId) {
          return {
            ...s,
            updatedAt: Date.now(),
            turns: s.turns.map(t => (t.id === turnId ? { ...t, ...updates } : t))
          };
        }
        return s;
      })
    );
  };

  return {
    sessions,
    currentSession,
    currentSessionId,
    createNewSession,
    selectSession,
    deleteSession,
    addTurnToCurrentSession,
    updateTurnInCurrentSession
  };
}
