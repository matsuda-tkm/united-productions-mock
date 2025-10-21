import { Calendar, ChevronDown, ChevronRight, ExternalLink, Files, Palette, Plus, Search } from "lucide-react";
import React, { useMemo, useState } from "react";

// Types
type Section = {
  id: string;
  title: string;
  description: string;
  addLabel: string;
  placeholder: string;
  secondaryPlaceholder?: string;
  ctaLabel: string;
  items: Array<{
    title: string;
    detail: string;
    actionLabel: string;
    links?: Array<{ label: string; href: string }>;
  }>;
};

type ColorTheme = 'green' | 'gold' | 'colorful';

const colorThemes = {
  green: {
    name: 'グリーン',
    primary: 'emerald',
    primaryHover: 'emerald-700',
    primaryBg: 'from-emerald-600 to-emerald-700',
    primaryBgHover: 'from-emerald-700 to-emerald-800',
    accent: 'emerald-600',
    accentHover: 'emerald-700',
    accentBg: 'emerald-50',
    accentBorder: 'emerald-600',
    accentText: 'emerald-700',
  },
  gold: {
    name: 'ゴールド',
    primary: 'gold',
    primaryHover: 'gold-700',
    primaryBg: 'bg-gold-luxury',
    primaryBgHover: 'bg-gold-premium',
    accent: 'gold-500',
    accentHover: 'gold-600',
    accentBg: 'gold-50',
    accentBorder: 'gold-500',
    accentText: 'gold-600',
  },
  colorful: {
    name: 'カラフル',
    primary: 'mste-electric-cyan',
    primaryHover: 'mste-royal-blue',
    primaryBg: 'bg-mste-gradient',
    primaryBgHover: 'bg-mste-aurora',
    accent: 'mste-electric-cyan',
    accentHover: 'mste-hot-magenta',
    accentBg: 'mste-highlight',
    accentBorder: 'mste-electric-cyan',
    accentText: 'mste-electric-cyan',
  },
};

type Episode = {
  id: string;
  title: string;
  date: string;
  time: string;
  sections: Section[];
};

type Program = {
  id: string;
  name: string;
  genre: string;
  episodes: Episode[];
};

type TVStation = {
  id: string;
  name: string;
  programs: Program[];
};

