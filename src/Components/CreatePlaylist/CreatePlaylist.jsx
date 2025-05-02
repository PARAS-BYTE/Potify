import React, { useContext } from 'react'

import styles from './CreatePlaylist.module.css'
import { Musiccontext } from '../CurrentMusic/CurrentMusicContext'
import HomeCard from '../Home/HomeCard/Homecard'
const CreatePlaylist = () => {
    const {prev,clearprev}=useContext(Musiccontext)
    
  return (
    <>
    <div className={styles.some}>
     < div className={styles.somie} >
            {prev.map((t,ind)=><HomeCard  key={ind} data={t}/>)}

        </div>
        {
          prev.length ?
          <button onClick={clearprev}  style={{backgroundColor:"rgb(0,0,0.1)",padding:"0.8em 1em",fontSize:"16px",borderRadius:"30px",color:"white",marginTop:"50px"}} >Delete History</button>
           :""
        }
   </div>
    </>
  )
}

export default CreatePlaylist