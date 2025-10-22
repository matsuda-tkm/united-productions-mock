import React from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { ProgramPage } from './components/ProgramPage';
import { Sidebar } from './components/Sidebar';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    stations,
    selectedStation,
    selectedProgram,
    selectedEpisode,
    showProgramPage,
    theme,
    currentProgram,
    currentEpisode,
    setTheme,
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
      <Header theme={theme} onThemeChange={setTheme} />
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
    </div>
  );
}

export default App;