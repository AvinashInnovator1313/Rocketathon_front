import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, Loader2 } from 'lucide-react';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { transcribeAudio } from '../../api/client';
import { useSettings } from '../../context/SettingsContext';

interface ChatInputProps {
  onSendMessage: (question: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Ask Dr. Ahmed about Java OOP, polymorphism, course marks, or exam rules..."
}) => {
  const [input, setInput] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();
  const { settings } = useSettings();

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = async () => {
    if (isRecording) {
      setIsTranscribing(true);
      const audioBlob = await stopRecording();
      if (audioBlob) {
        const { text } = await transcribeAudio(audioBlob, settings.language);
        if (text) {
          setInput(prev => (prev ? `${prev} ${text}` : text));
        }
      }
      setIsTranscribing(false);
    } else {
      await startRecording();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Microphone recording banner */}
      {isRecording && (
        <div className="mb-2 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 text-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="font-medium">Listening to your question... Speak clearly.</span>
          </div>
          <button
            onClick={handleMicClick}
            className="text-[11px] px-2 py-0.5 rounded bg-red-600 text-white font-medium hover:bg-red-700"
          >
            Done speaking
          </button>
        </div>
      )}

      {/* Main Input Box */}
      <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-[#FFFEF9] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-sm focus-within:border-[#B08A3E] dark:focus-within:border-[#D4AF63] transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? 'Listening...' : placeholder}
          disabled={disabled || isRecording || isTranscribing}
          rows={1}
          maxLength={500}
          className="w-full max-h-40 py-2 px-3 bg-transparent text-sm md:text-base text-[#1A2238] dark:text-[#ECE8DD] placeholder-[#5A6478]/60 dark:placeholder-[#9AA6BD]/60 focus:outline-hidden resize-none leading-relaxed"
        />

        {/* Action Buttons: Voice Mic + Send */}
        <div className="flex items-center gap-1.5 pb-1 pr-1 shrink-0">
          <button
            type="button"
            onClick={handleMicClick}
            disabled={disabled || isTranscribing}
            className={`p-2 rounded-xl transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-bounce'
                : isTranscribing
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950'
                : 'text-[#5A6478] hover:text-[#1B2A4A] dark:text-[#9AA6BD] dark:hover:text-[#ECE8DD] hover:bg-[#F6F0D8] dark:hover:bg-[#1D2848]'
            }`}
            title={isRecording ? 'Stop recording' : 'Voice input (Whisper STT)'}
            aria-label="Voice question input"
          >
            {isTranscribing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isRecording ? (
              <Square className="w-4 h-4 fill-current" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className={`p-2 rounded-xl transition-all shadow-xs ${
              input.trim() && !disabled
                ? 'bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] dark:hover:bg-[#E3C27A] scale-100'
                : 'bg-[#E4DCCB]/50 dark:bg-[#2A3556]/50 text-[#5A6478]/50 dark:text-[#9AA6BD]/50 cursor-not-allowed'
            }`}
            title="Send question (Enter)"
            aria-label="Send question"
          >
            {disabled ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Subtle Hint Bar */}
      <div className="flex justify-between items-center px-3 mt-1.5 text-[11px] text-[#5A6478] dark:text-[#9AA6BD]">
        <span>Press <kbd className="px-1 py-0.2 rounded bg-[#FAF6EE] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] font-mono text-[10px]">Enter</kbd> to ask • <kbd className="px-1 py-0.2 rounded bg-[#FAF6EE] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] font-mono text-[10px]">Shift+Enter</kbd> for new line</span>
        <span>{input.length}/500</span>
      </div>
    </div>
  );
};
