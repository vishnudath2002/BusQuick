import React from 'react';
import Search from '../components/Search';
import Navbar from '../components/Navbar';

const Home = () => {

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Bus Booking App</h1>
      <Search />
    </div>
  );
  
};

export default Home;
