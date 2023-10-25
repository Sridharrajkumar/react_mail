
import Sign from './Component/Log/Sign';
import MNav from './Component/Nav/MNav';
import { Routes, Route } from 'react-router-dom';
import Home from './Component/Pages/Home';
import Compose from './Component/Mail/Compose';

function App() {
  return (
    <div>
      <MNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
      <Compose />
    </div>
  );
}

export default App;
