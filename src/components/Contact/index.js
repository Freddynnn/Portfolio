import { Link} from 'react-router-dom';
// import Sidebar from '../Sidebar';
import AnimateLetters from '../AnimatedLetters';
import './index.scss'
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const refForm = useRef();
    
    // useEffect(() => {
    //     return setTimeout(() => {
    //         setLetterClass('text-animate-hover')
    //     }, 3000)
    // }, [])

    useEffect(() => {
        emailjs.init('user_rfAX1yckfaCxrl0by');
      }, []);


    

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
        .sendForm(
            'service_3miy6li',
            'template_cozfzzc',
            refForm.current,
            'rfAX1yckfaCxrl0by'
        )
        .then(
            (response) => {
                console.log('EmailJS Success:', response);
                alert('Message successfully sent!');
                window.location.reload(false);
            },
            (error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send message, please try again');
            }
        );


    }

    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                    <AnimateLetters 
                        letterClass={letterClass}
                        strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                        idx={15}
                    />
                   
                </h1>
                <p>
                    I am interested in blah blah 
                </p>
                <p>
                    Find me here:
                </p>

                <div className='contact-form'>
                    <form ref={refForm} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input type='text' name='name' placeholder='Name' required/>
                            </li>
                            <li className='half'>
                                <input type='email' name='email' placeholder='Email' required/>
                            </li>
                            <li>
                                <input type='text' name='subject' placeholder='Subject' required/>
                            </li>
                            <li>
                                <textarea name='message' placeholder='Message' required/>
                            </li>
                            <li>
                                <input type='submit' className='flat-button' value={"SEND"}/>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>

        </div>
    );
}   

export default Contact;