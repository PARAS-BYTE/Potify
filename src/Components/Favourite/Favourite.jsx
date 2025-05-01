import React from 'react'
import styles from './Favourite.module.css'
import Saddata from '../Saved/Saddata'
import Punjabidata from '../Saved/Punjabidata'
import Homedata from '../Saved/Homedata'
import PlaylistCard from '../MyPlaylist/PlaylistCard'
const Favourite = () => {
    let ver=[Saddata,Punjabidata,Homedata]
  return (
    
    <>
    <div className={styles.some}>
        <div className={styles.somie}>

        {ver.map((t,ind)=><PlaylistCard  key ={ind}data={t} ind={ind} />)}
        </div>
    
    </div>
    </>
  )
}

export default Favourite