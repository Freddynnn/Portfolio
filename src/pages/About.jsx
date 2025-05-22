import React from 'react'
import Skills from '../constants/index'

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hey, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Freddy</span>
      </h1>

      <div className='mt-3 flex flex-col gap-3 text-slate-500'>
        <p>
          Software Engineer based in Sydney, 
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'> My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {Skills.map((skill) => (
            <div className='block-container w-20 h-20'>
              <div className='btn-back rounded-xl'/>
              <div className=' btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alr={skill.name}
                  className="w-1/2 h-1/2 object contain"
                />
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  )
}

export default About