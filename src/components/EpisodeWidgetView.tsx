import { ArrowLeft, FileText, FolderOpen, ListChecks } from 'lucide-react';
import React from 'react';
import { ColorTheme, Episode } from '../types';

interface EpisodeWidgetViewProps {
  episode: Episode;
  theme: ColorTheme;
  onBack: () => void;
}

export const EpisodeWidgetView: React.FC<EpisodeWidgetViewProps> = ({ 
  episode, 
  theme, 
  onBack 
}) => {
  // セクションのアイコンを取得
  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'minutes':
        return ListChecks;
      case 'research':
        return FolderOpen;
      case 'materials':
        return FileText;
      default:
        return FileText;
    }
  };

  // セクションのウィジェットサイズをパターン化
  const getWidgetSize = (index: number): string => {
    const pattern = index % 3;
    if (pattern === 0) return 'large';
    return 'medium';
  };

  const getSizeClasses = (size: string): string => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      default:
        return 'col-span-2 row-span-1';
    }
  };

  return (
    <div className="p-8 min-h-screen">
      {/* 戻るボタン */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 px-4 py-2 mb-6 ${
          theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
        } text-sm font-medium transition-all ${
          theme === 'colorful'
            ? 'text-mste-electric-cyan hover:text-white hover:bg-mste-electric-cyan/20 border border-mste-electric-cyan/30'
            : theme === 'colorful-light'
            ? 'text-mste-grape-purple hover:text-white hover:bg-gradient-to-r hover:from-mste-royal-blue/20 hover:to-mste-grape-purple/20 border border-mste-royal-blue/30'
            : theme === 'gold'
            ? 'text-gold-700 hover:text-gold-800 hover:bg-gold-100 border border-gold-300'
            : 'text-stone-600 hover:text-stone-800 hover:bg-stone-100 border border-stone-300'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        番組詳細に戻る
      </button>

      {/* エピソードヘッダー */}
      <div className={`mb-8 p-8 ${
        theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
      } border-2 ${
        theme === 'colorful'
          ? 'bg-mste-gradient border-mste-electric-cyan/50 shadow-mste-glow'
          : theme === 'colorful-light'
          ? 'bg-mste-gradient border-mste-hot-magenta/50'
          : theme === 'gold'
          ? 'bg-gold-elegant border-gold-300'
          : 'bg-gradient-to-br from-stone-50 via-warmGray-50 to-stone-100 border-stone-300'
      } shadow-xl`}>
        <h1 className={`text-4xl font-bold mb-3 ${
          theme === 'colorful'
            ? 'text-white'
            : theme === 'colorful-light'
            ? 'text-white'
            : theme === 'gold'
            ? 'text-gold-900'
            : 'text-stone-900'
        }`}>
          {episode.title}
        </h1>
        <p className={`text-lg font-semibold ${
          theme === 'colorful'
            ? 'text-mste-highlight'
            : theme === 'colorful-light'
            ? 'text-white/90'
            : theme === 'gold'
            ? 'text-gold-700'
            : 'text-stone-700'
        }`}>
          放送日時: {episode.date} {episode.time}
        </p>
      </div>

      {/* セクション一覧 */}
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-4 ${
          theme === 'colorful'
            ? 'text-white'
            : theme === 'colorful-light'
            ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent'
            : theme === 'gold'
            ? 'text-gold-800'
            : 'text-stone-900'
        }`}>
          セクション一覧
        </h2>
        <p className={`text-sm font-medium mb-6 ${
          theme === 'colorful'
            ? 'text-mste-electric-cyan/90'
            : theme === 'colorful-light'
            ? 'text-mste-grape-purple'
            : theme === 'gold'
            ? 'text-gold-600'
            : 'text-stone-600'
        }`}>
          各セクションの資料を確認できます
        </p>
      </div>

      {/* セクションウィジェットグリッド */}
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
        {episode.sections.map((section, index) => {
          const size = getWidgetSize(index);
          const sizeClasses = getSizeClasses(size);
          const Icon = getSectionIcon(section.id);

          return (
            <div
              key={section.id}
              className={`${sizeClasses}`}
            >
              <div className={`w-full h-full ${
                theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
              } p-6 border-2 ${
                theme === 'colorful'
                  ? 'bg-gradient-to-br from-mste-grape-purple/20 via-mste-hot-magenta/20 to-mste-royal-blue/20 border-mste-grape-purple/40'
                  : theme === 'colorful-light'
                  ? 'bg-gradient-to-br from-mste-grape-purple/10 via-mste-hot-magenta/10 to-mste-electric-cyan/10 border-mste-grape-purple/30'
                  : theme === 'gold'
                  ? 'bg-gold-elegant border-gold-300'
                  : 'bg-gradient-to-br from-warmGray-50 to-stone-50 border-stone-300'
              } shadow-lg overflow-hidden flex flex-col`}>
                
                {/* ヘッダー */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`${
                    theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                  } p-2 ${
                    theme === 'colorful'
                      ? 'bg-mste-grape-purple/30'
                      : theme === 'colorful-light'
                      ? 'bg-mste-grape-purple/20'
                      : theme === 'gold'
                      ? 'bg-gold-200'
                      : 'bg-stone-200'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      theme === 'colorful'
                        ? 'text-mste-highlight'
                        : theme === 'colorful-light'
                        ? 'text-mste-grape-purple'
                        : theme === 'gold'
                        ? 'text-gold-700'
                        : 'text-stone-700'
                    }`} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 ${
                    theme === 'gold' ? 'rounded-sm' : 'rounded-md'
                  } ${
                    theme === 'colorful'
                      ? 'bg-mste-hot-magenta/30 text-mste-highlight'
                      : theme === 'colorful-light'
                      ? 'bg-mste-hot-magenta/20 text-mste-hot-magenta'
                      : theme === 'gold'
                      ? 'bg-gold-200 text-gold-800'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {section.items.length}件
                  </span>
                </div>
                
                <h3 className={`font-bold mb-2 ${
                  size === 'large' ? 'text-2xl' : 'text-xl'
                } ${
                  theme === 'colorful'
                    ? 'text-white'
                    : theme === 'colorful-light'
                    ? 'text-mste-royal-blue'
                    : theme === 'gold'
                    ? 'text-gold-900'
                    : 'text-stone-900'
                }`}>
                  {section.title}
                </h3>
                
                <p className={`text-sm font-medium mb-4 line-clamp-2 ${
                  theme === 'colorful'
                    ? 'text-mste-electric-cyan/80'
                    : theme === 'colorful-light'
                    ? 'text-mste-grape-purple/80'
                    : theme === 'gold'
                    ? 'text-gold-600'
                    : 'text-stone-600'
                }`}>
                  {section.description}
                </p>

                {/* アイテムリスト */}
                {size === 'large' && section.items.length > 0 && (
                  <div className="flex-1 overflow-y-auto space-y-2 mt-auto">
                    {section.items.slice(0, 3).map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`p-3 ${
                          theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                        } ${
                          theme === 'colorful'
                            ? 'bg-mste-bg-dark/40 border border-mste-electric-cyan/20'
                            : theme === 'colorful-light'
                            ? 'bg-white/50 border border-mste-royal-blue/10'
                            : theme === 'gold'
                            ? 'bg-gold-100/50 border border-gold-200'
                            : 'bg-white/50 border border-stone-200'
                        }`}
                      >
                        <p className={`text-xs font-semibold line-clamp-1 ${
                          theme === 'colorful'
                            ? 'text-white'
                            : theme === 'colorful-light'
                            ? 'text-mste-royal-blue'
                            : theme === 'gold'
                            ? 'text-gold-800'
                            : 'text-stone-800'
                        }`}>
                          {item.title}
                        </p>
                        <p className={`text-xs mt-1 line-clamp-1 ${
                          theme === 'colorful'
                            ? 'text-mste-electric-cyan/70'
                            : theme === 'colorful-light'
                            ? 'text-mste-grape-purple/70'
                            : theme === 'gold'
                            ? 'text-gold-600'
                            : 'text-stone-600'
                        }`}>
                          {item.detail}
                        </p>
                      </div>
                    ))}
                    {section.items.length > 3 && (
                      <p className={`text-xs text-center pt-2 font-medium ${
                        theme === 'colorful'
                          ? 'text-mste-electric-cyan/60'
                          : theme === 'colorful-light'
                          ? 'text-mste-grape-purple/60'
                          : theme === 'gold'
                          ? 'text-gold-500'
                          : 'text-stone-500'
                      }`}>
                        他 {section.items.length - 3}件
                      </p>
                    )}
                  </div>
                )}

                {section.items.length === 0 && (
                  <p className={`text-xs text-center mt-auto ${
                    theme === 'colorful'
                      ? 'text-mste-electric-cyan/60'
                      : theme === 'colorful-light'
                      ? 'text-mste-grape-purple/60'
                      : theme === 'gold'
                      ? 'text-gold-500'
                      : 'text-stone-500'
                  }`}>
                    アイテムがありません
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

