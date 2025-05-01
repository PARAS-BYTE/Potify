import React, { createContext, useState } from 'react'

const Musiccontext=createContext()


const CurrentMusicContext = ({children}) => {
    const [data,setdata]=useState({
        artist : "Sonu Nigam",
        name :"Kamal hasn",
        url : "https://aac.saavncdn.com/183/b74301ad9d1adfcfb4ec2fc325547dad_320.mp4",
        img: "https://images.pexels.com/photos/31306499/pexels-photo-31306499/free-photo-of-cozy-dining-room-with-vintage-map-decor.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    })
    function changedata(url,img,artist,name){
        setdata({
            url : url,
            img : img,
            artist :artist,
            name :name,
        })
    }
  return (
    <>

        <Musiccontext.Provider value={{data,changedata}}>
            {children}
        </Musiccontext.Provider>

    </>
  )
}

export default CurrentMusicContext
export {Musiccontext}