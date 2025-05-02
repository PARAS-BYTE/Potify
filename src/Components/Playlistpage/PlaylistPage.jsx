import React from 'react'
import styles from './Playlistpage.module.css'
import HomeCard from '../Home/HomeCard/Homecard'

import { useLocation } from 'react-router-dom'
const PlaylistPage = ({some}) => {
    const {state}=useLocation()
    const data=state.data
  return (
    <>

        <div className={styles.some}>
            <div className={styles.somie}>
                    {data.map((t,ind)=><HomeCard key={ind} data={t} />)}
            </div>
        </div>
    </>
  )
}

export default PlaylistPage