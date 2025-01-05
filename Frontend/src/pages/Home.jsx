import React,{useState} from 'react'
import Hero from '../components/Hero'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay';

const Home = () => {
  const [category,setCategory] = useState('All');

  return (
    <div className='mt-5'>
      <Hero  category={category}/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
