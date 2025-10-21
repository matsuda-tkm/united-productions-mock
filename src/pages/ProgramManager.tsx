import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronRight, ExternalLink, Files, Home, Palette, Plus, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

type ColorTheme = 'green' | 'gold';

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
    primary: 'amber',
    primaryHover: 'amber-700',
    primaryBg: 'from-amber-600 to-amber-700',
    primaryBgHover: 'from-amber-700 to-amber-800',
    accent: 'amber-600',
    accentHover: 'amber-700',
    accentBg: 'amber-50',
    accentBorder: 'amber-600',
    accentText: 'amber-600',
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
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/50 bg-white/90 backdrop-blur-xl"
      role="banner"
    >
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${currentTheme.primaryBg} text-white shadow-xl overflow-hidden`}
            aria-hidden="true"
          >
            {/* TV制作をイメージしたアイコンデザイン */}
            <div className="relative">
              {/* テレビ画面 */}
              <div className="w-6 h-4 bg-white/20 rounded-sm border border-white/30">
                <div className="w-full h-full bg-gradient-to-br from-white/40 to-white/10 rounded-sm flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              {/* アンテナ */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-white/60 rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-white/60 rounded-tr-lg"></div>
            </div>
            {/* 光るエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </motion.div>
          <div>
            <h1 className="text-sm font-medium text-stone-800">AD Copilot AI</h1>
            <p className="text-xs text-stone-500">番組管理システム</p>
          </div>
        </div>
        <nav className="flex items-center gap-3" role="navigation" aria-label="メインナビゲーション">
          <Link 
            to="/" 
            className="text-sm text-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 rounded"
            aria-label="ホームページへ移動"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            ホーム
          </Link>
          <div className="flex items-center gap-2">
            <Palette className="h-3 w-3 text-stone-400" aria-hidden="true" />
            <label htmlFor="theme-select-pm" className="sr-only">テーマ選択</label>
            <select 
              id="theme-select-pm"
              value={theme} 
              onChange={(e) => onThemeChange(e.target.value as ColorTheme)}
              className="text-xs bg-transparent border-none outline-none text-stone-500 hover:text-stone-800 transition-colors cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 rounded"
              aria-label="カラーテーマを選択"
            >
              <option value="green">グリーン</option>
              <option value="gold">ゴールド</option>
            </select>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm uppercase tracking-wide transition-all hover:border-stone-500 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
            aria-label="ログイン"
          >
            ログイン
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

const Sidebar = ({ 
  stations, 
  selectedStation,
  selectedProgram, 
  selectedEpisode, 
  onSelectEpisode 
}: { 
  stations: TVStation[];
  selectedStation: string | null;
  selectedProgram: string | null;
  selectedEpisode: string | null;
  onSelectEpisode: (stationId: string, programId: string, episodeId: string) => void;
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
    <motion.aside 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-16 bottom-0 w-72 border-r border-stone-200 bg-white overflow-y-auto"
      role="navigation"
      aria-label="番組一覧"
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 px-2">テレビ局・番組一覧</h2>
        </div>
        <div className="space-y-1">
          {stations.map((station) => {
            const isStationExpanded = expandedStations.has(station.id);
            return (
              <div key={station.id}>
                {/* テレビ局レベル */}
                <motion.button
                  onClick={() => toggleStation(station.id)}
                  whileHover={{ backgroundColor: "rgba(120, 113, 108, 0.05)" }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 ${
                    selectedStation === station.id ? "bg-stone-100" : "hover:bg-stone-50"
                  }`}
                  aria-expanded={isStationExpanded}
                  aria-controls={`station-${station.id}-programs`}
                  aria-label={`${station.name}の番組一覧を${isStationExpanded ? '閉じる' : '開く'}`}
                >
                  {isStationExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-stone-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-stone-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{station.name}</p>
                  </div>
                </motion.button>
                
                {/* 番組リスト */}
                <AnimatePresence>
                  {isStationExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      id={`station-${station.id}-programs`}
                      className="ml-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {station.programs.map((program) => {
                        const isProgramExpanded = expandedPrograms.has(program.id);
                        return (
                          <div key={program.id}>
                            <motion.button
                              onClick={() => toggleProgram(program.id)}
                              whileHover={{ backgroundColor: "rgba(120, 113, 108, 0.05)" }}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 ${
                                selectedProgram === program.id ? "bg-stone-100" : "hover:bg-stone-50"
                              }`}
                              aria-expanded={isProgramExpanded}
                              aria-controls={`program-${program.id}-episodes`}
                              aria-label={`${program.name}の放送回一覧を${isProgramExpanded ? '閉じる' : '開く'}`}
                            >
                              {isProgramExpanded ? (
                                <ChevronDown className="h-3 w-3 text-stone-500 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-stone-500 flex-shrink-0" />
                              )}
                              {/* サムネイル画像 */}
                              <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src="/src/assets/thumbnail/image.png" 
                                  alt={`${program.name}のサムネイル`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-stone-700 truncate">{program.name}</p>
                                <p className="text-xs font-medium text-stone-500 truncate">{program.genre}</p>
                              </div>
                            </motion.button>
                            
                            {/* エピソードリスト */}
                            <AnimatePresence>
                              {isProgramExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  id={`program-${program.id}-episodes`}
                                  className="ml-6 mt-1 space-y-1 overflow-hidden"
                                >
                                  {program.episodes.map((episode) => (
                                    <motion.button
                                      key={episode.id}
                                      onClick={() => onSelectEpisode(station.id, program.id, episode.id)}
                                      whileHover={{ x: 1 }}
                                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 ${
                                        selectedEpisode === episode.id
                                          ? "bg-stone-700 text-white"
                                          : "hover:bg-stone-50 text-stone-600"
                                      }`}
                                      aria-label={`${episode.date} ${episode.time}の放送回を選択`}
                                    >
                                      <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                                      <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-medium truncate`}>
                                          {episode.date}
                                        </p>
                                        <p className={`text-xs font-medium truncate ${
                                          selectedEpisode === episode.id ? 'text-white/80' : 'text-stone-500'
                                        }`}>
                                          {episode.time}
                                        </p>
                                      </div>
                                    </motion.button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};

const TabTrigger = ({
  isActive,
  label,
  onClick,
  theme,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
  theme: ColorTheme;
}) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition-all ${
        isActive
          ? `border-${currentTheme.accent} bg-gradient-to-r ${currentTheme.primaryBg} text-white shadow-lg`
          : "border-stone-200 bg-white text-stone-500 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-700"
      }`}
    >
      {label}
    </motion.button>
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
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md border border-stone-200">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex w-full flex-col gap-3 text-sm md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder={placeholder}
              className={`w-full rounded-xl border-2 border-stone-200 bg-stone-50 py-3 pl-12 pr-4 text-sm text-stone-800 placeholder-stone-400 focus:border-${currentTheme.accent} focus:bg-white focus:outline-none transition-all`}
            />
          </div>
          {secondaryPlaceholder && (
            <input
              type="date"
              className={`min-w-[200px] rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 focus:border-${currentTheme.accent} focus:bg-white focus:outline-none transition-all`}
            />
          )}
        </div>
        <button className={`rounded-xl bg-gradient-to-r ${currentTheme.primaryBg} px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:${currentTheme.primaryBgHover} transition-all whitespace-nowrap shadow-lg`}>
          {ctaLabel}
        </button>
      </div>
    </div>
  );
};

