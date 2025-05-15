import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerProvider';

const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  const { isPlaying, setIsPlaying, audioRef, currentSongIndex, setCurrentSongIndex, setCurrentSong, songs } = context;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playPrevious = () => {
    if (currentSongIndex > 0) {
      const newIndex = currentSongIndex - 1;
      const newSong = songs[newIndex];
      setCurrentSongIndex(newIndex);
      setCurrentSong({ title: newSong.title, artist: newSong.artist, src: newSong.src, image: newSong.image });
      audioRef.current.src = newSong.src;
      setIsPlaying(true);
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  };

  const playNext = () => {
    if (currentSongIndex < songs.length - 1) {
      const newIndex = currentSongIndex + 1;
      const newSong = songs[newIndex];
      setCurrentSongIndex(newIndex);
      setCurrentSong({ title: newSong.title, artist: newSong.artist, src: newSong.src, image: newSong.image });
      audioRef.current.src = newSong.src;
      setIsPlaying(true);
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  };

  return { ...context, togglePlayPause, playPrevious, playNext };
};

export default usePlayer;