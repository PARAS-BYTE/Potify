import React from 'react'
import styles from './Moods.module.css'
import { useLocation } from 'react-router-dom'


const Moods = () => {

    const {state}=useLocation()



  return (
    <>  
    <div className={styles.some}>
        <div className={styles.somie}>

        </div>
    </div>
    </>
  )
}

export default Moods