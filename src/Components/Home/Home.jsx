import React, { useContext } from 'react'
import Homedata from '../Saved/Homedata'
import Homecard from './HomeCard/Homecard'
import styles from './Home.module.css'
import Saddata from '../Saved/Saddata'
import Punjabidata from '../Saved/Punjabidata'
import PlaylistPage from '../Playlistpage/PlaylistPage'
import Arjit from './Arjit'
import MyPlaylist from '../MyPlaylist/MyPlaylist'
import { Musiccontext } from '../CurrentMusic/CurrentMusicContext'

const Home = () => {
    const arjit=Arjit
    let {prev}=useContext(Musiccontext)
    prev=prev.slice(0,4)
  return (
    <>
    <div className={styles.some}>


        <MyPlaylist some={arjit} />


    <h1 style={{fontSize:"1.5em",marginLeft:"30px",fontWeight:"600"}}>Suggest Music</h1>

    <h1 style={{fontSize:"1.5em",marginLeft:"30px",fontWeight:"600"}}>Featured</h1>
    <div className={styles.somei}>

        {prev.map((t,ind)=><Homecard  key={ind} data={t}/>)}

    </div>
    

    <br />


    <div className={styles.somei}>
    {Homedata.map((t,ind)=><Homecard key={ind}  data={t}/>)}
    </div>
    
    <h1 style={{fontSize:"1.5em",marginLeft:"30px",fontWeight:"600"}} >Sad Songs</h1>
    <div className={styles.somei}>
    {Saddata.map((t,ind)=><Homecard key={ind}  data={t}/>)}
    </div>
    <h1 style={{fontSize:"1.5em",marginLeft:"30px",fontWeight:"600"}}>Punjabi Songs</h1>
    <div className={styles.somei}>
    {Punjabidata.map((t,ind)=><Homecard key={ind}  data={t}/>)}
    </div>
    
    </div>
    </>
  )
}

export default Home