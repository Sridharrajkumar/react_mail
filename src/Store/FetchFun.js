import { MailActions } from "./Mailreducer";



export const Postmail = (url,Data) => {
    return async(dispatch) => {
        
        const postRequest = async () => {
            const response = await fetch(`${url}`, {
                method: 'POST',
                body: JSON.stringify(Data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error("Sending Data Failed");
            }
        };
        try {
            await postRequest();
        }
        catch (error)
        {
            console.log(error);
        }
    }
}

export const GetMails = (url,user) => {

    return async(dispatch) => {
        
        const GetRequest = async () => {
            
            const response = await fetch(`${url}`);

            if (!response.ok) {
                throw new Error("Sending Data Failed");
            }

            const data = await response.json();
            let emailArray;

            if (data)
            {
                emailArray = Object.keys(data).map((key) => ({ 
                    ...data[key], id: key,
                }));
            }
            return emailArray;
        };
        try {
            const datamail = await GetRequest();
             
            console.log(datamail);
            datamail.map((mail) => {
                dispatch(MailActions.addMail(mail)); //adding dato to the globalstate getting from api
                if (mail.read === false && mail.to === user) {
                    dispatch(MailActions.totalAdd()); //calculationg the unread message
                }
            });
            
        }
        catch (error)
        {
            console.log(error);
        }

    }
   
}

export const PutMails = (url,mail) => {
    
    return async (dispatch) => { 
        const PutRequest = async () => {
            
            const response = await fetch(`${url}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...mail, read: true })
            })
            if (!response.ok) {
                throw new Error('Updating Mail Failed');
            }
            const updatedMail = await response.json();

        }
        try {
            await PutRequest();
        }
        catch (error)
        {
            console.log(error);
        }
        
    }
   
}

export const DeleteMails = (url, id) => {

    return async (dispatch) => {
        const DelRequest = async () => {
            const response = await fetch(`${url}/${id}.json`, { method: "DELETE" });
        }
        try {
            const data = await DelRequest();
        }
        catch (err) {
            console.log(err);
        }
        
    };

}

export const RerenderedMail = (url,user) => {

    return async(dispatch) => {
        
        const GetRequest = async () => {
            
            const response = await fetch(`${url}`);

            if (!response.ok) {
                throw new Error("Sending Data Failed");
            }

            const data = await response.json();
            let emailArray;

            if (data)
            {
                emailArray = Object.keys(data).map((key) => ({ 
                    ...data[key], id: key,
                }));
            }
            return emailArray;
        };
        try {
            const datamail = await GetRequest();
             
            console.log(datamail);
            datamail.map((mail) => {
                dispatch(MailActions.renderedMail(mail)); //adding dato to the globalstate getting from api
                if (mail.read === false && mail.to !== user) {
                    dispatch(MailActions.renderedMail()); //calculationg the unread message
                }
            });
            
        }
        catch (error)
        {
            console.log(error);
        }

    }
   
}
    
