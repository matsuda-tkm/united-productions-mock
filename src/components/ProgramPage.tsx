import { Calendar } from 'lucide-react';
import React from 'react';
import { ColorTheme, Program } from '../types';

interface ProgramPageProps {
  program: Program;
  theme: ColorTheme;
  onSelectEpisode: (episodeId: string) => void;
}

export const ProgramPage: React.FC<ProgramPageProps> = ({ program, theme, onSelectEpisode }) => {
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
            : theme === 'colorful-light'
            ? 'border-mste-royal-blue/20 shadow-lg'
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
            theme === 'colorful' ? 'bg-mste-bg-dark/80' : theme === 'colorful-light' ? 'bg-gradient-to-br from-mste-electric-cyan/50 via-mste-royal-blue/50 to-mste-hot-magenta/50' : 'bg-black/60'
          }`} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'text-white drop-shadow-lg' : 'text-white'
              }`}>
                {program.name}
              </h1>
              <p className={`text-lg ${
                theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-white drop-shadow-md' : 'text-gray-200'
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
            : theme === 'colorful-light'
            ? 'border-mste-royal-blue/20 bg-white backdrop-blur-xl shadow-lg'
            : theme === 'gold'
            ? 'border-gold-300 bg-gold-elegant'
            : 'border-stone-200 bg-gradient-to-br from-stone-50 to-warmGray-50'
        }`}
      >
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${
            theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent' : 'text-stone-900'
          }`}>
            放送回一覧
          </h2>
          <p className={`text-sm ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
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
                  : theme === 'colorful-light'
                  ? 'border-mste-royal-blue/20 bg-white hover:bg-gradient-to-r hover:from-mste-electric-cyan/10 hover:to-mste-hot-magenta/10 hover:border-mste-grape-purple/40'
                  : theme === 'gold'
                  ? 'border-gold-300 bg-gold-elegant hover:bg-gold-100 hover:border-gold-400 shadow-gold-sharp'
                  : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className={`h-5 w-5 ${
                  theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500'
                }`} />
                <div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent' : 'text-stone-900'
                  }`}>
                    {episode.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'colorful' ? 'text-mste-electric-cyan/80' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-500'
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
            : theme === 'colorful-light'
            ? 'border-mste-royal-blue/20 bg-white backdrop-blur-xl shadow-lg'
            : theme === 'gold'
            ? 'border-gold-300 bg-gold-elegant'
            : 'border-stone-200 bg-gradient-to-br from-stone-50 to-warmGray-50'
        }`}
      >
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${
            theme === 'colorful' ? 'text-white' : theme === 'colorful-light' ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent' : 'text-stone-900'
          }`}>
            議事録一覧
          </h2>
          <p className={`text-sm ${
            theme === 'colorful' ? 'text-mste-electric-cyan' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-600'
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
                  : theme === 'colorful-light'
                  ? 'border-mste-royal-blue/20 bg-white backdrop-blur-xl shadow-lg'
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
                      : theme === 'colorful-light'
                      ? 'bg-gradient-to-r from-mste-royal-blue to-mste-grape-purple bg-clip-text text-transparent group-hover:from-mste-grape-purple group-hover:to-mste-hot-magenta'
                      : 'text-stone-900 group-hover:text-emerald-700'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-xs font-medium ${
                    theme === 'colorful' ? 'text-mste-electric-cyan/80' : theme === 'colorful-light' ? 'text-mste-grape-purple' : 'text-stone-400'
                  }`}>
                    {item.detail}
                  </p>
                  <p className={`mt-1 text-xs ${
                    theme === 'colorful' ? 'text-mste-electric-cyan/60' : theme === 'colorful-light' ? 'text-mste-royal-blue' : 'text-stone-500'
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