// Mock Data
const mockStations: TVStation[] = [
  {
    id: "station-1",
    name: "フジテレビ",
    programs: [
      {
        id: "prog-1",
        name: "バラエティ番組A",
        genre: "レギュラー",
        episodes: [
          {
            id: "ep-0909",
            title: "第1回",
            date: "2025-09-09",
            time: "21:00-21:54",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [
                  {
                    title: "企画会議 9/8",
                    detail: "2025-09-08 / 参加者: P, D, AD",
                    actionLabel: "開く",
                  },
                  {
                    title: "演出レビュー 9/5",
                    detail: "2025-09-05 / 参加者: D, AD",
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [
                  {
                    title: "人気商店街の来客数データ (背景・市場動向・示唆)",
                    detail: "9/7/2025",
                    links: [
                      { label: "2025年Q4 商店街マーケットレポート", href: "#" },
                      { label: "商店街振興組合 交通量センター統計", href: "#" },
                    ],
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [
                  {
                    title: "構成案V1 (街歩き×発酵スイーツ・充実版)",
                    detail: "企画担当: 若野タケル",
                    actionLabel: "開く",
                  },
                ],
              },
            ],
          },
          {
            id: "ep-0916",
            title: "第2回",
            date: "2025-09-16",
            time: "21:00-21:54",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [
                  {
                    title: "企画会議 9/15",
                    detail: "2025-09-15 / 参加者: P, D, AD",
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "station-2",
    name: "NHK総合",
    programs: [
      {
        id: "prog-2",
        name: "ドキュメンタリーNEXT",
        genre: "特番",
        episodes: [
          {
            id: "ep-1005",
            title: "第1回",
            date: "2025-10-05",
            time: "19:30-20:45",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [
                  {
                    title: "企画会議 10/3",
                    detail: "2025-10-03 / 参加者: P, D",
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [
                  {
                    title: "AIと人間の協働事例調査",
                    detail: "10/2/2025",
                    links: [
                      { label: "世界のものづくり現場レポート", href: "#" },
                    ],
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [
                  {
                    title: "ドキュメンタリー構成案",
                    detail: "企画担当: 山田太郎",
                    actionLabel: "開く",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "station-3",
    name: "日本テレビ",
    programs: [
      {
        id: "prog-3",
        name: "朝の情報マルシェ",
        genre: "レギュラー",
        episodes: [
          {
            id: "ep-1010",
            title: "第1回",
            date: "2025-10-10",
            time: "07:00-08:00",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Components
const Header = ({ theme, onThemeChange }: { theme: ColorTheme; onThemeChange: (theme: ColorTheme) => void }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
        theme === 'colorful' 
          ? 'border-mste-electric-cyan/40 bg-mste-bg-dark/95 shadow-mste-glow' 
          : theme === 'gold'
          ? 'border-gold-300/60 bg-gold-50/95'
          : 'border-stone-300/60 bg-white/95'
      }`}
    >
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div 
            className={`relative flex h-12 w-12 items-center justify-center ${
              theme === 'gold' ? 'rounded-sm' : 'rounded-2xl'
            } ${
              theme === 'gold' 
                ? 'bg-gold-luxury border-2 border-gold-600' 
                : `bg-gradient-to-br ${currentTheme.primaryBg}`
            } text-white ${
              theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-xl'
            } overflow-hidden`}
          >
            {/* TV制作をイメージしたアイコンデザイン */}
            <div className="relative">
              {/* テレビ画面 */}
              <div className={`w-6 h-4 ${
                theme === 'gold' ? 'bg-white/30' : 'bg-white/20'
              } rounded-sm border ${
                theme === 'gold' ? 'border-white/50' : 'border-white/30'
              }`}>
                <div className={`w-full h-full bg-gradient-to-br ${
                  theme === 'gold' ? 'from-white/60 to-white/30' : 'from-white/40 to-white/10'
                } rounded-sm flex items-center justify-center`}>
                  <div className={`w-1 h-1 ${
                    theme === 'gold' ? 'bg-white' : 'bg-white'
                  } rounded-full`}></div>
                </div>
              </div>
              {/* アンテナ */}
              <div className={`absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 ${
                theme === 'gold' ? 'border-white/80' : 'border-white/60'
              } rounded-tl-lg`}></div>
              <div className={`absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 ${
                theme === 'gold' ? 'border-white/80' : 'border-white/60'
              } rounded-tr-lg`}></div>
            </div>
            {/* 光るエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
          <div>
            <h1 className={`text-lg font-bold ${theme === 'colorful' ? 'text-white' : 'text-stone-900'}`}>
              AD Copilot AI
            </h1>
            <p className={`text-xs font-medium ${theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'}`}>
              番組管理システム
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-3" role="navigation" aria-label="メインナビゲーション">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
            <Palette className={`h-4 w-4 ${theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-500'}`} aria-hidden="true" />
            <label htmlFor="theme-select" className="sr-only">テーマ選択</label>
            <select 
              id="theme-select"
              value={theme} 
              onChange={(e) => onThemeChange(e.target.value as ColorTheme)}
              className={`text-sm font-medium bg-transparent border-none outline-none transition-colors cursor-pointer focus:ring-2 focus:ring-offset-2 ${
                theme === 'colorful' 
                  ? 'text-white hover:text-mste-electric-cyan focus:ring-mste-electric-cyan' 
                  : 'text-stone-600 hover:text-stone-800 focus:ring-stone-500'
              }`}
              aria-label="カラーテーマを選択"
            >
              <option value="green">グリーン</option>
              <option value="gold">ゴールド</option>
              <option value="colorful">カラフル</option>
            </select>
          </div>
          <button 
            className={`${
              theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
            } px-5 py-2 text-sm font-semibold uppercase transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'colorful'
                ? 'border border-mste-electric-cyan bg-mste-bg-dark text-mste-electric-cyan hover:bg-mste-electric-cyan hover:text-mste-bg-dark shadow-mste-glow focus:ring-mste-electric-cyan'
                : theme === 'gold'
                ? 'border border-gold-500 bg-gold-elegant text-gold-700 hover:border-gold-600 hover:bg-gold-luxury hover:text-white shadow-gold-sharp focus:ring-gold-500'
                : 'border border-stone-400 bg-white hover:border-stone-600 hover:bg-stone-50 text-stone-700 focus:ring-stone-500'
            }`}
            aria-label="ログイン"
          >
            ログイン
          </button>
        </nav>
      </div>
    </header>
  );
};

const Sidebar = ({ 
  stations, 
  selectedStation,
  selectedProgram, 
  selectedEpisode, 
  onSelectEpisode,
  onSelectProgram,
  theme
}: { 
  stations: TVStation[];
  selectedStation: string | null;
  selectedProgram: string | null;
  selectedEpisode: string | null;
  onSelectEpisode: (stationId: string, programId: string, episodeId: string) => void;
  onSelectProgram: (stationId: string, programId: string) => void;
  theme: ColorTheme;
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
            theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'gold' ? 'text-gold-700' : 'text-stone-600'
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
                      ? (theme === 'colorful' ? "bg-mste-electric-cyan/25 border border-mste-electric-cyan/60 shadow-sm focus:ring-mste-electric-cyan" : theme === 'gold' ? "bg-gold-200 border border-gold-400 shadow-gold-sharp focus:ring-gold-500" : "bg-stone-200 border border-stone-300 focus:ring-stone-500") 
                      : (theme === 'colorful' ? "hover:bg-mste-electric-cyan/15 border border-transparent focus:ring-mste-electric-cyan" : theme === 'gold' ? "hover:bg-gold-100 border border-transparent focus:ring-gold-500" : "hover:bg-stone-100 border border-transparent focus:ring-stone-500")
                  }`}
                  aria-expanded={isStationExpanded}
                  aria-controls={`station-${station.id}-programs`}
                  aria-label={`${station.name}の番組一覧を${isStationExpanded ? '閉じる' : '開く'}`}
                >
                  {isStationExpanded ? (
                    <ChevronDown className={`h-4 w-4 flex-shrink-0 ${
                      theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'
                    }`} />
                  ) : (
                    <ChevronRight className={`h-4 w-4 flex-shrink-0 ${
                      theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'
                    }`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-base font-bold truncate ${
                      theme === 'colorful' ? 'text-white' : 'text-stone-900'
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
                                  ? (theme === 'colorful' ? "bg-mste-electric-cyan/20 border border-mste-electric-cyan/50 shadow-sm focus:ring-mste-electric-cyan" : theme === 'gold' ? "bg-gold-150 border border-gold-400 shadow-gold-sharp focus:ring-gold-500" : "bg-stone-150 border border-stone-300 focus:ring-stone-500") 
                                  : (theme === 'colorful' ? "hover:bg-mste-electric-cyan/12 border border-transparent focus:ring-mste-electric-cyan" : theme === 'gold' ? "hover:bg-gold-100 border border-transparent focus:ring-gold-500" : "hover:bg-stone-100 border border-transparent focus:ring-stone-500")
                              }`}
                              aria-expanded={isProgramExpanded}
                              aria-controls={`program-${program.id}-episodes`}
                              aria-label={`${program.name}の放送回一覧を${isProgramExpanded ? '閉じる' : '開く'}`}
                            >
                              {isProgramExpanded ? (
                                <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 ${
                                  theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'
                                }`} />
                              ) : (
                                <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 ${
                                  theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'
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
                                  theme === 'colorful' ? 'text-white' : 'text-stone-800'
                                }`}>
                                  {program.name}
                                </p>
                                <p className={`text-xs font-medium truncate ${
                                  theme === 'colorful' ? 'text-mste-electric-cyan/80' : 'text-stone-500'
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
                                              : theme === 'gold'
                                              ? "bg-gold-luxury text-white shadow-gold-premium border border-gold-500 focus:ring-gold-500"
                                              : "bg-stone-800 text-white border border-stone-600 focus:ring-stone-500")
                                          : (theme === 'colorful' 
                                              ? "hover:bg-mste-electric-cyan/20 text-white hover:text-white border border-transparent hover:border-mste-electric-cyan/30 focus:ring-mste-electric-cyan" 
                                              : theme === 'gold'
                                              ? "hover:bg-gold-100 text-gold-700 border border-transparent hover:border-gold-300 focus:ring-gold-500"
                                              : "hover:bg-stone-100 text-stone-700 border border-transparent hover:border-stone-300 focus:ring-stone-500")
                                      }`}
                                      aria-label={`${episode.date} ${episode.time}の放送回を選択`}
                                    >
                                      <Calendar className={`h-4 w-4 flex-shrink-0 ${
                                        selectedEpisode === episode.id ? 'text-white' : (theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-500')
                                      }`} aria-hidden="true" />
                                      <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold truncate`}>
                                          {episode.date}
                                        </p>
                                        <p className={`text-xs font-medium truncate ${
                                          selectedEpisode === episode.id ? 'text-white/80' : (theme === 'colorful' ? 'text-mste-electric-cyan/80' : 'text-stone-500')
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

const TabTrigger = ({
  isActive,
  label,
  onClick,
  theme,
  count,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
  theme: ColorTheme;
  count?: number;
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
              : theme === 'gold'
              ? `border-${currentTheme.accent} ${currentTheme.primaryBg} text-white ${theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-lg'} focus:ring-${currentTheme.accent}`
              : `border-${currentTheme.accent} bg-gradient-to-r ${currentTheme.primaryBg} text-white shadow-lg focus:ring-${currentTheme.accent}`)
          : (theme === 'colorful'
              ? "border-mste-electric-cyan/30 bg-mste-bg-dark/60 text-mste-electric-cyan hover:border-mste-electric-cyan hover:bg-mste-electric-cyan/20 hover:text-white focus:ring-mste-electric-cyan"
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
            ? (theme === 'colorful' ? 'bg-white/20 text-white' : 'bg-white/20 text-white')
            : (theme === 'colorful' ? 'bg-mste-electric-cyan/20 text-mste-electric-cyan' : 'bg-stone-200 text-stone-600')
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

const SearchPanel = ({
  placeholder,
  secondaryPlaceholder,
  ctaLabel,
  theme,
}: Pick<Section, "placeholder" | "secondaryPlaceholder" | "ctaLabel"> & { theme: ColorTheme }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <div className={`flex flex-col gap-5 ${
      theme === 'gold' ? 'rounded-sm' : 'rounded-xl'
    } p-7 ${
      theme === 'gold' ? 'shadow-gold-sharp' : 'shadow-lg'
    } border-2 ${
      theme === 'colorful'
        ? 'bg-mste-bg-dark/70 border-mste-electric-cyan/40 shadow-mste-glow backdrop-blur-xl'
        : theme === 'gold'
        ? 'bg-gold-elegant border-gold-300'
        : 'bg-white border-stone-300'
    }`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
              theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-500'
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

const ItemCard = ({ title, detail, actionLabel, links, theme }: Section["items"][number] & { theme: ColorTheme }) => {
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
              : `text-stone-900 group-hover:text-${currentTheme.accentText}`
          }`}>
            {title}
          </h3>
          <p className={`mt-3 text-sm font-semibold ${
            theme === 'colorful' ? 'text-mste-electric-cyan/90' : 'text-stone-500'
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

const SectionPanel = ({ section, theme }: { section: Section; theme: ColorTheme }) => {
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
              theme === 'colorful' ? 'text-white' : 'text-stone-900'
            }`}
          >
            {section.title}
          </h2>
          <p className={`text-base font-medium ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-700'
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
              theme === 'colorful' ? 'text-mste-electric-cyan/90' : 'text-stone-500'
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

const ProgramPage = ({ program, theme, onSelectEpisode }: { 
  program: Program; 
  theme: ColorTheme; 
  onSelectEpisode: (episodeId: string) => void;
}) => {
  return (
    <div className="space-y-8">
      {/* 番組ヘッダー */}
        <div
        className={`relative ${
          theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
        } overflow-hidden border ${
          theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-lg'
        } ${
          theme === 'colorful'
            ? 'border-mste-electric-cyan/30 shadow-mste-glow'
            : theme === 'gold'
            ? 'border-gold-300'
            : 'border-stone-200'
        }`}
      >
        {/* 背景画像とオーバーレイ */}
        <div 
          className="relative h-64 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/thumbnail/image.png')`
          }}
        >
          <div className={`absolute inset-0 ${
            theme === 'colorful' ? 'bg-mste-bg-dark/80' : 'bg-black/60'
          }`} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === 'colorful' ? 'text-white' : 'text-white'
              }`}>
                {program.name}
              </h1>
              <p className={`text-lg ${
                theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-gray-200'
              }`}>
                {program.genre}
              </p>
            </div>
          </div>
        </div>
        </div>

      {/* 放送回一覧 */}
      <section 
        className={`space-y-6 ${
          theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
        } border p-9 ${
          theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-xl'
        } ${
          theme === 'colorful'
            ? 'border-mste-electric-cyan/30 bg-mste-bg-dark/80 backdrop-blur-xl shadow-mste-glow'
            : theme === 'gold'
            ? 'border-gold-300 bg-gold-elegant'
            : 'border-stone-200 bg-gradient-to-br from-stone-50 to-warmGray-50'
        }`}
      >
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${
            theme === 'colorful' ? 'text-white' : 'text-stone-900'
          }`}>
            放送回一覧
          </h2>
          <p className={`text-sm ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'
          }`}>
            この番組の放送回を選択してください
          </p>
        </div>
        
        <div className="grid gap-4">
          {program.episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() => onSelectEpisode(episode.id)}
              className={`w-full text-left p-6 ${
                theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
              } border transition-all ${
                theme === 'colorful'
                  ? 'border-mste-electric-cyan/30 bg-mste-bg-dark/60 hover:bg-mste-electric-cyan/20 hover:border-mste-electric-cyan/50'
                  : theme === 'gold'
                  ? 'border-gold-300 bg-gold-elegant hover:bg-gold-100 hover:border-gold-400 shadow-gold-sharp'
                  : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className={`h-5 w-5 ${
                  theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-500'
                }`} />
                <div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'colorful' ? 'text-white' : 'text-stone-900'
                  }`}>
                    {episode.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'colorful' ? 'text-mste-electric-cyan/80' : 'text-stone-500'
                  }`}>
                    {episode.date} {episode.time}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 議事録一覧 */}
      <section 
        className={`space-y-6 ${
          theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
        } border p-9 ${
          theme === 'gold' ? 'shadow-gold-luxury' : 'shadow-xl'
        } ${
          theme === 'colorful'
            ? 'border-mste-electric-cyan/30 bg-mste-bg-dark/80 backdrop-blur-xl shadow-mste-glow'
            : theme === 'gold'
            ? 'border-gold-300 bg-gold-elegant'
            : 'border-stone-200 bg-gradient-to-br from-stone-50 to-warmGray-50'
        }`}
      >
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${
            theme === 'colorful' ? 'text-white' : 'text-stone-900'
          }`}>
            議事録一覧
          </h2>
          <p className={`text-sm ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-600'
          }`}>
            この番組に関連する議事録を表示します
          </p>
        </div>
        
        <div className="grid gap-4">
          {program.episodes.flatMap(episode => 
            episode.sections
              .find(section => section.id === 'minutes')
              ?.items.map(item => ({ ...item, episodeTitle: episode.title })) || []
          ).map((item, index) => (
            <article 
              key={index}
              className={`group ${
                theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
              } border p-6 ${
                theme === 'gold' ? 'shadow-gold-sharp' : 'shadow-md'
              } transition-all ${
                theme === 'colorful'
                  ? 'border-mste-electric-cyan/30 bg-mste-bg-dark/80 backdrop-blur-xl shadow-mste-glow'
                  : theme === 'gold'
                  ? 'border-gold-300 bg-gold-elegant'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold transition-colors ${
                    theme === 'colorful' 
                      ? 'text-white group-hover:text-mste-electric-cyan' 
                      : 'text-stone-900 group-hover:text-emerald-700'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-xs font-medium ${
                    theme === 'colorful' ? 'text-mste-electric-cyan/80' : 'text-stone-400'
                  }`}>
                    {item.detail}
                  </p>
                  <p className={`mt-1 text-xs ${
                    theme === 'colorful' ? 'text-mste-electric-cyan/60' : 'text-stone-500'
                  }`}>
                    放送回: {item.episodeTitle}
                  </p>
                </div>
                <button 
                  className={`${
                    theme === 'gold' ? 'rounded-sm' : 'rounded-md'
                  } px-5 py-2 text-[11px] font-bold uppercase transition-all ${
                    theme === 'colorful'
                      ? 'border border-mste-electric-cyan bg-mste-bg-dark text-mste-electric-cyan hover:bg-mste-electric-cyan hover:text-mste-bg-dark shadow-mste-glow'
                      : theme === 'gold'
                      ? 'border border-gold-500 bg-gold-elegant text-gold-700 hover:border-gold-600 hover:bg-gold-luxury hover:text-white shadow-gold-sharp'
                      : 'border border-emerald-600 bg-white text-emerald-700 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {item.actionLabel}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const MainContent = ({ episode, theme, onBackToProgram }: { episode: Episode | null; theme: ColorTheme; onBackToProgram?: () => void }) => {
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
            theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-400'
          }`} aria-hidden="true" />
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'colorful' ? 'text-white' : 'text-stone-800'
          }`}>
            放送回を選択してください
          </h2>
          <p className={`text-lg font-medium ${
            theme === 'colorful' ? 'text-mste-electric-cyan/90' : 'text-stone-600'
          }`}>
            左側のサイドバーから番組と放送回を選択すると、詳細情報が表示されます
          </p>
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            theme === 'colorful' 
              ? 'border-mste-electric-cyan/30 bg-mste-electric-cyan/10' 
              : 'border-stone-200 bg-stone-50'
          }`}>
            <p className={`text-sm font-medium ${
              theme === 'colorful' ? 'text-mste-electric-cyan' : 'text-stone-700'
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
            : theme === 'gold'
            ? 'bg-gold-elegant border-gold-300'
            : 'bg-gradient-to-br from-stone-50 via-warmGray-50 to-stone-100 border-stone-300'
        }`}
      >
        <h1 className={`text-4xl font-bold mb-3 ${
          theme === 'colorful' ? 'text-white' : 'text-stone-900'
        }`}>
          {episode.title}
        </h1>
        <p className={`text-lg font-semibold ${
          theme === 'colorful' ? 'text-mste-highlight' : 'text-stone-700'
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

function App() {
  const [selectedStation, setSelectedStation] = useState<string | null>(mockStations[0]?.id || null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(mockStations[0]?.programs[0]?.id || null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(
    mockStations[0]?.programs[0]?.episodes[0]?.id || null
  );
  const [showProgramPage, setShowProgramPage] = useState<boolean>(false);
  const [theme, setTheme] = useState<ColorTheme>('green');

  const handleSelectEpisode = (stationId: string, programId: string, episodeId: string) => {
    setSelectedStation(stationId);
    setSelectedProgram(programId);
    setSelectedEpisode(episodeId);
    setShowProgramPage(false);
  };

  const handleSelectProgram = (stationId: string, programId: string) => {
    setSelectedStation(stationId);
    setSelectedProgram(programId);
    setShowProgramPage(true);
  };

  const currentProgram = useMemo(() => {
    if (!selectedStation || !selectedProgram) return null;
    const station = mockStations.find((s) => s.id === selectedStation);
    if (!station) return null;
    return station.programs.find((p) => p.id === selectedProgram) ?? null;
  }, [selectedStation, selectedProgram]);

  const currentEpisode = useMemo(() => {
    if (!selectedStation || !selectedProgram || !selectedEpisode) return null;
    const station = mockStations.find((s) => s.id === selectedStation);
    if (!station) return null;
    const program = station.programs.find((p) => p.id === selectedProgram);
    if (!program) return null;
    return program.episodes.find((e) => e.id === selectedEpisode) ?? null;
  }, [selectedStation, selectedProgram, selectedEpisode]);

  return (
    <div className={`min-h-screen ${
      theme === 'colorful' 
        ? 'bg-mste-bg-dark' 
        : theme === 'gold'
        ? 'bg-gradient-to-br from-gold-50 via-warmGray-50 to-gold-100'
        : 'bg-gradient-to-br from-stone-100 via-warmGray-100 to-stone-50'
    }`}>
      <Header theme={theme} onThemeChange={setTheme} />
      <Sidebar 
        stations={mockStations}
        selectedStation={selectedStation}
        selectedProgram={selectedProgram}
        selectedEpisode={selectedEpisode}
        onSelectEpisode={handleSelectEpisode}
        onSelectProgram={handleSelectProgram}
        theme={theme}
      />
      <main className="ml-80 pt-16 min-h-screen">
        <div className="p-8">
          {showProgramPage && currentProgram ? (
            <ProgramPage 
              program={currentProgram} 
              theme={theme} 
              onSelectEpisode={(episodeId) => {
                setSelectedEpisode(episodeId);
                setShowProgramPage(false);
              }}
            />
          ) : (
            <MainContent 
              episode={currentEpisode} 
              theme={theme} 
              onBackToProgram={() => setShowProgramPage(true)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;