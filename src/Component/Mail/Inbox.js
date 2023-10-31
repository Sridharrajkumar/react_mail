import React, { useEffect } from 'react'
import { Card, CardBody, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { MailActions } from '../../Store/Mailreducer';
import { FaRegSquare, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const Inbox = () => {

    const user = useSelector(state => state.Auth.userId);
    // const [mails, setMails] = useState([]);
    const dispatch = useDispatch();
    const mail = useSelector((state) => state.Mail.mails);

    const DeleteHandler = async(id) => {
        
        const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail/${id}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('something wrong while deleting the mail');
        dispatch(MailActions.removeMail(id));
    }

    const filterMail = mail.filter(mail => mail.to === user);
    
  return (
      <div>
          <Card>
              <CardBody>
                <ul>
                {filterMail.map((item, index) => (
                    <li key={index} className='d-flex justify-content-between'  style={{ marginLeft: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1,borderBottom:'1px solid black', marginTop:'6px' }}>
                        <Nav.Link as={NavLink} to={`/message/${item.id}`} className='d-flex justify-content-between'> 
                            <FaRegSquare style={item.read ? {} : {color:'blue', background:'blue',text:'bold'}}/>
                            <h6 style={{ width: "14rem", marginLeft: "1rem" }}>From: {item.from}</h6>
                            <h6 style={{ marginLeft: "8rem", fontSize: "1.2rem" }}>{item.title}</h6>
                            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}> {item.message}</p>
                        </Nav.Link>
                            <button onClick={() => DeleteHandler(item.id)}><FaTrash /></button>
                        
                        
                    </li>
                    ))}
                </ul>
              </CardBody>
          </Card>
     </div>
  )
}

export default Inbox

