

import React from 'react'
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../Store/AuthReducer';

const Checklogin = () => {

    const dispatch = useDispatch();

    const user = localStorage.getItem('user');
    console.log(user);
    const logIntime = localStorage.getItem('time');
    console.log(logIntime);
    const token = localStorage.getItem('token');
    console.log(token);

   

    if (logIntime && token)
    {
        const expireTime = Number(logIntime) + 30 * 60 * 100;
        if (Date.now() >= expireTime)
        {
            dispatch(AuthActions.logOut());
        }
        else
        {
            dispatch(AuthActions.logIn({token: token,user: user}));
        }
        
    }
}

export default Checklogin