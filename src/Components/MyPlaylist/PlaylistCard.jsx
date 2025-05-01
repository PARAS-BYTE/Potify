import React from 'react'
import { useNavigate } from 'react-router-dom'

const PlaylistCard = ({data,ind}) => {

    const navigate=useNavigate()
function clickhandler(){
    navigate("/playlistpage",{state :{data}})
}

  return (
    <div onClick={clickhandler}>
    <div className="w-full max-w-3xl mx-auto bg-[#111827] text-white flex justify-between items-center rounded-xl shadow-md p-4 mb-4">
    <div className="text-lg font-semibold">{`Playlist ${ind+1}` }</div>
    <img src={data[3].img} alt="playlist" className="w-24 h-24 object-cover rounded-lg" />
  </div>
    </div>
  )
}

export default PlaylistCard