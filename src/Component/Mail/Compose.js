import React, { useRef, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useSelector } from 'react-redux'


const Compose = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const emailRef = useRef();
  const titleRef = useRef();
  const sender = useSelector(state => state.Auth.userId);


  const submitHandler = async(e) => {
    e.preventDefault()
    console.log('clicked');
    let email = emailRef.current.value;
    let title = titleRef.current.value;
    let mail = email.replace(/[@.]/g, '');
    const message = editorState.getCurrentContent().getPlainText();
    const response = await fetch(`https://react-mail-fa2e5-default-rtdb.firebaseio.com/mail.json`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ 
        from:sender,
        to: email,
        title,
        message
      })  
    });
    if(response.ok)
    {
      alert('mail send to storage');
      emailRef.current.value = null;
      titleRef.current.value = null;
      setEditorState(EditorState.createEmpty()); 
    }
    else {
      alert("Failed");
    }
  }


  return (
      <div >
          <Card className='m-4 mt-6' >
        <Container>
          <form onSubmit={submitHandler}>
              <div class="input-group mt-2 mb-3 border-bottom pb-3">  
                <span class="input-group-text">To</span> 
                <input type="email" class="form-control border-0" placeholder="Email" ref={emailRef} required/>  
             </div>
              <div class="input-group mt-2 mb-3 border-bottom pb-3">  
                <span class="input-group-text">Title</span> 
                <input type="text" class="form-control border-0" placeholder="Enter the Title" ref={titleRef}/> 
              </div>
            <div class="mt-2 mb-3 border-bottom pb-3">
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder='Enter your message here...'
              required />
            </div>   
            <Button type="submit" className='mb-1'>Send</Button>
          </form>
        </Container> 
      </Card>
    </div>
  )
}

export default Compose

