import React,{useEffect} from 'react';
import Sign from './Component/Log/Sign';
import MNav from './Component/Nav/MNav';
import { Routes, Route } from 'react-router-dom';
import Home from './Component/Pages/Home';
import Compose from './Component/Mail/Compose';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './Component/Nav/SideNav';
import Inbox from './Component/Mail/Inbox';
import Send from './Component/Mail/Send';
import Checklogin from './Component/Log/Checklogin';
import Message from './Component/Mail/Message';
import GlobalMail from './Component/Mail/GlobalMail';
import { GetMails, RerenderedMail } from './Store/FetchFun';
import { MailActions } from './Store/Mailreducer';

let initialval = true;

function App() {

  const loggedIn = useSelector(state => state.Auth.isLogged);
  const user = useSelector(state => state.Auth.userId);
  const url = 'https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail.json';
  const mails = useSelector(state => state.Mail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn)
    {
      dispatch(GetMails(url,user));
      }
  }, [loggedIn]);

  useEffect(() => {
    if (initialval) { 
      initialval = false;
      return;
    }
    dispatch(RerenderedMail(url, user));
  },[user,dispatch])


  return (
    <div>
      {/* { loggedIn && <GlobalMail />} */}
      {!loggedIn && <Checklogin />}
      <MNav />
      {loggedIn && <SideNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        { !loggedIn && <Route path="/sign" element={<Sign />} />}
        {loggedIn && <Route path='/Compose' element={<Compose />} />}
        {loggedIn && <Route path='/inbox' element={<Inbox />} />}
        {loggedIn && <Route path='/send' element={<Send />} />}
        {!loggedIn && <Route path='*' element={<Sign />} />}
        {loggedIn && <Route path='/message/:indexId' element={<Message />} />}
      </Routes>

      
    </div>
  );
}

export default App;

