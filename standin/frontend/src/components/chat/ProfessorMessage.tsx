import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ThumbsUp, ThumbsDown, AlertTriangle, Loader2 } from 'lucide-react';
import type { AskResponse } from '../../api/types';
import { defaultProfessor } from '../../config/professor.config';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { SourceDrawer } from './SourceDrawer';
import { EscalationBanner } from './EscalationBanner';
import { submitReview, synthesizeSpeech } from '../../api/client';

interface ProfessorMessageProps {
  question: string;
  response?: AskResponse;
  loading?: boolean;
  error?: string;
  timestamp: number;
  initialReview?: 'agree' | 'disagree' | 'should_escalate';
  onReviewSubmit?: (mark: 'agree' | 'disagree' | 'should_escalate') => void;
  onRetry?: () => void;
}

export const ProfessorMessage: React.FC<ProfessorMessageProps> = ({
  question,
  response,
  loading = false,
  error,
  timestamp,
  initialReview,
  onReviewSubmit,
  onRetry
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedReview, setSelectedReview] = useState<string | undefined>(initialReview);

  const handleCopy = () => {
    if (!response?.text) return;
    navigator.clipboard.writeText(response.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAudio = async () => {
    if (isPlayingAudio && currentAudio) {
      currentAudio.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (!response?.text) return;

    setAudioLoading(true);
    try {
      const { audioBlob } = await synthesizeSpeech(response.text);
      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        setCurrentAudio(audio);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          setIsPlayingAudio(false);
          fallbackWebSpeech(response.text);
        };
        audio.play();
        setIsPlayingAudio(true);
      } else {
        fallbackWebSpeech(response.text);
      }
    } catch (err) {
      console.warn('Audio synthesis failed, using speech synthesis fallback:', err);
      fallbackWebSpeech(response.text);
    } finally {
      setAudioLoading(false);
    }
  };

  const fallbackWebSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleMark = async (mark: 'agree' | 'disagree' | 'should_escalate') => {
    setSelectedReview(mark);
    if (onReviewSubmit) onReviewSubmit(mark);
    await submitReview({
      q: question,
      answer: response?.text || '',
      type: response?.type || 'ans',
      mark
    });
  };

  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex justify-start items-start gap-3 my-4 group">
      {/* Professor Avatar with initials */}
      <div
        className="w-8 h-8 rounded-full bg-[#372E31] dark:bg-[#1A2238] text-[#D4AF63] flex items-center justify-center font-academic font-bold text-xs shadow-xs border border-[#D4AF63]/30 shrink-0 mt-1"
        title={`${defaultProfessor.name} Stand-In`}
      >
        {defaultProfessor.initials}
      </div>

      <div className="flex flex-col items-start max-w-[90%] md:max-w-[80%]">
        {/* Professor Card: 3px gold left edge, calm academic surface */}
        <div className="relative w-full rounded-2xl rounded-tl-xs bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] border-l-4 border-l-[#B08A3E] dark:border-l-[#D4AF63] p-4 md:p-5 shadow-xs text-[#1A2238] dark:text-[#ECE8DD]">
          {/* Header row in card */}
          <div className="flex items-center justify-between mb-3 text-xs text-[#5A6478] dark:text-[#9AA6BD]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1B2A4A] dark:text-[#8FAAD6]">
                {defaultProfessor.name} Stand-In
              </span>
              {/* Subtle AI node-and-line indicator motif */}
              <div className="flex items-center gap-1 text-[11px] text-[#7A5C1E] dark:text-[#D4AF63] bg-[#F1E7D0]/60 dark:bg-[#24314F] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08A3E] dark:bg-[#D4AF63]" />
                <span>Verified Curriculum</span>
              </div>
            </div>

            {/* Action buttons (Listen & Copy) */}
            {!loading && !error && response && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleToggleAudio}
                  disabled={audioLoading}
                  className="p-1.5 rounded-md hover:bg-[#F5F0E4] dark:hover:bg-[#1D2848] text-[#5A6478] hover:text-[#1B2A4A] dark:hover:text-[#ECE8DD] transition-colors"
                  title={isPlayingAudio ? 'Stop reading' : 'Listen with Piper voice'}
                  aria-label="Listen to answer"
                >
                  {audioLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B08A3E]" />
                  ) : isPlayingAudio ? (
                    <VolumeX className="w-3.5 h-3.5 text-[#B08A3E]" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-[#F5F0E4] dark:hover:bg-[#1D2848] text-[#5A6478] hover:text-[#1B2A4A] dark:hover:text-[#ECE8DD] transition-colors"
                  title="Copy explanation"
                  aria-label="Copy explanation"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Loading State: Subtle gold pulse with node motif, no robot heads */}
          {loading && (
            <div className="py-4 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#7A5C1E] dark:text-[#D4AF63] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#B08A3E] dark:bg-[#D4AF63]" />
                <span className="font-academic italic">Consulting {defaultProfessor.name}'s lecture notes...</span>
              </div>
              <div className="h-3 bg-[#E4DCCB]/40 dark:bg-[#2A3556]/40 rounded-full w-5/6 animate-pulse" />
              <div className="h-3 bg-[#E4DCCB]/30 dark:bg-[#2A3556]/30 rounded-full w-4/6 animate-pulse" />
            </div>
          )}

          {/* Error State with friendly message and retry */}
          {error && !loading && (
            <div className="py-3 text-xs md:text-sm text-[#A6493F] dark:text-[#D9756A] space-y-2">
              <p>The academic assistant is currently reflecting or reconnecting to the lecture server.</p>
              <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD]">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-3 py-1 text-xs rounded bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] transition-colors"
                >
                  Retry question
                </button>
              )}
            </div>
          )}

          {/* Render Response Body */}
          {!loading && !error && response && (
            <>
              {response.type === 'esc' ? (
                <EscalationBanner
                  cat={response.cat}
                  text={response.text}
                  sources={response.sources}
                />
              ) : (
                <div className="prose-content">
                  <MarkdownRenderer content={response.text} />
                  {/* Sources Drawer */}
                  <SourceDrawer
                    sources={response.sources}
                    isGeneral={response.general}
                  />
                </div>
              )}

              {/* Review / Honesty Bar (Agree / Disagree / Escalate) */}
              <div className="mt-4 pt-3 border-t border-[#E4DCCB]/60 dark:border-[#2A3556]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-[#5A6478] dark:text-[#9AA6BD]">
                  Based on {defaultProfessor.name}'s knowledge base
                </span>

                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-[#5A6478] dark:text-[#9AA6BD] mr-1 hidden sm:inline">Evaluate response:</span>
                  <button
                    onClick={() => handleMark('agree')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      selectedReview === 'agree'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold'
                        : 'hover:bg-[#F5F0E4] dark:hover:bg-[#1D2848] text-[#5A6478] dark:text-[#9AA6BD]'
                    }`}
                    title="Accurate to slides"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Agree</span>
                  </button>

                  <button
                    onClick={() => handleMark('disagree')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      selectedReview === 'disagree'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-semibold'
                        : 'hover:bg-[#F5F0E4] dark:hover:bg-[#1D2848] text-[#5A6478] dark:text-[#9AA6BD]'
                    }`}
                    title="Inaccurate or incomplete"
                  >
                    <ThumbsDown className="w-3 h-3" />
                    <span>Disagree</span>
                  </button>

                  <button
                    onClick={() => handleMark('should_escalate')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      selectedReview === 'should_escalate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold'
                        : 'hover:bg-[#F5F0E4] dark:hover:bg-[#1D2848] text-[#5A6478] dark:text-[#9AA6BD]'
                    }`}
                    title="Should have been escalated to professor"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span className="hidden sm:inline">Needs Handoff</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <span className="text-[10px] text-[#5A6478] dark:text-[#9AA6BD] mt-1 ml-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
