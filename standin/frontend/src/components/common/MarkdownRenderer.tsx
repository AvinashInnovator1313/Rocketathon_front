import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parts: React.ReactNode[] = [];
  const lines = content.split('\n');
  let inCode = false;
  let codeBuffer: string[] = [];
  let codeLang = '';
  let textBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length > 0) {
      const text = textBuffer.join('\n');
      parts.push(<TextBlock key={`text-${parts.length}`} text={text} />);
      textBuffer = [];
    }
  };

  const flushCode = () => {
    if (codeBuffer.length > 0) {
      const code = codeBuffer.join('\n');
      parts.push(
        <CodeBlock
          key={`code-${parts.length}`}
          code={code}
          lang={codeLang || 'java'}
        />
      );
      codeBuffer = [];
      codeLang = '';
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      if (!inCode) {
        flushText();
        inCode = true;
        codeLang = line.trim().slice(3).trim();
      } else {
        flushCode();
        inCode = false;
      }
    } else if (inCode) {
      codeBuffer.push(line);
    } else {
      textBuffer.push(line);
    }
  }

  if (inCode) flushCode();
  else flushText();

  return <div className="space-y-3 leading-relaxed text-sm md:text-base">{parts}</div>;
};

const TextBlock: React.FC<{ text: string }> = ({ text }) => {
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <div className="space-y-2.5">
      {paragraphs.map((p, idx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        if (trimmed.split('\n').every(l => l.trim().startsWith('- ') || l.trim().startsWith('* ') || /^\d+\.\s/.test(l.trim()))) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1 my-1.5 marker:text-[#B08A3E]">
              {trimmed.split('\n').map((item, itemIdx) => {
                const cleanItem = item.replace(/^[-*]\s+|\d+\.\s+/, '');
                return <li key={itemIdx}>{formatInline(cleanItem)}</li>;
              })}
            </ul>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-academic text-base font-semibold text-[#1B2A4A] dark:text-[#8FAAD6] mt-2">
              {formatInline(trimmed.slice(4))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-academic text-lg font-semibold text-[#1B2A4A] dark:text-[#8FAAD6] mt-2 border-b border-[#E4DCCB] dark:border-[#2A3556] pb-1">
              {formatInline(trimmed.slice(3))}
            </h3>
          );
        }

        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-3 border-[#B08A3E] pl-3 py-1 italic bg-[#F1E7D0]/30 dark:bg-[#1D2848]/40 rounded-r text-xs md:text-sm">
              {formatInline(trimmed.replace(/^>\s*/gm, ''))}
            </blockquote>
          );
        }

        return <p key={idx}>{formatInline(trimmed)}</p>;
      })}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; lang: string }> = ({ code, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-lg overflow-hidden border border-[#E4DCCB] dark:border-[#2A3556] bg-[#1B2A4A] text-[#ECE8DD] text-xs font-code shadow-sm">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#14203A] border-b border-[#2A3556] text-[11px] text-[#8FAAD6]">
        <span className="uppercase font-mono tracking-wider font-semibold">{lang || 'CODE'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs hover:text-white transition-colors px-2 py-0.5 rounded bg-[#1B2A4A]"
          title="Copy code to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto whitespace-pre font-code text-xs leading-5">
        <code>{code}</code>
      </pre>
    </div>
  );
};

function formatInline(str: string): React.ReactNode {
  const elements: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      elements.push(str.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      elements.push(<strong key={match.index} className="font-semibold text-[#1B2A4A] dark:text-[#8FAAD6]">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('*') && token.endsWith('*')) {
      elements.push(<em key={match.index} className="italic">{token.slice(1, -1)}</em>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      elements.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-[#F5F0E4] dark:bg-[#111A30] text-[#7A5C1E] dark:text-[#D4AF63] font-code text-[12px] border border-[#E4DCCB]/60 dark:border-[#2A3556]">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) {
    elements.push(str.substring(lastIndex));
  }

  return <>{elements}</>;
}
