import React from 'react';
import { User } from 'lucide-react';

interface StudentMessageProps {
  question: string;
  timestamp: number;
}

export const StudentMessage: React.FC<StudentMessageProps> = ({ question, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex justify-end items-end gap-2.5 my-4 group">
      <div className="flex flex-col items-end max-w-[85%] md:max-w-[75%]">
        <div className="px-4 py-3 rounded-2xl rounded-br-xs bg-[#E6ECF4] dark:bg-[#24314F] text-[#1A2238] dark:text-[#ECE8DD] text-sm md:text-base shadow-xs leading-relaxed break-words">
          {question}
        </div>
        <span className="text-[10px] text-[#5A6478] dark:text-[#9AA6BD] mt-1 mr-1">
          {formattedTime}
        </span>
      </div>

      <div className="w-7 h-7 rounded-full bg-[#4A5D7E] text-white flex items-center justify-center shrink-0 mb-4 shadow-xs">
        <User className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
