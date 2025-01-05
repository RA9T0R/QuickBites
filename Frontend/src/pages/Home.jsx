import React,{useState} from 'react'
import Hero from '../components/Hero'
import ExploreMenu from '../components/ExploreMenu'

const Home = () => {
  const [category,setCategory] = useState('All');

  return (
    <div className='mt-5'>
      <Hero/>
      <ExploreMenu category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home
