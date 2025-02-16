import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';

const App = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-Main_BG min-h-screen">
      <Navbar expanded={expanded} setExpanded={setExpanded} />

      <div className="flex pt-16">
        <Sidebar expanded={expanded} />

        {/* Main Content */}
        <div className={`flex-1 p-4 overflow-auto transition-all duration-300  ${
          expanded ? 'ml-64' : 'ml-24'
        }`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
