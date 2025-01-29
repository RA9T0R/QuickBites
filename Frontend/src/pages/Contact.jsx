import React from 'react'
import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div  className="h-full p-6 mt-5 bg-BG border-t">
      <div className='w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3 text-Text'>
        <h1><b>Contact</b> Us</h1>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.Home} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-Text/60'>Our Store</p>
          <p className='text-Text'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className='text-Text'>Tel : (415) 555-5555 <br />Email : Dummy@forever.com</p>
          <p className='font-semibold text-xl text-Text/60'>Careers at Forever</p>
          <p className='text-Text'>Learn more about our teams and job openings.</p>
          <button className='border border-Text px-8 py-4 text-sm hover:bg-Button hover:text-white transition-all duration-500 text-Text'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
