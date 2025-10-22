import { useMemo, useState } from 'react';
import { mockStations } from '../data/mockData';
import { ColorTheme } from '../types';

export const useAppState = () => {
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

  return {
    stations: mockStations,
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
  };
};
