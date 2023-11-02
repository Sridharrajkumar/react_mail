import React from 'react'
import { Card, CardBody, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Send = () => {
    const user = useSelector(state => state.Auth.userId);
    const mails = useSelector(state => state.Mail.mails);
   // console.log(user);
    //console.log(mails);

    const filteredMail = mails.filter((item) => item.from === user);

    //console.log(filteredMail);


  return (
          <Card>
              <CardBody>
                <ul>
                {filteredMail.map((item, index) => (
                    
                    <li key={index} style={{ borderBottom: '1px solid black' }}>
                        <Nav.Link as={NavLink} to={`/message/${item.id}`} className='d-flex justify-content-between ' >
                            <h6>to: {item.to}</h6>
                            <h6>{item.title}</h6>
                            <h6>{item.message}</h6>
                        </Nav.Link>
                    </li>
                ))}
                </ul>
              </CardBody>
          </Card>
  )
}

export default Send

