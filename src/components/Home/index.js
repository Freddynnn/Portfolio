import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Logo from './Logo'
import './index.scss'
import AnimateLetters from '../AnimatedLetters';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [line1Array, setLine1Array] = useState([]);
    const [line2Array, setLine2Array] = useState([]);
    const [line3Array, setLine3Array] = useState([]);

    const convertStringToArray = (str) => {
        return str.split('');
    };

    useEffect(() => {
        // Example usage of the function
        const line1 = 'Hi, my name is';
        const line2 = 'Frederick (Freddy)';
        const line3 = 'Noronha-Nehrmann';

        setLine1Array(convertStringToArray(line1));
        setLine2Array(convertStringToArray(line2));
        setLine3Array(convertStringToArray(line3));
    }, []);
    
    return (
        <div className='container home-page'>
            <div className='text-zone'>
                <h1> 
                    <AnimateLetters 
                        letterClass={letterClass}
                        strArray={line1Array}
                        idx = {12}
                    />
                    <br/> 
                    <AnimateLetters 
                        letterClass={letterClass}
                        strArray={line2Array}
                        idx = {26}
                    />
                    <br/> 
                    <AnimateLetters 
                        letterClass={letterClass}
                        strArray={line3Array}
                        idx = {44}
                    />
                </h1>

                <h2>
                Unimelb Graduate - BsC (Computing and Software Systems) 
                </h2>
                <Link to="/contact" className='flat-button'> CONTACT ME </Link>

            </div>

            {/* <div className = 'pfp'>
                <img src={} alt='home'/>
            </div> */}

            {/* <Logo></Logo> */}



        </div>
    );
}   

export default Home;