import { Palette } from 'lucide-react';
import React from 'react';
import { colorThemes } from '../themes';
import { ColorTheme } from '../types';

interface HeaderProps {
  theme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  const currentTheme = colorThemes[theme];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
        theme === 'colorful' 
          ? 'border-mste-electric-cyan/40 bg-mste-bg-dark/95 shadow-mste-glow' 
          : theme === 'colorful-light'
          ? 'border-mste-royal-blue/20 bg-gradient-to-r from-mste-electric-cyan/5 via-mste-royal-blue/5 to-mste-hot-magenta/5 shadow-lg'
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
            <h1 className={`text-lg font-bold ${theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue via-mste-grape-purple to-mste-hot-magenta bg-clip-text text-transparent' : 'text-stone-900'}`}>
              AD Copilot AI
            </h1>
            <p className={`text-xs font-medium ${theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'}`}>
              番組管理システム
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-3" role="navigation" aria-label="メインナビゲーション">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
            <Palette className={`h-4 w-4 ${theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500'}`} aria-hidden="true" />
            <label htmlFor="theme-select" className="sr-only">テーマ選択</label>
            <select 
              id="theme-select"
              value={theme} 
              onChange={(e) => onThemeChange(e.target.value as ColorTheme)}
              className={`text-sm font-medium bg-transparent border-none outline-none transition-colors cursor-pointer focus:ring-2 focus:ring-offset-2 ${
                theme === 'colorful' 
                  ? 'text-white hover:text-mste-electric-cyan focus:ring-mste-electric-cyan' 
                  : theme === 'colorful-light'
                  ? 'text-mste-royal-blue hover:text-mste-hot-magenta focus:ring-mste-electric-cyan'
                  : 'text-stone-600 hover:text-stone-800 focus:ring-stone-500'
              }`}
              aria-label="カラーテーマを選択"
            >
              <option value="green">グリーン</option>
              <option value="gold">ゴールド</option>
              <option value="colorful">カラフル</option>
              <option value="colorful-light">カラフル（ライト）</option>
            </select>
          </div>
          <button 
            className={`${
              theme === 'gold' ? 'rounded-sm' : 'rounded-lg'
            } px-5 py-2 text-sm font-semibold uppercase transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'colorful'
                ? 'border border-mste-electric-cyan bg-mste-bg-dark text-mste-electric-cyan hover:bg-mste-electric-cyan hover:text-mste-bg-dark shadow-mste-glow focus:ring-mste-electric-cyan'
                : theme === 'colorful-light'
                ? 'border-2 border-transparent bg-mste-gradient text-white hover:opacity-90 shadow-lg focus:ring-mste-electric-cyan'
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
