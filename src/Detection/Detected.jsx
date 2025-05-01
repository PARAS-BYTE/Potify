import React, { useEffect, useState } from 'react'

import styles from './Detected.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import AllGeneres from '../Components/AllGeneres/AllGeneres'
import HomeCard from '../Components/Home/HomeCard/Homecard'
import Searchpage from '../Components/Searching/Searchpage'

const Detected = () => {

    const [taste,settaste]=useState("neutral")
    const [gen,setgen]=useState("romantic")
    const {state}=useLocation();
    useEffect(()=>{
        settaste(state.searchQuery.toLowerCase())
    },[state])
    useEffect(()=>{
        if(taste=='neutral'){
            setgen("romantic")
        }else if(taste=='angry'){
            setgen("angry")
        }else if(taste=='happy'){
            setgen("chill")
        }else{
            setgen("n")
        }
    },[taste])
    

  return (
    <>
    <div className={styles.some}>
        <div className={styles.somie}>

        {AllGeneres.filter((t)=>t.genre.includes(gen)).map((t,ind)=><HomeCard key={ind} data={t}/>)}

        
        </div>

    <h2 style={{fontSize:"2rem" ,marginLeft:"1.1rem",marginTop :"1.1rem" }} >More Featured</h2>
    </div>
        {<Searchpage data={state.searchQuery}/>} 
    </>
  )
}

export default Detected