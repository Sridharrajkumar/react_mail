import React, { useEffect } from 'react'
import { Card, CardBody, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { MailActions } from '../../Store/Mailreducer';
import { FaRegSquare, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { DeleteMails, RerenderedMail } from '../../Store/FetchFun';


const Inbox = () => {

    const user = useSelector(state => state.Auth.userId);
    // const [mails, setMails] = useState([]);
    const dispatch = useDispatch();
    const mail = useSelector((state) => state.Mail.mails);
    const url = 'https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail.json';
    //console.log(mail);
    const DeleteHandler = async(id) => {
        
        dispatch(DeleteMails(url, id));

    }
    //console.log(mail);


    // useEffect(() => {
    //     if (initialval)
    //     {
    //         initialval = false;
    //         return;
    //     }
    //     dispatch(RerenderedMail(url,user));
    // },[])

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
                            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1, marginLeft:'4px'}}> {item.message}</p>
                        </Nav.Link>
                            <button onClick={() => DeleteHandler(item.id)} style={{border: 0 }}><FaTrash /></button>
                        
                        
                    </li>
                    ))}
                </ul>
              </CardBody>
          </Card>
     </div>
  )
}

export default Inbox

