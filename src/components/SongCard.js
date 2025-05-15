import React from 'react';
import usePlayer from '../hooks/usePlayer';

const SongCard = ({ title, artist, image, src, shadowColor }) => {
  const { setCurrentSong, togglePlayPause, audioRef, setIsPlaying, setCurrentSongIndex, songs } = usePlayer();

  const handlePlay = () => {
    const songIndex = songs.findIndex((song) => song.src === src);
    if (audioRef.current.src !== src) {
      audioRef.current.src = src;
      setCurrentSong({ title, artist, src, image }); 
      setCurrentSongIndex(songIndex);
      setIsPlaying(true);
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    } else {
      togglePlayPause();
    }
  };

  return (
    <div className="w-44 cursor-pointer" onClick={handlePlay}>
      <img
        src={image}
        alt={title}
        className="w-44 h-44 rounded-lg mb-2 object-cover"
        style={{ boxShadow: `0 8px 20px 0px ${shadowColor}` }}
      />
      <div className="text-center">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-xs text-gray-400 uppercase">{artist}</p>
      </div>
    </div>
  );
};

export default SongCard;