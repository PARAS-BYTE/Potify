import React, { useEffect, useState } from 'react'

import styles from './Searchpage.module.css'
import { useLocation } from 'react-router-dom'
import HomeCard from '../Home/HomeCard/Homecard'

const Searchpage = ({some}) => {
    const {state}=useLocation()
    const [queries, setqueries] = useState([]);
    const data=state.searchQuery


    // confirm(data)
      

    function adddata(data){
        let arr=[]
        data.forEach((element )=> {
                let downloadurl=element['downloadUrl'][4].url;
                let image=element['image'][2].url
                let name=element['name']
                let artist=element['artists']['primary'][0].name
                let object={
                    url : downloadurl,
                    img :image,
                    name :name,
                    artistname :artist,
                }
                arr.push(object)
            });
            // console.log(arr)
            // console.log(arr)
        setqueries(arr)
        
        
    }
    useEffect(()=>{
        
        fetch(`https://saavn.dev/api/search/songs?query=${data??some}`)
        .then(res=>res.json())
        .then((data)=>{
            if(data.success===true){

               adddata(data.data.results)
            }

        })
    },[data])
  return (
    <>
    <div className={styles.some}>

    <div className={styles.somie}>
    {/* {data} */}
    {queries.map((t,ind)=><HomeCard key={ind} data={t}/>)}
        </div>
    </div>
    </>
  )
}

export default Searchpage