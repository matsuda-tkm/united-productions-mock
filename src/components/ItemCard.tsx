import { ExternalLink } from 'lucide-react';
import React from 'react';
import { colorThemes } from '../themes';
import { ColorTheme, Section } from '../types';

type SectionItem = Section["items"][number];

interface ItemCardProps extends SectionItem {
  theme: ColorTheme;
}

export const ItemCard: React.FC<ItemCardProps> = ({ title, detail, actionLabel, links, theme }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <article 
      className={`group ${
        theme === 'gold' ? 'rounded-sm' : 'rounded-xl'
      } border-2 p-7 ${
        theme === 'gold' ? 'shadow-gold-sharp' : 'shadow-lg'
      } transition-all ${
        theme === 'gold' ? 'hover:shadow-gold-luxury' : 'hover:shadow-xl'
      } focus-within:ring-2 focus-within:ring-offset-2 ${
        theme === 'colorful'
          ? 'border-mste-electric-cyan/40 bg-mste-bg-dark/90 backdrop-blur-xl shadow-mste-glow focus-within:ring-mste-electric-cyan'
          : theme === 'colorful-light'
          ? 'border-mste-royal-blue/20 bg-gradient-to-br from-mste-electric-cyan/5 via-mste-royal-blue/5 to-mste-hot-magenta/5 backdrop-blur-xl shadow-lg focus-within:ring-mste-royal-blue'
          : theme === 'gold'
          ? 'border-gold-300 bg-gold-elegant focus-within:ring-gold-500'
          : 'border-stone-300 bg-white focus-within:ring-stone-500'
      }`}
      tabIndex={0}
      role="article"
      aria-label={`${title} - ${detail}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex-1">
          <h3 className={`text-xl font-bold transition-colors ${
            theme === 'colorful' 
              ? 'text-white group-hover:text-mste-electric-cyan' 
              : theme === 'colorful-light'
              ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent group-hover:from-mste-electric-cyan group-hover:to-mste-hot-magenta'
              : `text-stone-900 group-hover:text-${currentTheme.accentText}`
          }`}>
            {title}
          </h3>
          <p className={`mt-3 text-sm font-semibold ${
            theme === 'colorful' ? 'text-mste-electric-cyan/90' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500'
          }`}>
            {detail}
          </p>
          {links && (
            <ul className="mt-5 space-y-3 text-sm" role="list">
              {links.map((link, index) => (
                <li key={link.label} role="listitem">
                  <a
                    href={link.href}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded ${
                      theme === 'colorful'
                        ? 'text-mste-electric-cyan/90 hover:text-mste-electric-cyan focus:ring-mste-electric-cyan'
                        : theme === 'colorful-light'
                        ? 'text-mste-royal-blue hover:text-mste-grape-purple focus:ring-mste-royal-blue'
                        : `text-stone-700 hover:text-${currentTheme.accentText} focus:ring-${currentTheme.accent}`
                    }`}
                    aria-label={`${link.label}を新しいタブで開く`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button 
          className={`${
            theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
          } px-6 py-3 text-xs font-bold uppercase transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === 'colorful'
              ? 'border-2 border-mste-electric-cyan bg-mste-bg-dark text-mste-electric-cyan hover:bg-mste-electric-cyan hover:text-mste-bg-dark shadow-mste-glow focus:ring-mste-electric-cyan'
              : theme === 'colorful-light'
              ? 'border-2 border-transparent bg-mste-gradient text-white hover:opacity-90 shadow-lg focus:ring-mste-electric-cyan'
              : theme === 'gold'
              ? `border-2 border-${currentTheme.accentBorder} bg-gold-elegant text-${currentTheme.accentText} hover:border-${currentTheme.accentHover} hover:${currentTheme.primaryBg} hover:text-white focus:ring-${currentTheme.accent} shadow-gold-sharp`
              : `border-2 border-${currentTheme.accentBorder} bg-white text-${currentTheme.accentText} hover:border-${currentTheme.accentHover} hover:bg-${currentTheme.accentBg} hover:text-${currentTheme.accentHover} focus:ring-${currentTheme.accent}`
          }`}
          aria-label={`${title}の${actionLabel}`}
        >
          {actionLabel}
        </button>
      </div>
    </article>
  );
};