const ItemCard = ({ title, detail, actionLabel, links, theme }: Section["items"][number] & { theme: ColorTheme }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
      className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-md transition-all"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold text-stone-900 group-hover:text-${currentTheme.accentText} transition-colors`}>{title}</h3>
          <p className="mt-2 text-xs font-medium tracking-[0.3em] text-stone-400">{detail}</p>
          {links && (
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((link) => (
                <motion.li 
                  key={link.label}
                  whileHover={{ x: 4 }}
                >
                  <a
                    href={link.href}
                    className={`inline-flex items-center gap-2 text-sm font-medium tracking-wide text-stone-600 transition-colors hover:text-${currentTheme.accentText}`}
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full border border-${currentTheme.accentBorder} bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-${currentTheme.accentText} transition-all hover:border-${currentTheme.accentHover} hover:bg-${currentTheme.accentBg} hover:text-${currentTheme.accentHover}`}
        >
          {actionLabel}
        </motion.button>
      </div>
    </motion.article>
  );
};

const SectionPanel = ({ section, theme }: { section: Section; theme: ColorTheme }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 to-warmGray-50 p-9 shadow-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-stone-900">{section.title}</h2>
          <p className="text-sm text-stone-600">{section.description}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 rounded-full border border-${currentTheme.accentBorder} bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-${currentTheme.accentText} transition-all hover:border-${currentTheme.accentHover} hover:bg-${currentTheme.accentBg} hover:text-${currentTheme.accentHover} shadow-md`}
        >
          <Plus className="h-4 w-4" />
          {section.addLabel}
        </motion.button>
      </div>
      <SearchPanel
        placeholder={section.placeholder}
        secondaryPlaceholder={section.secondaryPlaceholder}
        ctaLabel={section.ctaLabel}
        theme={theme}
      />
      <div className="grid gap-5">
        {section.items.length > 0 ? (
          section.items.map((item) => (
            <ItemCard key={item.title} {...item} theme={theme} />
          ))
        ) : (
          <div className="text-center py-12 text-stone-400">
            <p className="text-sm">データがまだ登録されていません</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

const MainContent = ({ episode, theme }: { episode: Episode | null; theme: ColorTheme }) => {
  const [activeTab, setActiveTab] = useState<string>("minutes");

  const activeSection = useMemo(() => {
    if (!episode) return null;
    return episode.sections.find((section) => section.id === activeTab) ?? episode.sections[0];
  }, [episode, activeTab]);

  if (!episode) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Files className="h-16 w-16 text-stone-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-stone-700 mb-2">放送回を選択してください</h3>
          <p className="text-sm text-stone-500">左側のサイドバーから番組と放送回を選択すると、詳細情報が表示されます</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-stone-50 via-warmGray-50 to-stone-100 rounded-3xl p-8 border border-stone-200 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-stone-900 mb-2">{episode.title}</h1>
        <p className="text-sm text-stone-600">放送日時: {episode.date} {episode.time}</p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3">
        {episode.sections.map((section) => (
          <TabTrigger
            key={section.id}
            label={`${section.title} (${section.items.length})`}
            isActive={activeTab === section.id}
            onClick={() => setActiveTab(section.id)}
            theme={theme}
          />
        ))}
      </div>

      {activeSection && <SectionPanel section={activeSection} theme={theme} />}
    </div>
  );
};

function ProgramManager() {
  const [selectedStation, setSelectedStation] = useState<string | null>(mockStations[0]?.id || null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(mockStations[0]?.programs[0]?.id || null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(
    mockStations[0]?.programs[0]?.episodes[0]?.id || null
  );
  const [theme, setTheme] = useState<ColorTheme>('green');

  const handleSelectEpisode = (stationId: string, programId: string, episodeId: string) => {
    setSelectedStation(stationId);
    setSelectedProgram(programId);
    setSelectedEpisode(episodeId);
  };

  const currentEpisode = useMemo(() => {
    if (!selectedStation || !selectedProgram || !selectedEpisode) return null;
    const station = mockStations.find((s) => s.id === selectedStation);
    if (!station) return null;
    const program = station.programs.find((p) => p.id === selectedProgram);
    if (!program) return null;
    return program.episodes.find((e) => e.id === selectedEpisode) ?? null;
  }, [selectedStation, selectedProgram, selectedEpisode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-warmGray-100 to-stone-50">
      <Header theme={theme} onThemeChange={setTheme} />
      <Sidebar 
        stations={mockStations}
        selectedStation={selectedStation}
        selectedProgram={selectedProgram}
        selectedEpisode={selectedEpisode}
        onSelectEpisode={handleSelectEpisode}
      />
      <main className="ml-72 pt-16 min-h-screen">
        <div className="p-8">
          <MainContent episode={currentEpisode} theme={theme} />
        </div>
      </main>
    </div>
  );
}

export default ProgramManager;
