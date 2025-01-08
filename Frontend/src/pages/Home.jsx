import React,{useState} from 'react'
import Hero from '../components/Hero'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay';
import Footer from '../components/Footer'

const Home = () => {
  const [category,setCategory] = useState('All');

  return (
    <div className='mt-0 sm:mt-2 md:mt-3 lg:mt-5'>
      <Hero category={category}/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <Footer/>
    </div>
  )
}

export default Home
