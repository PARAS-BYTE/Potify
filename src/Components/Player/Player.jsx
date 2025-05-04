

import { useState, useRef, useEffect, useContext } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart, Pointer } from 'lucide-react';
import { Musiccontext } from '../CurrentMusic/CurrentMusicContext';
import { FavouriteContext } from '../../LocalStorage/LocalStorage';
import AllGeneres from '../AllGeneres/AllGeneres';
// import Favourite from '../Favourite/Favourite';
// import { FavouriteContext } from '../../LocalStorage/LocalStorage';

// import './Player.css'


// Bottom Bar Music Player Component
export default function Player() {





const {addfav}=useContext(Musiccontext)






  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
   const[numbers,setnumbers]=useState(0)
  let some = useContext(Musiccontext);
  const [data, setdata] = useState();
useEffect(()=>{
    setdata(some.data)
},[some])
  
  useEffect(() => {
    if (audioRef.current && data?.url) {
      audioRef.current.src = data.url;
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
      });
      setIsPlaying(true);
    }
    setIsFavorite(false)
  }, [data]);

  const track = {
    title: data?.name || "No track selected",
    artist: data?.artist || "Unknown artist",
    coverImage: data?.img || "",
    audioSrc: data?.url || ""
  };
  
  // Refs
  const audioRef = useRef(null);
  const volumeControlRef = useRef(null);
  
  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  window.addEventListener("load",()=>{
    audioRef.current.pause()
  })
  // Handle seek
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };
  
  // Toggle volume control visibility
  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };
  
  // Toggle repeat
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat;
    }
  };
  
  // Toggle shuffle

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };
  
  // Toggle favorite
  
  // console.log(some)
  
//   const {favs,addfav}=useContext(FavouriteContext)
  const toggleFavorite = () => {
    // console.log(favs)
    // console.log(addfav)
    // if(!isFavorite){
        // addfav(data)
    // }
    // console.log(addfav)
    addfav(data)

    // Here is the favourite tooggle
    setIsFavorite(!isFavorite);
  };
  




const {addlist}=useContext(Musiccontext);



  // Skip to next track
  const nextTrack = () => {
    if (audioRef.current) {
        setdata(gens[numbers])
        if(numbers<gens.length){
            setnumbers(numbers+1)
        }else{
            setnumbers(6)
        }
    //   audioRef.current.currentTime = 0;
    //   audioRef.current.play().catch(error => {
    //     console.error("Playback failed:", error);
    //   });
      setIsPlaying(true);
    }
  };


  
  let gens=AllGeneres

  
//   console.log(gens)
  // Skip to previous track
  const prevTrack = () => {
    //   data=gens[8]
    // console.log(gens[5])
    // console.log(numbers)
    setdata(gens[numbers])
    if(numbers>1){
        setnumbers(numbers-1)
    }else{
        setnumbers(6)
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
      });

      setIsPlaying(true);
    }
  };
  
  // Click outside handler for volume control
  useEffect(() => {
    function handleClickOutside(event) {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target)) {
        setShowVolumeControl(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      audio.addEventListener('ended', () => {
        if (!isRepeat) {
          nextTrack()
          // setIsPlaying(false);
        }else{
          audio.play()
        }
      });
      
      // Set initial volume
      audio.volume = volume;
      
      // Clean up
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('ended', () => {});
      };
    }
  }, [isRepeat, volume]);
  
  return (
    <div
    style={{padding : "5px",boxShadow:"rgb(0,0,0,0.5)"}} 
    className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 text-white shadow-lg z-50" >
      {/* Hidden audio element */}
      <audio 
        style={{display: "none"}}
        ref={audioRef}
        src={track.audioSrc}
        controls
        preload="metadata"
      />
      
      {/* Progress bar - thin line at the very top */}
      <div className="h-1 bg-gray-800 w-full" style={{marginBottom:"5px",marginTop:"5px"}}>
        <div 
          className="h-full bg-purple-600" 
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>
      
      {/* Main player content */}
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Track info with album art */}
        <div className="flex items-center space-x-3 w-1/4">
          <div className="w-12 h-12 flex-shrink-0 bg-gray-800 rounded overflow-hidden"  style={{marginLeft:"10px",marginRight:"20px",marginTop:"5px"}} >
            {track.coverImage && (
              <img 
                src={track.coverImage} 
                alt="Album cover" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">{track.title}</h3>
            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
          </div>
        </div>
        
        {/* Playback controls - center */}
        <div className="flex flex-col items-center justify-center space-y-1 w-2/4">
          {/* Control buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={toggleShuffle}
              className={`p-1 rounded-full hover:bg-gray-800 ${isShuffle ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <Shuffle size={16} />
            </button>
            
            <button 
              onClick={prevTrack}
              className="p-3 text-white hover:text-purple-400 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              onClick={togglePlay}
                style={{marginLeft:"10px",marginRight:"10px", padding:"10px"}}
              className="p-5 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-all"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            
            <button 
              onClick={nextTrack}
              className="p-1 text-white hover:text-purple-400 transition-colors"
            >
              <SkipForward size={20} />
            </button>
            
            <button 
              onClick={toggleRepeat}
              className={`p-1 rounded-full hover:bg-gray-800 ${isRepeat ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <Repeat size={16} />
            </button>
          </div>
          
          {/* Progress bar with time */}
          <div className="w-full max-w-md flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-8">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
            />
            <span className="text-xs text-gray-400 w-8">{formatTime(duration)}</span>
          </div>
        </div>





       
        
        {/* Volume control and favorite button - right */}
        <div className="flex items-center justify-end w-1/4 space-x-2">
        <div className="flex items-center justify-end w-1/4 space-x-2">
          <button 
            onClick={()=>{
              addlist(data)
            }}
            className={`'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
           style={{marginRight:"20px",cursor: "pointer"}}
          >
            ➕
          </button>
            </div>
          <button 
            onClick={toggleFavorite}
            className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
           style={{marginRight:"20px"}}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <div className="relative" ref={volumeControlRef}>
            <button 
              onClick={toggleMute}
              className="p-2 text-gray-400 hover:text-white"
              style={{marginRight:"20px"}}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            {showVolumeControl && (
              <div className="absolute bottom-10 right-0 bg-gray-800 p-3 rounded-lg shadow-lg">
                <input
                  type="range"
                  className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  orient="vertical"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}