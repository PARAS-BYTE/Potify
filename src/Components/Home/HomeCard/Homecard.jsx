import React, { useContext } from 'react';
import { Musiccontext } from '../../CurrentMusic/CurrentMusicContext';

const HomeCard = ({ data = {} }) => {
  const {
    img = "/api/placeholder/400/320",
    name = "Untitled",
    artistname = "Unknown Artist"
    
  } = data || {};
  
  const {addprev}=useContext(Musiccontext)
  
  const {changedata}=useContext(Musiccontext)
function clickhandler(){
    // console.log(data)
    addprev(data)
    changedata(data.url,data.img,data.name,data.artistname,data.name)
}
  return (
    <div className="w-44 sm:w-48 bg-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-200 transform hover:-translate-y-1 border border-gray-700 flex flex-col" onClick={clickhandler}
    style={{padding:"10px"}}
    >
      <div className="relative h-56">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
          style={{borderTopRightRadius:"20px",borderTopLeftRadius:"20px"}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
      </div>

      <div className="p-2 flex flex-col justify-between flex-grow space-y-2">
        <h3 className="text-sm font-semibold text-white truncate" style={{padding:"5px"}}>{name}</h3>

        <div className="flex items-center gap-1">
          <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
          <p className="text-gray-400 text-xs truncate" style={{paddingBottom:"5px",paddingTop:"3px"}}>{artistname}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-400 text-xs " style={{margin:"5px"}}>
            {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> */}
              {/* <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> */}
            {/* </svg> */}
            {/* <span>{3.2}</span> */}
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs rounded px-2 py-0.5 leading-none" style={{padding:"5px"}}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
