import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={2000}/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>


      </Routes>
      <Footer/>
    </div>
  )
}

export default App
