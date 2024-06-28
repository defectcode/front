// pages/about.js
import React from 'react';
import Navbar from '../app/components/Header/components/Navbar'

const About = () => {
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          This is the about page. Here you can find information about our company.
        </p>
        {/* Adaugă mai mult conținut aici */}
      </div>
    </div>
  );
};

export default About;
