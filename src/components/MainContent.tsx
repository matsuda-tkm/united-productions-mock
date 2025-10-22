import { ChevronRight, Files } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ColorTheme, Episode } from '../types';
import { SectionPanel } from './SectionPanel';
import { TabTrigger } from './TabTrigger';

interface MainContentProps {
  episode: Episode | null;
  theme: ColorTheme;
  onBackToProgram?: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ episode, theme, onBackToProgram }) => {
  const [activeTab, setActiveTab] = useState<string>("minutes");

  const activeSection = useMemo(() => {
    if (!episode) return null;
    return episode.sections.find((section) => section.id === activeTab) ?? episode.sections[0];
  }, [episode, activeTab]);

  if (!episode) {
    return (
      <div className="flex items-center justify-center h-full" role="status" aria-live="polite">
        <div className="text-center">
          <Files className={`h-20 w-20 mx-auto mb-6 ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-400'
          }`} aria-hidden="true" />
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent' : 'text-stone-800'
          }`}>
            放送回を選択してください
          </h2>
          <p className={`text-lg font-medium ${
            theme === 'colorful' ? 'text-mste-electric-cyan/90' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
          }`}>
            左側のサイドバーから番組と放送回を選択すると、詳細情報が表示されます
          </p>
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            theme === 'colorful' 
              ? 'border-mste-electric-cyan/30 bg-mste-electric-cyan/10' 
              : theme === 'colorful-light'
              ? 'border-mste-royal-blue/20 bg-gradient-to-r from-mste-electric-cyan/5 to-mste-hot-magenta/5'
              : 'border-stone-200 bg-stone-50'
          }`}>
            <p className={`text-sm font-medium ${
              theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-700'
            }`}>
              💡 ヒント: テレビ局名をクリックして番組一覧を表示し、番組名をクリックして放送回を選択できます
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 戻るボタン */}
      {onBackToProgram && (
        <div className="flex items-center">
          <button
            onClick={onBackToProgram}
            className={`flex items-center gap-2 px-4 py-2 ${
              theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
            } text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'colorful'
                ? 'text-mste-electric-cyan hover:text-white hover:bg-mste-electric-cyan/20 border border-mste-electric-cyan/30 focus:ring-mste-electric-cyan'
                : theme === 'colorful-light'
                ? 'text-mste-grape-purple hover:text-white hover:bg-gradient-to-r hover:from-mste-royal-blue/20 hover:to-mste-grape-purple/20 border border-mste-royal-blue/30 focus:ring-mste-royal-blue'
                : theme === 'gold'
                ? 'text-gold-700 hover:text-gold-800 hover:bg-gold-100 border border-gold-300 focus:ring-gold-500'
                : 'text-stone-600 hover:text-stone-800 hover:bg-stone-100 border border-stone-300 focus:ring-stone-500'
            }`}
            aria-label="番組ページに戻る"
          >
            <ChevronRight className="h-4 w-4 rotate-180" aria-hidden="true" />
            番組に戻る
          </button>
        </div>
      )}
      
      <div 
        className={`${
          theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
        } p-10 border-2 ${
          theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-xl'
        } ${
          theme === 'colorful'
            ? 'bg-mste-gradient border-mste-electric-cyan/50 shadow-mste-glow'
            : theme === 'colorful-light'
            ? 'bg-mste-gradient border-mste-hot-magenta/50 shadow-lg'
            : theme === 'gold'
            ? 'bg-gold-elegant border-gold-300'
            : 'bg-gradient-to-br from-stone-50 via-warmGray-50 to-stone-100 border-stone-300'
        }`}
      >
        <h1 className={`text-4xl font-bold mb-3 ${
          theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'text-white' : 'text-stone-900'
        }`}>
          {episode.title}
        </h1>
        <p className={`text-lg font-semibold ${
          theme === 'colorful' ? 'text-mste-highlight' : theme === 'colorful-light' ? 'text-white/90' : 'text-stone-700'
        }`}>
          放送日時: {episode.date} {episode.time}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4" role="tablist" aria-label="セクション選択">
        {episode.sections.map((section) => (
          <TabTrigger
            key={section.id}
            label={section.title}
            isActive={activeTab === section.id}
            onClick={() => setActiveTab(section.id)}
            theme={theme}
            count={section.items.length}
          />
        ))}
      </div>

      {activeSection && <SectionPanel section={activeSection} theme={theme} />}
    </div>
  );
};
