import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Loginpage from './pages/Loginpage';
import Search from './components/Search';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes> 
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
