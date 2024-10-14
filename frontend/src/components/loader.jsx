import React from 'react'
import './loader.css'
const Spinner = () => {
  return (
    <div className='spinner_container'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>    
  )
}

export default Spinner