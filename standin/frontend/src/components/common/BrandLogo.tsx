import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer select-none group"
      title="Professor Stand-In"
    >
      <div className="w-11 h-11 rounded-xl bg-[#372E31] dark:bg-[#1A2238] flex items-center justify-center shadow-md transition-transform group-hover:scale-105 shrink-0">
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 text-[#D4AF63]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 10 C10 8 13 9 16 11 C19 9 22 8 26 10 L26 23 C22 21 19 22 16 24 C13 22 10 21 6 23 Z" />
          <path d="M16 11 L16 24" />
          <path d="M13 23.5 C14.5 22.5 17.5 22.5 19 23.5" strokeWidth="1.4" />
          <circle cx="11.5" cy="6.5" r="1.5" fill="#D4AF63" />
          <circle cx="20.5" cy="6.5" r="1.5" fill="#D4AF63" />
          <path d="M13 6.5 L19 6.5" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <path d="M16 6.5 L16 9" strokeWidth="1.2" />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span className="font-academic text-lg font-bold text-[#1B2A4A] dark:text-[#8FAAD6] tracking-tight">
              Professor
            </span>
            <span className="font-academic italic text-lg text-[#B08A3E] dark:text-[#D4AF63]">
              Stand-In
            </span>
          </div>
          <span className="text-[11px] font-sans text-[#5A6478] dark:text-[#9AA6BD]">
            Academic Digital Assistant
          </span>
        </div>
      )}
    </div>
  );
};
