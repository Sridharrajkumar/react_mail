import React, { useState , useEffect} from 'react'
import { Card, CardBody } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Send = () => {
    const user = useSelector(state => state.Auth.userId);
    const [mails, setMails] = useState([]);

    useEffect(() => {
        const fetchFun = async () => {
            
            const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail.json`);
            if (!response.ok) throw new Error('HTTP error! status: ${response.status}');
            const data = await response.json();
            let mail = []
            for (let key in data) 
            {
                if (user === data[key].from)
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
          <Card>
              <CardBody>
                <ul>
                {mails.map((item, index) => (
                    <li key={index} className='d-flex justify-content-between ' style={{ borderBottom: '1px solid black' }}>
                        <h6>to: {item.to}</h6>
                        <h6>{item.title}</h6>
                        <h6>{item.message}</h6>
                    </li>
                    ))}
                </ul>
              </CardBody>
          </Card>
  )
}

export default Send