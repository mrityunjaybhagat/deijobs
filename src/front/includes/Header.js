import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Nav from './Nav';
const Header = () => {

  return (
    <header>
      <nav className='navbar sticky-top top'>
        <div className='container'>
            <Logo/>
            <div className='justify-content-end'>
                <a className='btn btn-primary me-2  p-2 px-4' href="/login">Login</a>
                <a className='btn btn-primary me-2  p-2 px-4' href="/register">Registration</a>
                <a href="/login">For Empolyers</a>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
