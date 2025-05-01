import React, { createContext, useEffect, useState } from 'react'

const FavouriteContext=createContext()


const LocalStorage = ({children}) => {
    const [favs, setfavs] = useState([]);
    

    if(localStorage.getItem("favs")){
        setfavs(localStorage.getItem("favs"))
    }
    function addfav(data){
        setfavs([...favs,data])
    }
    useEffect(()=>{
        localStorage.setItem("favs",favs)
    },[favs])

  return (
    <>
        <FavouriteContext.Provider value={{favs,addfav}} >

        {children}

        </FavouriteContext.Provider>

    </>
  )
}


export default LocalStorage

export {FavouriteContext}