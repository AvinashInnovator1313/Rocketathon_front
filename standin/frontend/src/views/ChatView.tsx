import React, { useRef, useEffect, useState } from 'react';
import { StudentMessage } from '../components/chat/StudentMessage';
import { ProfessorMessage } from '../components/chat/ProfessorMessage';
import { ChatInput } from '../components/chat/ChatInput';
import type { ChatTurn, ChatSession } from '../api/types';
import { askQuestion } from '../api/client';
import { defaultProfessor } from '../config/professor.config';
import { BookOpen } from 'lucide-react';

interface ChatViewProps {
  currentSession: ChatSession | null;
  onAddTurn: (turn: ChatTurn) => void;
  onUpdateTurn: (turnId: string, updates: Partial<ChatTurn>) => void;
  onSelectStarterPrompt?: (prompt: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentSession,
  onAddTurn,
  onUpdateTurn,
  onSelectStarterPrompt: _onSelectStarterPrompt
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.turns, isGenerating]);

  const handleSendMessage = async (question: string) => {
    if (!question.trim() || isGenerating) return;

    const turnId = `turn-${Date.now()}`;
    const newTurn: ChatTurn = {
      id: turnId,
      timestamp: Date.now(),
      question,
      loading: true
    };

    onAddTurn(newTurn);
    setIsGenerating(true);

    try {
      // Build history for backend LLM
      const history = (currentSession?.turns || []).flatMap(t => [
        { role: 'user' as const, content: t.question },
        ...(t.response?.text ? [{ role: 'assistant' as const, content: t.response.text }] : [])
      ]);

      const { response } = await askQuestion(question, history);
      onUpdateTurn(turnId, {
        loading: false,
        response
      });
    } catch (err: any) {
      console.error('Failed to get answer:', err);
      onUpdateTurn(turnId, {
        loading: false,
        error: err?.message || 'Could not communicate with the lecture model.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = async (turn: ChatTurn) => {
    onUpdateTurn(turn.id, { loading: true, error: undefined });
    setIsGenerating(true);
    try {
      const { response } = await askQuestion(turn.question);
      onUpdateTurn(turn.id, { loading: false, response });
    } catch (err: any) {
      onUpdateTurn(turn.id, {
        loading: false,
        error: err?.message || 'Retry failed.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const turns = currentSession?.turns || [];

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-4xl mx-auto px-4 py-4">
      {/* Scrollable Message List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {turns.length === 0 ? (
          /* Empty State: Academic Welcome & Suggested Starters */
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] text-[#B08A3E] dark:text-[#D4AF63] flex items-center justify-center shadow-xs">
              <BookOpen className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="font-academic text-2xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
                Ask {defaultProfessor.name}
              </h3>
              <p className="text-xs md:text-sm text-[#5A6478] dark:text-[#9AA6BD] leading-relaxed">
                Have a question about today's lecture, an upcoming exam, or an object-oriented programming concept?
                Ask freely in English or conversational terms.
              </p>
            </div>

            {/* Quick Starters */}
            <div className="w-full max-w-lg space-y-2">
              <span className="text-[11px] font-semibold text-[#5A6478] uppercase tracking-wider block">
                Popular Questions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {[
                  "What is the difference between aggregation and composition?",
                  "Can you explain polymorphism with an analogy?",
                  "What is the breakdown of theory and lab marks?",
                  "Why does Java not support multiple inheritance with classes?"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="p-3 text-xs rounded-xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] hover:border-[#B08A3E] dark:hover:border-[#D4AF63] text-[#1A2238] dark:text-[#ECE8DD] transition-all text-left shadow-xs"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Populated Conversation */
          <>
            {turns.map((turn) => (
              <div key={turn.id} className="space-y-3">
                <StudentMessage
                  question={turn.question}
                  timestamp={turn.timestamp}
                />
                <ProfessorMessage
                  question={turn.question}
                  response={turn.response}
                  loading={turn.loading}
                  error={turn.error}
                  timestamp={turn.timestamp}
                  initialReview={turn.userReview}
                  onReviewSubmit={(mark) => onUpdateTurn(turn.id, { userReview: mark })}
                  onRetry={() => handleRetry(turn)}
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Sticky Bottom Input Bar */}
      <div className="pt-3 pb-2 shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isGenerating}
          placeholder={`Ask ${defaultProfessor.name} about Java OOP concepts, slides, or marks...`}
        />
      </div>
    </div>
  );
};
