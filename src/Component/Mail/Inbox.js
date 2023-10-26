import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const Inbox = () => {

    const user = useSelector(state => state.Auth.userId)
    const [mails, setMails] = useState([]);

    useEffect(() => {
        const fetchFun = async () => {
            
            const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail.json`);
            if (!response.ok) throw new Error('HTTP error! status: ${response.status}');
            const data = await response.json();
            let mail = []
            for (let key in data) 
            {
                if (user === data[key].to)
                {
                    mail.push(data[key]);
                }
            }

            setMails(mail);
            console.log(mail);
        }
        fetchFun()
        
    },[user])


  return (
      <div>
          <Card>
              <CardBody>
                <ul>
                {mails.map((item, index) => (
                    <li key={index} className='d-flex justify-content-between ' style={{ borderBottom: '1px solid black' }}>
                        <h6>From: {item.from}</h6>
                        <h6>{item.title}</h6>
                        <h6>{item.message}</h6>
                    </li>
                    ))}
                </ul>
              </CardBody>
          </Card>
     </div>
  )
}

export default Inbox

