import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MailActions } from '../../Store/Mailreducer';

const GlobalMail = () => {

    const dispatch = useDispatch();
   // const mails = useSelector(state => state.Mail.mails);
    const user = useSelector(state => state.Auth.userId);

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
                    if (mail.read===false && mail.to === user) {
                        dispatch(MailActions.totalAdd());
                    }
                    
                })
            }

            // console.log('api', apimails);
            // setMails(mail);
            // dispatch(MailActions.addMail(data[key]));
           // console.log(mail);
        }
        fetchFun()

        //console.log(mails);
        console.log(user);
        

        
       // console.log(filterMail);

        
        
    },[dispatch])

 
}

export default GlobalMail

