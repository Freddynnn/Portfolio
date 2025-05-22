import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const InfoBox = ({ header, text, link, btnText, showSocials }) => (
  <div className='info-box text-center'>
    <h1 className='text-2xl font-bold'>{header}</h1>
    <h2 className='text-l font-medium '>{text}</h2>
    
    {link && btnText && (
      <a href={link} className='btn' target='_blank' rel='noopener noreferrer'>
        {btnText}
      </a>
    )}

    {/* {showSocials && (
      <div className='flex justify-center gap-9 mt-3'>
        <a href="mailto:freddy.tnn@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={40} />
        </a>
        <a href="https://www.linkedin.com/in/fredericknn/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={40} />
        </a>
        <a href="https://github.com/Freddynnn" target="_blank" rel="noopener noreferrer">
          <FaGithub size={40} />
        </a>
      </div>
    )} */}
  </div>
);

const renderContent = {
  0: <InfoBox header="WELCOME TO FREDDYTOWN" text="Feel free to grab / scroll to explore town!"/>,
  1: <InfoBox header="" text="my software dev journey got kick-started at Melbourne High school " link="" btnText=""/>,
  2: <InfoBox header="" text="From writing simple scripts at MHS to building full-stack apps today, my software dev journey has always been driven by curiosity and continuous learning." link="" btnText=""/>,
  3: <InfoBox header="" text="I received my BSc (Computing & Software Systems), at the University of Melbourne, throughout which I developed various independent projects:"/>,
  4: <InfoBox header="STARMAP" text="My first solo fullstack Web App - here users design and develop custom constellations and show them off on their own 'night sky' home page" link="https://github.com/Freddynnn/StarMap" btnText="Check it out here!" />,
  5: <InfoBox header="You Dropped This, Human (YDTH)" text="Developing fun continued with this beach cleaning 3D unity game, fitted with Multiplayer to boot! " link="https://github.com/joxanna/metal-detecting" btnText="Check it out here!" />,
  6: <InfoBox header="SCprojector" text="My most recent project: an actively managed Fantasy football price projection web browser extension. Currently sitting at over 1000 concurrent users and growing!" link="https://github.com/Freddynnn/SCprojector" btnText="Check it out here!" />,
  7: <InfoBox text="I'm always tinkering away at something new and looking forward to future endeavours, feel free to reach out  here !!"link="/contact" btnText="Contact Me"/>
};

const HomeInfo = ({ currentStage }) => {
    console.log('currentStage: ', currentStage);
    return renderContent[currentStage] || null;
};

export default HomeInfo;
