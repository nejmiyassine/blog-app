import React from 'react';
import * as Ai from 'react-icons/ai';
import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <h2 className='title'>Medlog</h2>
      <span>
        Made with <Ai.AiFillHeart /> By Medlog.
      </span>
    </footer>
  );
};

export default Footer;
