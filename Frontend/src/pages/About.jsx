import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="h-full p-6 mt-5 bg-BG border-t ">
      <div className='w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3 text-Text'>
        <h1><b>About</b> Us</h1>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px]' src={assets.Home} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-Text'>
          <p>
            QuickBites was founded with a simple goal — to make dining easier, faster, and more enjoyable. In a world where time is precious, we believe technology can enhance your restaurant experience without taking away the human touch.
          </p>
          <p>
            From effortless menu browsing to real-time order tracking, we’ve designed QuickBites to bring convenience to both diners and restaurant staff. Whether you're a hungry guest or a hardworking team member, we’ve got your back with smart, seamless tools that just work.
          </p>
          <b className='text-Text'>Our Mission</b>
          <p>At QuickBites, our mission is to revolutionize the way people dine by blending technology with hospitality — making every meal not just a bite, but an experience.</p>
        </div>
      </div>
      <div className='w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3 text-Text'>
        <h1><b>Why</b> Us</h1>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance : </b>
          <p className='text-Text'>We take pride in our commitment to quality assurance, ensuring that our products meet the highest standards of durability, performance, and functionality.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience : </b>
          <p className='text-Text'>We understand the importance of convenience, which is why our products are designed to be user-friendly, easy to use, and accessible to everyone.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Excaptional Customer Service : </b>
          <p className='text-Text'>Our team of dedicated customer service representatives is dedicated to providing exceptional customer service and support, ensuring that you have a smooth and enjoyable shopping experience.</p>
        </div>
      </div>
    </div>
  )
}

export default About
