import { Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { ColorTheme, TVStation } from '../types';

interface SidebarProps {
  stations: TVStation[];
  selectedStation: string | null;
  selectedProgram: string | null;
  selectedEpisode: string | null;
  onSelectEpisode: (stationId: string, programId: string, episodeId: string) => void;
  onSelectProgram: (stationId: string, programId: string) => void;
  theme: ColorTheme;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  stations, 
  selectedStation,
  selectedProgram, 
  selectedEpisode, 
  onSelectEpisode,
  onSelectProgram,
  theme
}) => {
  const [expandedStations, setExpandedStations] = useState<Set<string>>(new Set([stations[0]?.id]));
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set([stations[0]?.programs[0]?.id]));

  const toggleStation = (stationId: string) => {
    const newExpanded = new Set(expandedStations);
    if (newExpanded.has(stationId)) {
      newExpanded.delete(stationId);
    } else {
      newExpanded.add(stationId);
    }
    setExpandedStations(newExpanded);
  };

  const toggleProgram = (programId: string) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId);
    } else {
      newExpanded.add(programId);
    }
    setExpandedPrograms(newExpanded);
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 w-80 border-r overflow-y-auto ${
        theme === 'colorful'
          ? 'border-mste-electric-cyan/40 bg-mste-bg-dark/95 backdrop-blur-xl'
          : theme === 'colorful-light'
          ? 'border-mste-royal-blue/20 bg-gradient-to-b from-mste-electric-cyan/5 via-mste-royal-blue/5 to-mste-grape-purple/5 backdrop-blur-xl'
          : theme === 'gold'
          ? 'border-gold-300/60 bg-gold-50/95 backdrop-blur-xl'
          : 'border-stone-300/60 bg-white/95'
      }`}
      role="navigation"
      aria-label="番組一覧"
    >
      <div className="p-5">
        <div className="mb-5">
          <h2 className={`text-sm font-bold uppercase mb-4 px-3 ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue via-mste-grape-purple to-mste-hot-magenta bg-clip-text text-transparent' : theme === 'gold' ? 'text-gold-700' : 'text-stone-600'
          }`}>
            テレビ局・番組一覧
          </h2>
        </div>
        <div className="space-y-1">
          {stations.map((station) => {
            const isStationExpanded = expandedStations.has(station.id);
            return (
              <div key={station.id}>
                {/* テレビ局レベル */}
                <button
                  onClick={() => toggleStation(station.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${
                    theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                  } text-left transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedStation === station.id 
                      ? (theme === 'colorful' ? "bg-mste-electric-cyan/25 border border-mste-electric-cyan/60 shadow-sm focus:ring-mste-electric-cyan" : theme === 'colorful-light' ? "bg-mste-electric-cyan/10 border border-mste-electric-cyan/60 shadow-sm focus:ring-mste-electric-cyan" : theme === 'gold' ? "bg-gold-200 border border-gold-400 shadow-gold-sharp focus:ring-gold-500" : "bg-stone-200 border border-stone-300 focus:ring-stone-500") 
                      : (theme === 'colorful' ? "hover:bg-mste-electric-cyan/15 border border-transparent focus:ring-mste-electric-cyan" : theme === 'colorful-light' ? "hover:bg-mste-electric-cyan/10 border border-transparent focus:ring-mste-electric-cyan" : theme === 'gold' ? "hover:bg-gold-100 border border-transparent focus:ring-gold-500" : "hover:bg-stone-100 border border-transparent focus:ring-stone-500")
                  }`}
                  aria-expanded={isStationExpanded}
                  aria-controls={`station-${station.id}-programs`}
                  aria-label={`${station.name}の番組一覧を${isStationExpanded ? '閉じる' : '開く'}`}
                >
                  {isStationExpanded ? (
                    <ChevronDown className={`h-4 w-4 flex-shrink-0 ${
                      theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
                    }`} />
                  ) : (
                    <ChevronRight className={`h-4 w-4 flex-shrink-0 ${
                      theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
                    }`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-base font-bold truncate ${
                      theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent' : 'text-stone-900'
                    }`}>
                      {station.name}
                    </p>
                  </div>
                </button>
                
                {/* 番組リスト */}
                {isStationExpanded && (
                  <div id={`station-${station.id}-programs`} className="ml-4 mt-2 space-y-1">
                    {station.programs.map((program) => {
                      const isProgramExpanded = expandedPrograms.has(program.id);
                      return (
                        <div key={program.id}>
                          <button
                            onClick={() => {
                              toggleProgram(program.id);
                              onSelectProgram(station.id, program.id);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 ${
                              theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                            } text-left transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              selectedProgram === program.id 
                                ? (theme === 'colorful' ? "bg-mste-electric-cyan/20 border border-mste-electric-cyan/50 shadow-sm focus:ring-mste-electric-cyan" : theme === 'colorful-light' ? "bg-mste-electric-cyan/10 border border-mste-electric-cyan/50 shadow-sm focus:ring-mste-electric-cyan" : theme === 'gold' ? "bg-gold-150 border border-gold-400 shadow-gold-sharp focus:ring-gold-500" : "bg-stone-150 border border-stone-300 focus:ring-stone-500") 
                                : (theme === 'colorful' ? "hover:bg-mste-electric-cyan/12 border border-transparent focus:ring-mste-electric-cyan" : theme === 'colorful-light' ? "hover:bg-mste-electric-cyan/8 border border-transparent focus:ring-mste-electric-cyan" : theme === 'gold' ? "hover:bg-gold-100 border border-transparent focus:ring-gold-500" : "hover:bg-stone-100 border border-transparent focus:ring-stone-500")
                            }`}
                            aria-expanded={isProgramExpanded}
                            aria-controls={`program-${program.id}-episodes`}
                            aria-label={`${program.name}の放送回一覧を${isProgramExpanded ? '閉じる' : '開く'}`}
                          >
                            {isProgramExpanded ? (
                              <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 ${
                                theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
                              }`} />
                            ) : (
                              <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 ${
                                theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
                              }`} />
                            )}
                            {/* サムネイル画像 */}
                            <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src="/assets/thumbnail/image.png" 
                                alt={`${program.name}のサムネイル`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${
                                theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent' : 'text-stone-800'
                              }`}>
                                {program.name}
                              </p>
                              <p className={`text-xs font-medium truncate ${
                                theme === 'colorful' ? 'text-mste-electric-cyan/80' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500'
                              }`}>
                                {program.genre}
                              </p>
                            </div>
                          </button>
                          
                          {/* エピソードリスト */}
                          {isProgramExpanded && (
                            <div id={`program-${program.id}-episodes`} className="ml-6 mt-2 space-y-1">
                                {program.episodes.map((episode) => (
                                  <button
                                    key={episode.id}
                                    onClick={() => onSelectEpisode(station.id, program.id, episode.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 ${
                                      theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
                                    } text-left transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                      selectedEpisode === episode.id
                                        ? (theme === 'colorful' 
                                            ? "bg-mste-gradient text-white shadow-mste-glow border border-mste-electric-cyan/50 focus:ring-mste-electric-cyan" 
                                            : theme === 'colorful-light'
                                            ? "bg-mste-gradient text-white shadow-lg border border-mste-hot-magenta/50 focus:ring-mste-electric-cyan"
                                            : theme === 'gold'
                                            ? "bg-gold-luxury text-white shadow-gold-premium border border-gold-500 focus:ring-gold-500"
                                            : "bg-stone-800 text-white border border-stone-600 focus:ring-stone-500")
                                        : (theme === 'colorful' 
                                            ? "hover:bg-mste-electric-cyan/20 text-white hover:text-white border border-transparent hover:border-mste-electric-cyan/30 focus:ring-mste-electric-cyan" 
                                            : theme === 'colorful-light'
                                            ? "hover:bg-gradient-to-r hover:from-mste-electric-cyan/10 hover:to-mste-hot-magenta/10 text-mste-royal-blue hover:text-mste-grape-purple border border-transparent hover:border-mste-electric-cyan/30 focus:ring-mste-electric-cyan"
                                            : theme === 'gold'
                                            ? "hover:bg-gold-100 text-gold-700 border border-transparent hover:border-gold-300 focus:ring-gold-500"
                                            : "hover:bg-stone-100 text-stone-700 border border-transparent hover:border-stone-300 focus:ring-stone-500")
                                    }`}
                                    aria-label={`${episode.date} ${episode.time}の放送回を選択`}
                                  >
                                    <Calendar className={`h-4 w-4 flex-shrink-0 ${
                                      selectedEpisode === episode.id ? 'text-white' : (theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500')
                                    }`} aria-hidden="true" />
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-sm font-semibold truncate`}>
                                        {episode.date}
                                      </p>
                                      <p className={`text-xs font-medium truncate ${
                                        selectedEpisode === episode.id ? 'text-white/80' : (theme === 'colorful' ? 'text-mste-electric-cyan/80' : theme === 'colorful-light' ? 'text-mste-electric-cyan/70' : 'text-stone-500')
                                      }`}>
                                        {episode.time}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
