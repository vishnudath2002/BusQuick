import React, { useState } from 'react';


const Register = () => {
  
  return (
    <form >
      <input
        type="email"
        placeholder="Email"
        
      />
      <input
        type="text"
        placeholder="Phone"
       
      />
      <input
        type="password"
        placeholder="Password"
      
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
