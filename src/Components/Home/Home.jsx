import React from 'react'
import Homedata from '../Saved/Homedata'
import Homecard from './HomeCard/Homecard'
import styles from './Home.module.css'
import Saddata from '../Saved/Saddata'
import Punjabidata from '../Saved/Punjabidata'

const Home = () => {
  return (
    <>
    <div className={styles.some}>
    <h1 style={{fontSize:"1.5em",marginLeft:"30px",fontWeight:"600"}}>Suggest Music</h1>

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