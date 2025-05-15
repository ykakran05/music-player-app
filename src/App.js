import { PlayerProvider } from './context/PlayerProvider';
import Header from './components/Header';
import SongCard from './components/SongCard';
import Player from './components/Player';

const App = () => {
  const songs = [
    {
      title: "Believer",
      artist: "Imagine Dragons",
      image: "assets/images/believer.png",
      src: "assets/audio/Believer.mp3",
      shadowColor: "rgba(188, 243, 149, 0.4)",
    },
    {
      title: "Shortwave",
      artist: "Ryan Gridry",
      image: "assets/images/shortwave.png",
      src: "assets/audio/Shortwave.mp3",
      shadowColor: "rgba(238, 190, 68, 0.4)",
    },
    {
      title: "Dream On",
      artist: "Roger Terry",
      image: "assets/images/dream_on.png",
      src: "assets/audio/Dream-On.mp3",
      shadowColor: "rgba(240, 106, 106, 0.4)",
    },
    {
      title: "Origins",
      artist: "Imagine Dragons",
      image: "assets/images/origins.png",
      src: "assets/audio/Origins.mp3",
      shadowColor: "rgba(135, 226, 135, 0.4)",
    },
    {
      title: "Tie Me Down",
      artist: "New Boyz",
      image: "assets/images/tie-me-down.png",
      src: "assets/audio/Tie-Me-Down.mp3",
      shadowColor: "rgba(211, 142, 157, 0.4)",
    },
    {
      title: "Chaff & Dust",
      artist: "Hyonna",
      image: "assets/images/chaff-&-dust.png",
      src: "assets/audio/Chaff.mp3",
      shadowColor: "rgba(152, 166, 219, 0.4)",
    },
    {
      title: "A Sky Full Of Stars",
      artist: "ColdPlay",
      image: "assets/images/sky.png",
      src: "assets/audio/Sky.mp3",
      shadowColor: "rgba(211, 142, 157, 0.4)",
    },
    {
      title: "You Know You Love Me",
      artist: "Justin Bieber",
      image: "assets/images/love-me.png",
      src: "assets/audio/LoveMe.mp3",
      shadowColor: "rgba(152, 166, 219, 0.4)",
    },
    {
      title: "Oh Angel Sent From Up Above",
      artist: "ColdPlay",
      image: "assets/images/angel.png",
      src: "assets/audio/Angel.mp3",
      shadowColor: "rgba(240, 106, 106, 0.4)",
    },
    {
      title: "Eenie Meenie",
      artist: "Justin Bieber",
      image: "assets/images/eenie.png",
      src: "assets/audio/Eenie-Meenie.mp3",
      shadowColor: "rgba(152, 166, 219, 0.4)",
    },
  ];

  return (
    <PlayerProvider songs={songs}>
      <div className="min-h-screen pb-20">
        <Header />
        <div className="px-6 pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 justify-items-center">
          {songs.map((song, index) => (
            <SongCard
              key={index}
              title={song.title}
              artist={song.artist}
              image={song.image}
              src={song.src}
              shadowColor={song.shadowColor}
            />
          ))}
        </div>
        <Player />
      </div>
    </PlayerProvider>
  );
};

export default App;