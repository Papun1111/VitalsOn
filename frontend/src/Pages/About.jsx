import React from 'react';
import { assets } from '../assets/assets';
import "./About.css";

const About = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="text-3xl font-semibold transition-all hover:underline hover:text-rose-500">
          About <span className="text-rose-500">Us</span>
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center mb-10">
        <img
          src={assets.about_image}
          alt="VitalsOn"
          className="w-full md:max-w-sm hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8"
        />
        <div>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-bold">VitalsOn</span> is a streamlined online platform designed to simplify access to
            healthcare services and enhance patient convenience. This user-friendly website offers a seamless interface
            for scheduling appointments with a wide range of healthcare professionals. Whether you need a consultation
            with a general practitioner or a specialist, VitalsOn makes it easy to find the right doctor and book an
            appointment at a time that suits you. The platform is committed to ensuring that patients can access medical
            services quickly and efficiently, making healthcare more accessible than ever.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            With <span className="font-bold">VitalsOn</span>, users can browse doctor profiles, check available times,
            and schedule appointments with just a few clicks, eliminating the need to wait in long lines or navigate
            complicated scheduling systems. The website also provides detailed information about each doctor’s
            qualifications, areas of expertise, and patient reviews, helping users make informed decisions about their
            healthcare.
          </p>

          <b className="block text-lg text-rose-600 font-semibold my-4">
            Our Vision
          </b>
          <p className="text-gray-700 leading-relaxed">
            The vision of <span className="font-bold">VitalsOn</span> is to transform healthcare accessibility by
            leveraging technology to provide a seamless, secure, and efficient platform that connects patients directly
            with healthcare providers. VitalsOn aims to eliminate barriers to healthcare such as geographic limitations
            and scheduling difficulties, making it easier for everyone to get timely medical attention. By enhancing the
            convenience of accessing health services, VitalsOn aspires to contribute to a healthier, more empowered
            population where quality medical care is just a click away.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl mb-6">
        <p className="font-semibold">
          Why <span className="text-rose-500">Choose Us</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {/* Efficiency */}
        <div className="p-4 border border-rose-100 rounded-md bg-rose-50 hover:shadow-md hover:scale-105 transition-transform">
          <b className="font-bold text-rose-600">Efficiency</b>
          <p className="text-gray-700 leading-relaxed mt-2">
            Efficiency in the context of <span className="font-bold">VitalsOn</span> refers to the platform's ability to
            streamline the process of accessing healthcare services, significantly reducing the time and effort required
            for patients to connect with healthcare providers. This is achieved through an intuitive interface that
            simplifies the appointment booking process, allowing patients to find and schedule consultations with
            doctors in just a few clicks.
          </p>
        </div>

        {/* Convenience */}
        <div className="p-4 border border-rose-100 rounded-md bg-rose-50 hover:shadow-md hover:scale-105 transition-transform">
          <b className="font-bold text-rose-600">Convenience</b>
          <p className="text-gray-700 leading-relaxed mt-2">
            <span className="font-bold">VitalsOn</span> is designed to maximize convenience for its users, transforming
            the way patients access healthcare services. The platform allows users to manage their healthcare needs from
            the comfort of their homes or while on the go, using any device with internet access. This accessibility is
            crucial for those who may have mobility challenges, limited access to transportation, or tight schedules.
          </p>
        </div>

        {/* Personalization */}
        <div className="p-4 border border-rose-100 rounded-md bg-rose-50 hover:shadow-md hover:scale-105 transition-transform">
          <b className="font-bold text-rose-600">Personalization</b>
          <p className="text-gray-700 leading-relaxed mt-2">
            <span className="font-bold">VitalsOn</span> emphasizes personalization to enhance the healthcare experience
            for each user. The platform tailors its services to meet the unique needs and preferences of individual
            patients, ensuring that their healthcare journey is both effective and satisfying.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
