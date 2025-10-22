import React from 'react';
import { EpisodeWidgetView } from './components/EpisodeWidgetView';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { ProgramPage } from './components/ProgramPage';
import { ProgramWidgetView } from './components/ProgramWidgetView';
import { Sidebar } from './components/Sidebar';
import { WidgetView } from './components/WidgetView';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    stations,
    selectedStation,
    selectedProgram,
    selectedEpisode,
    showProgramPage,
    theme,
    viewMode,
    currentProgram,
    currentEpisode,
    setTheme,
    setViewMode,
    handleSelectEpisode,
    handleSelectProgram,
    setSelectedEpisode,
    setShowProgramPage,
  } = useAppState();

  return (
    <div className={`min-h-screen ${
      theme === 'colorful' 
        ? 'bg-mste-bg-dark' 
        : theme === 'colorful-light'
        ? 'bg-gradient-to-br from-mste-electric-cyan/10 via-mste-grape-purple/10 to-mste-hot-magenta/10'
        : theme === 'gold'
        ? 'bg-gradient-to-br from-gold-50 via-warmGray-50 to-gold-100'
        : 'bg-gradient-to-br from-stone-100 via-warmGray-100 to-stone-50'
    }`}>
      <Header 
        theme={theme} 
        viewMode={viewMode}
        onThemeChange={setTheme} 
        onViewModeChange={setViewMode}
      />
      
      {viewMode === 'widget' ? (
        // ウィジェットモード: サイドバーなしで全画面表示
        <main className="pt-16 min-h-screen">
          {showProgramPage && currentProgram ? (
            // 番組詳細ページ（ウィジェット形式）
            <ProgramWidgetView 
              program={currentProgram}
              theme={theme}
              onSelectEpisode={(episodeId) => {
                setSelectedEpisode(episodeId);
                setShowProgramPage(false);
              }}
              onBack={() => {
                setShowProgramPage(false);
                setSelectedEpisode(null);
              }}
            />
          ) : currentEpisode ? (
            // エピソード詳細ページ（ウィジェット形式）
            <EpisodeWidgetView 
              episode={currentEpisode}
              theme={theme}
              onBack={() => setShowProgramPage(true)}
            />
          ) : (
            // 番組一覧ページ（ウィジェット形式）
            <WidgetView 
              stations={stations}
              theme={theme}
              onSelectProgram={handleSelectProgram}
              onSelectEpisode={handleSelectEpisode}
            />
          )}
        </main>
      ) : (
        // リストモード: 従来のサイドバー+メインコンテンツ
        <>
          <Sidebar 
            stations={stations}
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
        </>
      )}
    </div>
  );
}

export default App;