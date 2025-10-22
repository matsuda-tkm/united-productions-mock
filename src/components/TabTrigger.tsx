import React from 'react';
import { colorThemes } from '../themes';
import { ColorTheme } from '../types';

interface TabTriggerProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
  theme: ColorTheme;
  count?: number;
}

export const TabTrigger: React.FC<TabTriggerProps> = ({
  isActive,
  label,
  onClick,
  theme,
  count,
}) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 ${
        theme === 'gold' ? 'rounded-sm' : 'rounded-xl'
      } border-2 px-6 py-4 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isActive
          ? (theme === 'colorful'
              ? 'border-mste-electric-cyan bg-mste-gradient text-white shadow-mste-glow focus:ring-mste-electric-cyan'
              : theme === 'colorful-light'
              ? 'border-transparent bg-mste-gradient text-white shadow-lg focus:ring-mste-electric-cyan'
              : theme === 'gold'
              ? `border-${currentTheme.accent} ${currentTheme.primaryBg} text-white ${theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-lg'} focus:ring-${currentTheme.accent}`
              : `border-${currentTheme.accent} bg-gradient-to-r ${currentTheme.primaryBg} text-white shadow-lg focus:ring-${currentTheme.accent}`)
          : (theme === 'colorful'
              ? "border-mste-electric-cyan/30 bg-mste-bg-dark/60 text-mste-electric-cyan hover:border-mste-electric-cyan hover:bg-mste-electric-cyan/20 hover:text-white focus:ring-mste-electric-cyan"
              : theme === 'colorful-light'
              ? "border-mste-electric-cyan/30 bg-white text-mste-royal-blue hover:border-mste-hot-magenta hover:bg-gradient-to-r hover:from-mste-electric-cyan/20 hover:to-mste-hot-magenta/20 hover:text-mste-hot-magenta focus:ring-mste-electric-cyan"
              : theme === 'gold'
              ? "border-gold-300 bg-gold-elegant text-gold-700 hover:border-gold-500 hover:bg-gold-luxury hover:text-white focus:ring-gold-500"
              : "border-stone-300 bg-white text-stone-600 hover:border-stone-500 hover:bg-stone-50 hover:text-stone-800 focus:ring-stone-500")
      }`}
      aria-pressed={isActive}
      aria-label={`${label}タブ${count !== undefined ? ` (${count}件)` : ''}`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          isActive 
            ? (theme === 'colorful' || theme === 'colorful-light' ? 'bg-white/20 text-white' : 'bg-white/20 text-white')
            : (theme === 'colorful' || theme === 'colorful-light' ? 'bg-mste-electric-cyan/20 text-mste-electric-cyan' : 'bg-stone-200 text-stone-600')
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};
