import { ArrowLeft, Calendar, Clock, FileText } from 'lucide-react';
import React from 'react';
import { ColorTheme, Program } from '../types';

interface ProgramWidgetViewProps {
  program: Program;
  theme: ColorTheme;
  onSelectEpisode: (episodeId: string) => void;
  onBack: () => void;
}

export const ProgramWidgetView: React.FC<ProgramWidgetViewProps> = ({ 
  program, 
  theme, 
  onSelectEpisode,
  onBack 
}) => {
  // エピソードのウィジェットサイズをパターン化
  const getWidgetSize = (index: number): string => {
    const pattern = index % 4;
    if (pattern === 0) return 'large';
    if (pattern === 1) return 'medium';
    return 'small';
  };

  const getSizeClasses = (size: string): string => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-2 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  // エピソードの全アイテム数を計算
  const getEpisodeItemsCount = (episode: any) => {
    return episode.sections.reduce((sum: number, section: any) => 
      sum + (section.items?.length || 0), 0
    );
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
        番組一覧に戻る
      </button>

      {/* 番組ヘッダー */}
      <div className={`mb-8 p-8 ${
        theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
      } border-2 ${
        theme === 'colorful'
          ? 'bg-gradient-to-br from-mste-electric-cyan/20 via-mste-royal-blue/20 to-mste-grape-purple/20 border-mste-electric-cyan/50'
          : theme === 'colorful-light'
          ? 'bg-gradient-to-br from-mste-electric-cyan/10 via-mste-grape-purple/10 to-mste-hot-magenta/10 border-mste-royal-blue/30'
          : theme === 'gold'
          ? 'bg-gold-elegant border-gold-300'
          : 'bg-white border-stone-300'
      } shadow-xl`}>
        <h1 className={`text-4xl font-bold mb-3 ${
          theme === 'colorful'
            ? 'text-white'
            : theme === 'colorful-light'
            ? 'bg-gradient-to-r from-mste-royal-blue via-mste-grape-purple to-mste-hot-magenta bg-clip-text text-transparent'
            : theme === 'gold'
            ? 'text-gold-900'
            : 'text-stone-900'
        }`}>
          {program.name}
        </h1>
        <p className={`text-lg font-semibold ${
          theme === 'colorful'
            ? 'text-mste-highlight'
            : theme === 'colorful-light'
            ? 'text-mste-grape-purple'
            : theme === 'gold'
            ? 'text-gold-700'
            : 'text-stone-700'
        }`}>
          {program.genre} • 全{program.episodes.length}回
        </p>
      </div>

      {/* エピソード一覧 */}
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
          放送回一覧
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
          カードをクリックして放送回の詳細を確認
        </p>
      </div>

      {/* エピソードウィジェットグリッド */}
      <div className="grid grid-cols-4 auto-rows-[180px] gap-4">
        {program.episodes.map((episode, index) => {
          const size = getWidgetSize(index);
          const sizeClasses = getSizeClasses(size);
          const itemsCount = getEpisodeItemsCount(episode);

          return (
            <div
              key={episode.id}
              className={`${sizeClasses} group cursor-pointer`}
              onClick={() => onSelectEpisode(episode.id)}
            >
              <div className={`w-full h-full ${
                theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
              } p-6 border-2 transition-all duration-300 ${
                theme === 'colorful'
                  ? 'bg-gradient-to-br from-mste-royal-blue/20 via-mste-grape-purple/20 to-mste-hot-magenta/20 border-mste-royal-blue/40 hover:border-mste-hot-magenta hover:shadow-mste-glow group-hover:scale-[1.02]'
                  : theme === 'colorful-light'
                  ? 'bg-gradient-to-br from-mste-royal-blue/10 via-mste-grape-purple/10 to-mste-hot-magenta/10 border-mste-grape-purple/30 hover:border-mste-hot-magenta hover:shadow-xl group-hover:scale-[1.02]'
                  : theme === 'gold'
                  ? 'bg-gold-elegant border-gold-300 hover:border-gold-500 hover:shadow-gold-luxury group-hover:scale-[1.02]'
                  : 'bg-gradient-to-br from-stone-50 to-warmGray-50 border-stone-300 hover:border-stone-500 hover:shadow-xl group-hover:scale-[1.02]'
              } overflow-hidden flex flex-col justify-between`}>
                
                {/* 上部: エピソード情報 */}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${
                      theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                    } p-2 ${
                      theme === 'colorful'
                        ? 'bg-mste-hot-magenta/20'
                        : theme === 'colorful-light'
                        ? 'bg-mste-hot-magenta/20'
                        : theme === 'gold'
                        ? 'bg-gold-200'
                        : 'bg-stone-200'
                    }`}>
                      <Calendar className={`h-5 w-5 ${
                        theme === 'colorful'
                          ? 'text-mste-hot-magenta'
                          : theme === 'colorful-light'
                          ? 'text-mste-hot-magenta'
                          : theme === 'gold'
                          ? 'text-gold-700'
                          : 'text-stone-700'
                      }`} />
                    </div>
                  </div>
                  
                  <h3 className={`font-bold mb-2 line-clamp-2 ${
                    size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'
                  } ${
                    theme === 'colorful'
                      ? 'text-white'
                      : theme === 'colorful-light'
                      ? 'text-mste-royal-blue'
                      : theme === 'gold'
                      ? 'text-gold-900'
                      : 'text-stone-900'
                  }`}>
                    {episode.title}
                  </h3>
                </div>

                {/* 下部: 日時と統計 */}
                <div className="space-y-2 mt-auto">
                  <div className={`flex items-center gap-2 text-xs font-medium ${
                    theme === 'colorful'
                      ? 'text-mste-highlight'
                      : theme === 'colorful-light'
                      ? 'text-mste-grape-purple'
                      : theme === 'gold'
                      ? 'text-gold-700'
                      : 'text-stone-700'
                  }`}>
                    <Calendar className="h-3 w-3" />
                    <span>{episode.date}</span>
                  </div>
                  
                  {size !== 'small' && (
                    <div className={`flex items-center gap-2 text-xs font-medium ${
                      theme === 'colorful'
                        ? 'text-mste-electric-cyan/80'
                        : theme === 'colorful-light'
                        ? 'text-mste-royal-blue/80'
                        : theme === 'gold'
                        ? 'text-gold-600'
                        : 'text-stone-600'
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{episode.time}</span>
                    </div>
                  )}
                  
                  <div className={`flex items-center gap-2 text-xs font-semibold ${
                    theme === 'colorful'
                      ? 'text-white'
                      : theme === 'colorful-light'
                      ? 'text-mste-royal-blue'
                      : theme === 'gold'
                      ? 'text-gold-800'
                      : 'text-stone-800'
                  }`}>
                    <FileText className="h-3 w-3" />
                    <span>{itemsCount}件の資料</span>
                  </div>
                </div>

                {/* ホバーエフェクト */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
                } ${
                  theme === 'colorful'
                    ? 'bg-gradient-to-br from-mste-hot-magenta/10 to-transparent'
                    : theme === 'colorful-light'
                    ? 'bg-gradient-to-br from-mste-grape-purple/10 to-transparent'
                    : theme === 'gold'
                    ? 'bg-gradient-to-br from-gold-200/30 to-transparent'
                    : 'bg-gradient-to-br from-stone-200/30 to-transparent'
                }`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

