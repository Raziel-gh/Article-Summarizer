import React from 'react'
import Description from './components/Description'
import Demo from './components/Demo'

import './App.css'
const App = () => {
  return (
    <main className=''>
        <div className='main'></div>
        <div className="w-full gradient main"></div>

        <div className="app">
            <Description/>
            <Demo/>
        </div>
    </main>
  )
}

export default App

