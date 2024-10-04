import React from 'react';
import { assets } from '../assets/assets';
import "./About.css";

const About = () => {
  return (
    <div className="p-6">
      <div className="mb-4 text-center">
        <p className="text-2xl font-semibold hover:underline transition-all">
          About <span className="text-blue-500">Us</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <img src={assets.about_image} alt="Medscription" className="hover:scale-105 transition-all max-w-sm mr-8 mb-4 md:mb-0 rounded-lg shadow-lg"/>
        <div>
          <p className="text-gray-700 leading-relaxed my-2">
            Medscription is a streamlined online platform designed to simplify access to healthcare services and enhance patient convenience. This user-friendly website offers a seamless interface for scheduling appointments with a wide range of healthcare professionals. Whether you need a consultation with a general practitioner or a specialist, Medscription makes it easy to find the right doctor and book an appointment at a time that suits you. The platform is committed to ensuring that patients can access medical services quickly and efficiently, making healthcare more accessible than ever.
          </p>
          <p className="text-gray-700 leading-relaxed my-2">
            With Medscription, users can browse doctor profiles, check available times, and schedule appointments with just a few clicks, eliminating the need to wait in long lines or navigate complicated scheduling systems. The website also provides detailed information about each doctor's qualifications, areas of expertise, and patient reviews, helping users make informed decisions about their healthcare.
          </p>
          <b className="text-lg text-blue-600 font-semibold my-4">Our Vision</b>
          <p className="text-gray-700 leading-relaxed my-2">
            The vision of Medscription is to transform healthcare accessibility by leveraging technology to provide a seamless, secure, and efficient platform that connects patients directly with healthcare providers. Medscription aims to eliminate barriers to healthcare such as geographic limitations and scheduling difficulties, making it easier for everyone to get timely medical attention. By enhancing the convenience of accessing health services, Medscription aspires to contribute to a healthier, more empowered population where quality medical care is just a click away.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>Why <span className="text-blue-500">Choose Us</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20 mr-4'>
        <div>
          <b className="font-bold">Efficiency</b>
          <p className="text-gray-700 leading-relaxed my-2">
            Efficiency in the context of Medscription refers to the platform's ability to streamline the process of accessing healthcare services, significantly reducing the time and effort required for patients to connect with healthcare providers. This is achieved through an intuitive interface that simplifies the appointment booking process, allowing patients to find and schedule consultations with doctors in just a few clicks.
          </p>
        </div>
        <div>
          <b className="font-bold">Convenience</b>
          <p className="text-gray-700 leading-relaxed my-2">
            Medscription is designed to maximize convenience for its users, transforming the way patients access healthcare services. The platform allows users to manage their healthcare needs from the comfort of their homes or while on the go, using any device with internet access. This accessibility is crucial for those who may have mobility challenges, limited access to transportation, or tight schedules.
          </p>
        </div>
        <div>
          <b className="font-bold">Personalization</b>
          <p className="text-gray-700 leading-relaxed my-2">
            Medscription emphasizes personalization to enhance the healthcare experience for each user. The platform tailors its services to meet the unique needs and preferences of individual patients, ensuring that their healthcare journey is both effective and satisfying.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
