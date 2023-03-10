import React from 'react';
import './LoginImage.css';
import loginImage from '../../assets/loginImage.png';

function LoginImage() {
  return (
    <div className="outerContainer">
      <img src={loginImage} alt="" srcSet="" />
    </div>
  );
}

export default LoginImage;
