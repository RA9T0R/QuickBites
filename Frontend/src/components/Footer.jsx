import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
      <footer className='my-10 mt-40 text-sm'>
        <hr />
        <p className='py-5 text-sm text-center text-Text'>Copyright &copy; {year} - All rights reserved</p>
      </footer>
  )
}

export default Footer
