import React, { useContext } from 'react'

import styles from './MyPlaylist.module.css'
import Saddata from '../Saved/Saddata'
import Punjabidata from '../Saved/Punjabidata'
import Homedata from '../Saved/Homedata'
import PlaylistCard from './PlaylistCard'
import { Musiccontext } from '../CurrentMusic/CurrentMusicContext'

const MyPlaylist = ({some,playlistname}) => {
  const{playlist}=useContext(Musiccontext)
  console.log(playlist)
    let ver;
    if(some){
        ver=[some]
    } else{

         ver=[playlist,Saddata,Punjabidata,Homedata]
    }

  return (
    <>

   
    <div className={styles.some}>
        <div className={styles.somie} >

        {ver.map((t,ind)=><PlaylistCard  key ={ind}data={t} ind={ind} />)}
        </div>
    
    </div>
 
    </>
  )
}

export default MyPlaylist