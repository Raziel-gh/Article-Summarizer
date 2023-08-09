import React from 'react'
import {logo} from '../assets'
const Description = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-5'>
            <img src={logo} alt='proj-logo' className='w-28 pt-6 object-contain ease-in-out duration-300 hover:scale-110 pb-6'/><br/><br/>
            
            <button type='button' className='black_btn'  onClick={()=>{
                window.open('https://github.com/Raziel-gh')
            }}>Source</button>
        </nav>
        <h1 className='red_gradient head_text'>Welcome to the summarizer!</h1>
        <h2 className='desc to-amber-300'>An demonstration of accessing APIs in react js by using Rapid API to handle article summarisation through Open AI</h2>
    </header>
  )
}

export default Description