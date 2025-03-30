import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div className="h-full p-6 mt-5 bg-BG border-t">
      <div className='w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3 text-Text'>
        <h1><b>Contact</b> Us</h1>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.Home} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-Text/60'>Our Restaurant</p>
          <p className='text-Text'>01010 Fake.Street <br /> Rama 7, Bangkok, THAI</p>
          <p className='text-Text'>Tel : (123) 456-7890 <br />Email : Dummy@QuickBites.com</p>
          <p className='font-semibold text-xl text-Text/60'>Careers at QuickBites</p>
          <p className='text-Text'>Learn more about our teams and job openings</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
