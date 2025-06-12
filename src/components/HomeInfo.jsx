import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const InfoBox = ({ header, text, link, btnText, showSocials }) => (
  <div className='info-box text-center'>
    <h1 className='text-2xl font-bold'>{header}</h1>
    <h2 className='text-l font-medium '>{text}</h2>
    
    {link && btnText && (
      link.startsWith('http') ? (
        <a href={link} className='btn' target='_blank' rel='noopener noreferrer'>
          {btnText}
        </a>
      ) : (
        <NavLink to={link} className='btn'>
          {btnText}
        </NavLink>
      )
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
  0: <InfoBox header="WELCOME TO FREDDYTOWN" text="Scroll through to explore highlights of my journey as a developer—projects, skills, and a love for learning."/>,

  1: <InfoBox header="" text="My software development journey began at Melbourne High School, where I first discovered the joy of building with code."/>,

  2: <InfoBox header="" text="From simple scripts to full-stack web apps, my passion for tech has grown through curiosity, hands-on projects, and continuous learning."/>,

  3: <InfoBox header="" text="I earned my BSc in Computing & Software Systems at the University of Melbourne, where I built everything from solo projects to real-world client systems."/>,

  4: <InfoBox 
        header="STARMAP" 
        text="My first solo full-stack app: users create & showcase custom constellations on their personal night skies. Built with the MERN stack." 
        link="https://github.com/Freddynnn/StarMap" 
        btnText="Check it out here!" 
     />,

  5: <InfoBox 
        header="You Dropped This, Human (YDTH)" 
        text="A multiplayer beach-cleaning 3D Unity game made for fun—and impact! Developed in a team and published on GitHub." 
        link="https://github.com/joxanna/metal-detecting" 
        btnText="Check it out here!" 
     />,

  6: <InfoBox 
        header="SCprojector" 
        text="A fantasy football browser extension with 1,000+ users. Built independently with live price projections, GitHub Actions CI/CD & automated scraping." 
        link="https://github.com/Freddynnn/SCprojector" 
        btnText="Check it out here!" 
     />,

  7: <InfoBox 
        text="Thanks for stopping by! I'm always building something new — let's chat about future projects, roles, or collaboration opportunities." 
        link="/contact" 
        btnText="Contact Me" 
     />,
};


const HomeInfo = ({ currentStage }) => {
    console.log('currentStage: ', currentStage);
    return renderContent[currentStage] || null;
};

export default HomeInfo;
