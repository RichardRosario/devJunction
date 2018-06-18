import React from 'react';
import '../../../src/App.css';

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} DevJunction || <a className="privacy" href="/privacy-policy">Privacy and terms of use.</a>
    </footer>
  );
};
