import React, { useRef, useState } from 'react'
import {  Card } from 'react-bootstrap/esm'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Sign = () => {

    const emailRef = useRef();
    const passRef = useRef();
    const conpass = useRef();
    const [err, setErr] = useState();
    const [loggedIn, setloggedIn] = useState(true);
    const navigate = useNavigate();

    const SwitchHandler = () => {
        setloggedIn(!loggedIn);
    }

    const SubmitHandler = async(e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const pass = emailRef.current.value;

        if (!loggedIn)
        {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvI-OxZJbIkxD064VcM_H2ESoyrmb2iUM', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    returnSecureToken: true
                })
            })
            const data = await response.json();
            if (response.ok) {
                console.log('user signup successfully');
                emailRef.current.value = null;
                passRef.current.value = null;
                conpass.current.value = null;
            }
            else {
                if (data.error) {
                    setErr(data.error.message)
                }
            }
        }
        else
        {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvI-OxZJbIkxD064VcM_H2ESoyrmb2iUM', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    returnSecureToken: true
                })
            })

            const data = await response.json();

            if (response.ok)
            {
                emailRef.current.value = null;
                passRef.current.value = null;
                localStorage.setItem('userToken', data.idToken);
                navigate('/', { replace: true });
            }
            else
            {
                if (data.error)
                {
                    setErr(data.error.message)
                }
            }
        }

        
    }


  return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Card style={{ width: '480px',height:'auto'}}>
              <Card.Body className='w-100 '>
                  <h2 className='text-center border-bottom pb-2'>{!loggedIn ? 'Sign up' : 'LogIn'}</h2>
                  <form onSubmit={SubmitHandler}>
                      <label>Enter Email</label>
                      <input type="email" id="useremail" className='form-control mb-2' ref={emailRef} required/>
                      <label>Enter Password</label>
                      <input type="password" id="password" className='form-control mb-2' ref={passRef} required/>
                      {!loggedIn && <label>Confirm Password</label>}
                      {!loggedIn &&<input type="text" className='form-control mb-2' required ref={conpass}/>}
                      <h6 style={{ color: 'black', alignText: 'center' }} >{err}</h6>
                      <div className='d-flex flex-column justify-content-center align-items-center'>
                          <button className='btn btn-success'>Submit</button>
                      </div>
                  </form>
              </Card.Body>
          </Card>
          <button className='btn btn-primary mt-2' onClick={SwitchHandler}>
            {loggedIn ? 'Create New Account?Signup' : 'Already have an account?Login'}
           </button>
      </div>
  )
}

export default Sign

