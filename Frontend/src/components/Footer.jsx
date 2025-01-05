import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <h1 className='uppercase text-xl sm:text-4xl font-extrabold mb-5 w-32'>Quick Bites</h1>
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi cupiditate, ipsam atque magni voluptate rerum omnis, dolor possimus laudantium ipsum amet iste, quod nihil perferendis!
            </p>
        </div>

        <div>
            <p className='uppercase text-xl font-medium mb-5'>company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@foreveryou.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright &copy; {year} - All rights reserved</p>
      </div>

    </div>
  )
}

export default Footer
