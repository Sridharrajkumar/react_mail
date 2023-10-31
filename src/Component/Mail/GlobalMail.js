import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { MailActions } from '../../Store/Mailreducer';

const GlobalMail = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchFun = async () => {
            
            const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail.json`);
            if (!response.ok) throw new Error('HTTP error! status: ${response.status}');
            const data = await response.json();

            if (data)
            {
                const emailArray = Object.keys(data).map((key) => ({
                    ...data[key], id: key,
                    
                }));
                emailArray.map((mail) => {
                    dispatch(MailActions.addMail(mail));
                })
            }

            // console.log('api', apimails);
            // setMails(mail);
            // dispatch(MailActions.addMail(data[key]));
           // console.log(mail);
        }
        fetchFun()
        
    },[dispatch])

 
}

export default GlobalMail