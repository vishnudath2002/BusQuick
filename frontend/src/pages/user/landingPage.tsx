import React from 'react';
import HeroSection from '../../components/user/landing/HeroSection';
import FeaturesSection from '../../components/user/landing/FeaturesSection';
import Header from '../../components/user/layouts/Header';
import Footer from '../../components/user/layouts/Footer';
//import ContactForm from '../components/Landing/ContactForm';

const LandingPage: React.FC = () => {

  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      {/* <ContactForm /> */}
    </div>
  );
  
};

export default LandingPage;
