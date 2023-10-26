
import Sign from './Component/Log/Sign';
import MNav from './Component/Nav/MNav';
import { Routes, Route } from 'react-router-dom';
import Home from './Component/Pages/Home';
import Compose from './Component/Mail/Compose';
import { useSelector } from 'react-redux';
import SideNav from './Component/Nav/SideNav';
import Inbox from './Component/Mail/Inbox';

function App() {

  const loggedIn = useSelector(state => state.Auth.isLogged);


  return (
    <div>
      <MNav />
      {loggedIn && <SideNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        { !loggedIn && <Route path="/sign" element={<Sign />} />}
        {loggedIn && <Route path='/Compose' element={<Compose />} />}
        {loggedIn && <Route path='/inbox' element={<Inbox />} />}
        {!loggedIn && <Route path='*' element={<Sign />}/>}
      </Routes>
      
    </div>
  );
}

export default App;
