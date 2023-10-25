
import Sign from './Component/Log/Sign';
import MNav from './Component/Nav/MNav';
import { Routes, Route } from 'react-router-dom';
import Home from './Component/Pages/Home';

function App() {
  return (
    <div>
       <MNav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
       </Routes>
    </div>
  );
}

export default App;
