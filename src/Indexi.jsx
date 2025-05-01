import React from 'react'
import { createBrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'
import MyPlaylist from './Components/MyPlaylist/MyPlaylist'
import CreatePlaylist from './Components/CreatePlaylist/CreatePlaylist'
import Favourite from './Components/Favourite/Favourite'
import Player from './Components/Player/Player'
import Searching from './Components/Searching/Searching'
import Home from './Components/Home/Home'
import CurrentMusicContext from './Components/CurrentMusic/CurrentMusicContext'
import Searchpage from './Components/Searching/Searchpage'
import PlaylistPage from './Components/Playlistpage/PlaylistPage'
import MoodDetector from './Detection/MoodDetector'
import Detected from './Detection/Detected'
import DummyFooter from './DummyFooter'
// import LocalStorage from './LocalStorage/LocalStorage'




const Indexi = () => {
    return (
        <>

            <Header />
            <Navbar />
            

                <CurrentMusicContext>


                    <Routes>
                        <Route path='/myplaylist' element={<MyPlaylist />}  ></Route>
                        <Route path='/createplaylist' element={<CreatePlaylist />}  ></Route>
                        <Route path='/favorite' element={<Favourite />}  ></Route>
                        <Route path='/playlistpage' element={<PlaylistPage />}></Route>
                        <Route path='/search' element={<Searchpage />}></Route>
                        <Route path='/home' element={<Home />}></Route>
                        <Route path='/detected' element={<Detected/>}></Route>
                        <Route path='/mood' element={<MoodDetector />}></Route>
                        <Route path='' element={<Home/>}></Route>
                    </Routes>
                    <Player audioSrc={"https://aac.saavncdn.com/183/b74301ad9d1adfcfb4ec2fc325547dad_320.mp4"} />

                </CurrentMusicContext>
            <DummyFooter/>
        </>
    )
}

export default Indexi