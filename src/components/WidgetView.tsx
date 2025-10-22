import { Calendar, FileText, Grid3x3, Tv } from 'lucide-react';
import React from 'react';
import { ColorTheme, TVStation } from '../types';

interface WidgetViewProps {
  stations: TVStation[];
  theme: ColorTheme;
  onSelectProgram: (stationId: string, programId: string) => void;
  onSelectEpisode: (stationId: string, programId: string, episodeId: string) => void;
}

export const WidgetView: React.FC<WidgetViewProps> = ({ 
  stations, 
  theme, 
  onSelectProgram,
  onSelectEpisode
}) => {
  // 全番組を平坦化
  const allPrograms = stations.flatMap(station => 
    station.programs.map(program => ({
      ...program,
      stationId: station.id,
      stationName: station.name
    }))
  );

  // 番組のウィジェットサイズをランダムに決定（デモ用）
  const getWidgetSize = (index: number): string => {
    // より視覚的に面白くするため、パターンを作成
    const pattern = index % 6;
    if (pattern === 0 || pattern === 4) return 'large';
    if (pattern === 1 || pattern === 3) return 'medium';
    return 'small';
  };

  // サイズに応じたグリッドクラス
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

  // 最新エピソードの取得
  const getLatestEpisode = (episodes: any[]) => {
    if (!episodes || episodes.length === 0) return null;
    return episodes[episodes.length - 1];
  };

  // 全セクションのアイテム数をカウント
  const getTotalItemsCount = (episodes: any[]) => {
    return episodes.reduce((total, episode) => {
      const episodeItems = episode.sections.reduce((sum: number, section: any) => 
        sum + (section.items?.length || 0), 0
      );
      return total + episodeItems;
    }, 0);
  };

  return (
    <div className="p-8 min-h-screen">
      {/* ヘッダー */}
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${
          theme === 'colorful' 
            ? 'text-white' 
            : theme === 'colorful-light' 
            ? 'bg-gradient-to-r from-mste-royal-blue via-mste-grape-purple to-mste-hot-magenta bg-clip-text text-transparent'
            : theme === 'gold'
            ? 'text-gold-800'
            : 'text-stone-900'
        }`}>
          全番組一覧
        </h2>
        <p className={`text-sm font-medium ${
          theme === 'colorful' 
            ? 'text-mste-electric-cyan/90' 
            : theme === 'colorful-light'
            ? 'text-mste-grape-purple'
            : theme === 'gold'
            ? 'text-gold-600'
            : 'text-stone-600'
        }`}>
          カードをクリックして番組の詳細を確認
        </p>
      </div>

      {/* ウィジェットグリッド */}
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
        {allPrograms.map((program, index) => {
          const size = getWidgetSize(index);
          const sizeClasses = getSizeClasses(size);
          const latestEpisode = getLatestEpisode(program.episodes);
          const totalItems = getTotalItemsCount(program.episodes);

          return (
            <div
              key={`${program.stationId}-${program.id}`}
              className={`${sizeClasses} group cursor-pointer`}
              onClick={() => onSelectProgram(program.stationId, program.id)}
            >
              <div className={`w-full h-full ${
                theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
              } p-6 border-2 transition-all duration-300 ${
                theme === 'colorful'
                  ? 'bg-gradient-to-br from-mste-electric-cyan/20 via-mste-royal-blue/20 to-mste-grape-purple/20 border-mste-electric-cyan/40 hover:border-mste-electric-cyan hover:shadow-mste-glow group-hover:scale-[1.02]'
                  : theme === 'colorful-light'
                  ? 'bg-gradient-to-br from-mste-electric-cyan/10 via-mste-grape-purple/10 to-mste-hot-magenta/10 border-mste-royal-blue/30 hover:border-mste-hot-magenta hover:shadow-xl group-hover:scale-[1.02]'
                  : theme === 'gold'
                  ? 'bg-gold-elegant border-gold-300 hover:border-gold-500 hover:shadow-gold-luxury group-hover:scale-[1.02]'
                  : 'bg-white border-stone-300 hover:border-stone-500 hover:shadow-xl group-hover:scale-[1.02]'
              } overflow-hidden flex flex-col justify-between`}>
                
                {/* 上部: 番組情報 */}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${
                      theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                    } p-2 ${
                      theme === 'colorful'
                        ? 'bg-mste-electric-cyan/20'
                        : theme === 'colorful-light'
                        ? 'bg-mste-grape-purple/20'
                        : theme === 'gold'
                        ? 'bg-gold-200'
                        : 'bg-stone-200'
                    }`}>
                      <Tv className={`h-5 w-5 ${
                        theme === 'colorful'
                          ? 'text-mste-electric-cyan'
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
                        ? 'bg-mste-royal-blue/30 text-mste-highlight'
                        : theme === 'colorful-light'
                        ? 'bg-mste-hot-magenta/20 text-mste-hot-magenta'
                        : theme === 'gold'
                        ? 'bg-gold-200 text-gold-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {program.genre}
                    </span>
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
                    {program.name}
                  </h3>
                  
                  <p className={`text-xs font-medium mb-2 ${
                    theme === 'colorful'
                      ? 'text-mste-electric-cyan/80'
                      : theme === 'colorful-light'
                      ? 'text-mste-grape-purple/80'
                      : theme === 'gold'
                      ? 'text-gold-600'
                      : 'text-stone-600'
                  }`}>
                    {program.stationName}
                  </p>
                </div>

                {/* 下部: 統計情報 */}
                <div className="space-y-2 mt-auto">
                  {latestEpisode && size !== 'small' && (
                    <div className={`flex items-center gap-2 text-xs ${
                      theme === 'colorful'
                        ? 'text-mste-highlight'
                        : theme === 'colorful-light'
                        ? 'text-mste-grape-purple'
                        : theme === 'gold'
                        ? 'text-gold-700'
                        : 'text-stone-700'
                    }`}>
                      <Calendar className="h-3 w-3" />
                      <span className="font-medium">最新: {latestEpisode.date}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1 text-xs font-semibold ${
                      theme === 'colorful'
                        ? 'text-white'
                        : theme === 'colorful-light'
                        ? 'text-mste-royal-blue'
                        : theme === 'gold'
                        ? 'text-gold-800'
                        : 'text-stone-800'
                    }`}>
                      <Grid3x3 className="h-3 w-3" />
                      <span>{program.episodes.length}回</span>
                    </div>
                    
                    {size !== 'small' && (
                      <div className={`flex items-center gap-1 text-xs font-semibold ${
                        theme === 'colorful'
                          ? 'text-white'
                          : theme === 'colorful-light'
                          ? 'text-mste-royal-blue'
                          : theme === 'gold'
                          ? 'text-gold-800'
                          : 'text-stone-800'
                      }`}>
                        <FileText className="h-3 w-3" />
                        <span>{totalItems}件</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ホバーエフェクト */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
                } ${
                  theme === 'colorful'
                    ? 'bg-gradient-to-br from-mste-electric-cyan/10 to-transparent'
                    : theme === 'colorful-light'
                    ? 'bg-gradient-to-br from-mste-hot-magenta/10 to-transparent'
                    : theme === 'gold'
                    ? 'bg-gradient-to-br from-gold-200/30 to-transparent'
                    : 'bg-gradient-to-br from-stone-200/30 to-transparent'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {allPrograms.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className={`text-lg font-medium ${
            theme === 'colorful'
              ? 'text-mste-electric-cyan/90'
              : theme === 'colorful-light'
              ? 'text-mste-grape-purple'
              : theme === 'gold'
              ? 'text-gold-600'
              : 'text-stone-600'
          }`}>
            番組が登録されていません
          </p>
        </div>
      )}
    </div>
  );
};

