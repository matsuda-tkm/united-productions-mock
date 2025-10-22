import { Search } from 'lucide-react';
import React from 'react';
import { colorThemes } from '../themes';
import { ColorTheme, Section } from '../types';

interface SearchPanelProps extends Pick<Section, "placeholder" | "secondaryPlaceholder" | "ctaLabel"> {
  theme: ColorTheme;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  placeholder,
  secondaryPlaceholder,
  ctaLabel,
  theme,
}) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <div className={`flex flex-col gap-5 ${
      theme === 'gold' ? 'rounded-sm' : 'rounded-xl'
    } p-7 ${
      theme === 'gold' ? 'shadow-gold-sharp' : 'shadow-lg'
    } border-2 ${
      theme === 'colorful'
        ? 'bg-mste-bg-dark/70 border-mste-electric-cyan/40 shadow-mste-glow backdrop-blur-xl'
        : theme === 'colorful-light'
        ? 'bg-gradient-to-br from-mste-electric-cyan/10 via-mste-royal-blue/10 to-mste-hot-magenta/10 border-mste-royal-blue/20 shadow-lg backdrop-blur-xl'
        : theme === 'gold'
        ? 'bg-gold-elegant border-gold-300'
        : 'bg-white border-stone-300'
    }`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
              theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500'
            }`} aria-hidden="true" />
            <label htmlFor="search-input" className="sr-only">検索キーワード</label>
            <input
              id="search-input"
              type="text"
              placeholder={placeholder}
              className={`w-full ${
                theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
              } border-2 py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all ${
                theme === 'colorful'
                  ? 'border-mste-electric-cyan/60 bg-mste-bg-dark/90 text-white placeholder-mste-electric-cyan/80 focus:border-mste-electric-cyan focus:bg-mste-bg-dark focus:shadow-mste-glow'
                  : theme === 'colorful-light'
                  ? 'border-mste-royal-blue/40 bg-white text-mste-grape-purple placeholder-mste-royal-blue/50 focus:border-mste-grape-purple focus:bg-white focus:shadow-lg'
                  : theme === 'gold'
                  ? `border-gold-300 bg-gold-50 text-gold-900 placeholder-gold-500 focus:border-${currentTheme.accent} focus:bg-white focus:shadow-gold-sharp`
                  : `border-stone-300 bg-stone-50 text-stone-900 placeholder-stone-500 focus:border-${currentTheme.accent} focus:bg-white focus:shadow-lg`
              }`}
              aria-label={placeholder}
            />
          </div>
          {secondaryPlaceholder && (
            <>
              <label htmlFor="date-input" className="sr-only">日付選択</label>
              <input
                id="date-input"
                type="date"
                className={`min-w-[220px] ${
                  theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                } border-2 px-4 py-3.5 text-sm font-medium focus:outline-none transition-all ${
                  theme === 'colorful'
                    ? 'border-mste-electric-cyan/60 bg-mste-bg-dark/90 text-white focus:border-mste-electric-cyan focus:bg-mste-bg-dark focus:shadow-mste-glow'
                    : theme === 'colorful-light'
                    ? 'border-mste-royal-blue/40 bg-white text-mste-grape-purple focus:border-mste-grape-purple focus:bg-white focus:shadow-lg'
                    : theme === 'gold'
                    ? `border-gold-300 bg-gold-50 text-gold-900 focus:border-${currentTheme.accent} focus:bg-white focus:shadow-gold-sharp`
                    : `border-stone-300 bg-stone-50 text-stone-900 focus:border-${currentTheme.accent} focus:bg-white focus:shadow-lg`
                }`}
                aria-label={secondaryPlaceholder}
              />
            </>
          )}
        </div>
        <button 
          className={`${
            theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
          } px-7 py-3.5 text-sm font-bold uppercase text-white transition-all whitespace-nowrap ${
            theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-lg'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === 'colorful'
              ? 'bg-mste-gradient hover:bg-mste-aurora shadow-mste-glow focus:ring-mste-electric-cyan'
              : theme === 'colorful-light'
              ? 'bg-mste-gradient hover:opacity-90 shadow-lg focus:ring-mste-electric-cyan'
              : theme === 'gold'
              ? `${currentTheme.primaryBg} hover:${currentTheme.primaryBgHover} focus:ring-${currentTheme.accent}`
              : `bg-gradient-to-r ${currentTheme.primaryBg} hover:${currentTheme.primaryBgHover} focus:ring-${currentTheme.accent}`
          }`}
          aria-label={`${ctaLabel}を実行`}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
};
