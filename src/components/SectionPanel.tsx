import { Plus } from 'lucide-react';
import React from 'react';
import { colorThemes } from '../themes';
import { ColorTheme, Section } from '../types';
import { ItemCard } from './ItemCard';
import { SearchPanel } from './SearchPanel';

interface SectionPanelProps {
  section: Section;
  theme: ColorTheme;
}

export const SectionPanel: React.FC<SectionPanelProps> = ({ section, theme }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <section 
      className={`space-y-8 ${
        theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
      } border-2 p-10 ${
        theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-xl'
      } ${
        theme === 'colorful'
          ? 'border-mste-electric-cyan/40 bg-mste-bg-dark/90 backdrop-blur-xl shadow-mste-glow'
          : theme === 'colorful-light'
          ? 'border-mste-royal-blue/20 bg-gradient-to-br from-mste-electric-cyan/10 via-mste-royal-blue/10 to-mste-grape-purple/10 backdrop-blur-xl shadow-lg'
          : theme === 'gold'
          ? 'border-gold-300 bg-gold-elegant'
          : 'border-stone-300 bg-gradient-to-br from-stone-50 to-warmGray-50'
      }`}
      aria-labelledby={`section-${section.id}-title`}
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-3">
          <h2 
            id={`section-${section.id}-title`}
            className={`text-3xl font-bold ${
              theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue via-mste-grape-purple to-mste-hot-magenta bg-clip-text text-transparent' : 'text-stone-900'
            }`}
          >
            {section.title}
          </h2>
          <p className={`text-base font-medium ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-royal-blue' : 'text-stone-700'
          }`}>
            {section.description}
          </p>
        </div>
        <button 
          className={`flex items-center gap-3 ${
            theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
          } px-6 py-3 text-xs font-bold uppercase transition-all ${
            theme === 'gold' ? 'shadow-gold-sharp' : 'shadow-lg'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === 'colorful'
              ? 'border-2 border-mste-electric-cyan bg-mste-bg-dark text-mste-electric-cyan hover:bg-mste-electric-cyan hover:text-mste-bg-dark shadow-mste-glow focus:ring-mste-electric-cyan'
              : theme === 'colorful-light'
              ? 'border-2 border-transparent bg-mste-gradient text-white hover:opacity-90 shadow-lg focus:ring-mste-electric-cyan'
              : theme === 'gold'
              ? `border-2 border-${currentTheme.accentBorder} bg-gold-elegant text-${currentTheme.accentText} hover:border-${currentTheme.accentHover} hover:${currentTheme.primaryBg} hover:text-white focus:ring-${currentTheme.accent}`
              : `border-2 border-${currentTheme.accentBorder} bg-white text-${currentTheme.accentText} hover:border-${currentTheme.accentHover} hover:bg-${currentTheme.accentBg} hover:text-${currentTheme.accentHover} focus:ring-${currentTheme.accent}`
          }`}
          aria-label={`${section.addLabel}を追加`}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          {section.addLabel}
        </button>
      </div>
      <SearchPanel
        placeholder={section.placeholder}
        secondaryPlaceholder={section.secondaryPlaceholder}
        ctaLabel={section.ctaLabel}
        theme={theme}
      />
      <div className="grid gap-6" role="region" aria-label={`${section.title}のアイテム一覧`}>
        {section.items.length > 0 ? (
          section.items.map((item) => (
            <ItemCard key={item.title} {...item} theme={theme} />
          ))
        ) : (
          <div 
            className={`text-center py-16 ${
              theme === 'colorful' ? 'text-mste-electric-cyan/90' : theme === 'colorful-light' ? 'text-mste-electric-cyan/70' : 'text-stone-500'
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-lg font-medium">データがまだ登録されていません</p>
            <p className="text-sm mt-2 opacity-75">
              「{section.addLabel}」ボタンから新しいアイテムを追加できます
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
