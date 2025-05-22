import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const[form, setForm] = useState({name: '', email: '', message: ''});
  const [isLoading, setisLoading] = useState(false);

  const {alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        to_name: 'Freddy',
        email: form.email,
        to_email: 'freddy.tnn@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() =>{
      setisLoading(false);
      showAlert({show: true, text: 'Message sent successfully', type: 'success'});
      setForm({name: '', email: '', message: ''});
      
      setTimeout(() => {
        hideAlert();
      }, [3000]);

    }).catch((error) => {
      setisLoading(false);
      console.log(error);
      showAlert({show: true, text: 'Message not sent', type: 'danger'});
    })
  };

  const handleFocus = () => {};
  const handleBlur = () => {};

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert}/>}

      <div className='flex-1 min-w-50% flex flex-col' >
        <h1 className="head-text">Get in Touch</h1>
        
        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='John'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='John@example.com.au'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='text-black-500 font-semibold'>
            Message
            <textarea
              name='message'
              rows={4}
              className='textarea'
              placeholder='Let me know how I can help you!'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            disabled={isLoading}
            type='submit'
            className='btn'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact