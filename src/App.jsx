import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Indexi from './Indexi'
import LocalStorage from './LocalStorage/LocalStorage'



const App = () => {
  return (
    <>
      <BrowserRouter>
      {/* <LocalStorage> */}

          <Indexi/>  
      {/* </LocalStorage> */}
      </BrowserRouter>
    </>
  )
}

export default App