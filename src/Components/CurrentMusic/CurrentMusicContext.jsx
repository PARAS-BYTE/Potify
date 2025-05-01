import React, { createContext, useEffect, useState } from 'react'

const Musiccontext=createContext()


const CurrentMusicContext = ({children}) => {
    const [data,setdata]=useState({
        artist : "Sonu Nigam",
        name :"Kamal hasn",
        url : "https://aac.saavncdn.com/183/b74301ad9d1adfcfb4ec2fc325547dad_320.mp4",
        img: "https://images.pexels.com/photos/31306499/pexels-photo-31306499/free-photo-of-cozy-dining-room-with-vintage-map-decor.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    })

    function changedata(url,img,artist,name){
        console.log(name,url,img,name)
        setdata({
            url : url,
            img : img,
            artist :artist,
            name :name,
        })
    }


    const [fav,setfav]=useState([])
    const [prev, setprev] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem("prev")){
            const data=JSON.parse(localStorage.getItem("prev"))
            setprev(data)
        }
        if(localStorage.getItem("fav")){
            const data=JSON.parse(localStorage.getItem("fav"))
            setfav(data)
        }
    },[])
    const addprev=(data)=>{

        
        // Check if already exists in fav (assumes data has a unique 'id' field)
        const exists = prev.some(item => item.img === data.img);
      
        if (exists) {
          console.log("Already exists");
          return;
        }
    
        // Add new item and update state and localStorage
        const newdata = [data,...prev];
        setprev(newdata);
        localStorage.setItem("prev", JSON.stringify(prev));
    }
    const clearfav=()=>{
        localStorage.setItem("fav",[])
        setfav([])
    }
    const clearprev=()=>{
        localStorage.setItem("prev",[])
        setprev([])
    }
    const addfav = (data) => {
        console.log(data);
      
        // Check if already exists in fav (assumes data has a unique 'id' field)
        const exists = fav.some(item => item.img === data.img);
      
        if (exists) {
          console.log("Already exists");
          return;
        }
      
        // Add new item and update state and localStorage
        const newdata = [...fav, data];
        setfav(newdata);
        localStorage.setItem("fav", JSON.stringify(newdata));
        console.log(prev)
      };
      
      
      
      
  return (
    <>

        <Musiccontext.Provider value={{data,changedata,fav,addfav,prev,addprev,clearfav,clearprev}}>
            {children}
        </Musiccontext.Provider>

    </>
  )
}

export default CurrentMusicContext
export {Musiccontext}