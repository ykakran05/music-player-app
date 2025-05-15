import { useRef, useEffect, useState } from 'react';
import usePlayer from '../hooks/usePlayer';

const Player = () => {
  const { currentSong, isPlaying, togglePlayPause, playPrevious, playNext, audioRef, currentTime, setCurrentTime, duration, currentSongIndex, songs } = usePlayer();
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef(null);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection while dragging
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newProgress = ((e.clientX - rect.left) / rect.width) * 100;
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleClick = (e) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newProgress = ((e.clientX - rect.left) / rect.width) * 100;
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800">
      <div
        className="w-full h-1 bg-gray-600 rounded-full relative cursor-pointer px-6"
        ref={progressBarRef}
        onClick={handleClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-white rounded-full -top-1.5 cursor-pointer"
          style={{ left: `calc(${progress}% - 8px)` }}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <div
        className="p-4 flex items-center justify-between"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex items-center space-x-3">
          {currentSong?.image ? (
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{currentSong?.title || 'No song selected'}</p>
            <p className="text-xs text-gray-400 uppercase truncate">{currentSong?.artist || ''}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={playPrevious} disabled={currentSongIndex === 0}>
            <img
              src="assets/icons/previous.png"
              alt="Previous"
              className="w-6 h-6 text-gray-300"
            />
          </button>
          <button onClick={togglePlayPause}>
            <img
              src={isPlaying ? "assets/icons/pause.png" : "assets/icons/play.png"}
              alt={isPlaying ? "Pause" : "Play"}
              className="w-7 h-7 text-gray-300"
            />
          </button>
          <button onClick={playNext} disabled={currentSongIndex === songs.length - 1}>
            <img
              src="assets/icons/next.png"
              alt="Next"
              className="w-6 h-6 text-gray-300"
            />
          </button>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Player;