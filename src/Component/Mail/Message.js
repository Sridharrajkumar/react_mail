import React, { useEffect } from 'react'
import { Button, Card, CardBody, CardFooter, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { MailActions } from '../../Store/Mailreducer';

const Message = () => {

  const params = useParams();
  const emails = useSelector(state => state.Mail.mails);
  const mail = emails.find((email) => email.id === params.indexId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CloseHandler = () => {
    navigate('/inbox', { replace: true });
  }

  const DeleteHandler = async (id) => {
    
    const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail/${id}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    if (!response.ok) throw new Error('something wrong while deleting the mail');
    console.log(id);
    dispatch(MailActions.removeMail(id));
    navigate('/inbox', { replace: true });
  }

  useEffect(() => {
    if (mail)
    {
      const fetchFun = async () => {
        const updatemail = { ...mail, read: true };
        dispatch(MailActions.settotal());
      const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail/${params.indexId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatemail),
      });
      if (response.ok)
      {
        console.log('updated');
      }
    }
    
       fetchFun();
     }

  }, [params.indexId]);

  
  console.log(mail);

  if (!mail) {
    return <p>Something went wrong while loading email with ID {params.inboxId}</p>;
  }

  return (
    <div style={{marginTop:'6px'}}>
        <Card style={{ width: '80vw',margin:"auto",height:'80vh',backgroundColor:'#c7f9cc' }}>
          <CardBody className='mt-2'>
            <div className='mt-2 ' style={{borderBottom:'1px solid black'}}>
            <b>Mail:  </b>
            <br />
            <span style={{margin:'2rem' }}>
              {mail.from}
            </span>
            </div>
            <div className='mt-2' style={{borderBottom:'1px solid black'}}>
            <b>Subject:  </b>
            <br />
             <span className='mr-4' style={{margin:'2rem' }}>
                      {mail.title}
                 </span>
            </div>
            <div>
              <p>
                <b>Content:  </b>
                <br />
                <span style={{ whiteSpace: 'pre-line', paddingLeft: '10px' }}>
                  {mail.message}
                 </span>
               </p>
            </div>
        </CardBody>
        <CardFooter style={{display:'flex', justifyContent:'center' ,gap :'12px'}}>
          <Button className='btn btn-success' onClick={CloseHandler}>Close</Button>
          <Button className='btn btn-danger' onClick={() => DeleteHandler(mail.id)}>Delete</Button>
        </CardFooter>
        </Card>
    </div>
  )
}

export default Message

