import React, { useContext } from 'react'
import styles from './Favourite.module.css'
import Saddata from '../Saved/Saddata'
import Punjabidata from '../Saved/Punjabidata'
import Homedata from '../Saved/Homedata'
import PlaylistCard from '../MyPlaylist/PlaylistCard'
import CurrentMusicContext, { Musiccontext } from '../CurrentMusic/CurrentMusicContext'
import HomeCard from '../Home/HomeCard/Homecard'

const Favourite = () => {
    // let ver=[Saddata,Punjabidata,Homedata]
    const {fav,clearfav}=useContext(Musiccontext)
    console.log(fav)
  return (
    
    <>
    <div className={styles.some}>
        <div className={styles.somie}>

        {fav.map((t,ind)=><HomeCard  key ={ind}data={t} ind={ind} />)}
        </div>


        {fav.length?
        <button onClick={()=>{
          clearfav()
        }}
        style={{backgroundColor:"rgb(0,0,0.1)",padding:"0.8em 1em",fontSize:"16px",borderRadius:"30px",color:"white",marginTop:"20px"}}> Delete Collection</button>
      :""}
        </div>
    </>
  )
}

export default Favourite