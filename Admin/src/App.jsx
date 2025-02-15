import {useEffect , useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Menu from './pages/Menu';

const App = () => {

  const [expanded, setExpanded] = useState(true); 

  return (
    <div className='flex bg-Main_BG min-h-screen'>
      <Sidebar expanded={expanded}/>
      <div className='flex-1'>
        <Navbar expanded={expanded} setExpanded={setExpanded}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
