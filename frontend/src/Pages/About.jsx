import React from 'react'
import { assets } from '../assets/assets'
import "./About.css"
const About = () => {
  return (
    <div className="p-6">
      <div className="mb-4 text-center">
        <p className="about-title hover:underline transition-all">About <span>Us</span></p>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <img src={assets.about_image} alt="Medscription" className="about-img hover:scale-105 transition-all max-w-sm mr-8 mb-4 md:mb-0"/>
        <div>
          <p className="about-text">Medscription is a streamlined online platform designed to simplify access to healthcare services and enhance patient convenience. This user-friendly website offers a seamless interface for scheduling appointments with a wide range of healthcare professionals. Whether you need a consultation with a general practitioner or a specialist, Medscription makes it easy to find the right doctor and book an appointment at a time that suits you. The platform is committed to ensuring that patients can access medical services quickly and efficiently, making healthcare more accessible than ever.</p>
          <p className="about-text">With Medscription, users can browse doctor profiles, check available times, and schedule appointments with just a few clicks, eliminating the need to wait in long lines or navigate complicated scheduling systems. The website also provides detailed information about each doctor's qualifications, areas of expertise, and patient reviews, helping users make informed decisions about their healthcare.</p>
          <b className="about-vision">Our Vision</b>
          <p className="about-text">The vision of Medscription is to transform healthcare accessibility by leveraging technology to provide a seamless, secure, and efficient platform that connects patients directly with healthcare providers. Medscription aims to eliminate barriers to healthcare such as geographic limitations and scheduling difficulties, making it easier for everyone to get timely medical attention. By enhancing the convenience of accessing health services, Medscription aspires to contribute to a healthier, more empowered population where quality medical care is just a click away.</p>
        </div>
      </div>
    </div>
  )
}

export default About
