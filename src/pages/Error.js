import React from 'react'
import Image from '../assets/static/media/error.svg'

export const Error = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '90vh'}}>
        <img src={Image} style={{maxWidth: '60vh'}}/>
        <h3 className='mt-3'>Not Found 🙄</h3>
    </div>
  )
}
