import React, { createContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children, songs }) => {
  const [currentSong, setCurrentSong] = useState({
    title: "Believer",
    artist: "Imagine Dragons",
    src: "assets/audio/Believer.mp3",
    image: "assets/images/believer.png", 
  });
  const [currentSongIndex, setCurrentSongIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio("assets/audio/Believer.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
        audioRef,
        currentTime,
        setCurrentTime,
        duration,
        songs,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };