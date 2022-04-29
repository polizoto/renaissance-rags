import React from 'react';
import renaissanceRags from "../assets/renaissance-rags.svg"
import './introPage.css';

const IntroPage = () => {
  return (
<div id="d">
    <div id="e">
      <div>
        <h2 className="greeting">Well met! And Welcome to Renaissance Rags!</h2>
    </div>
    </div>
    <div id="f">
    <div >
        <img className="home-image" src={renaissanceRags} alt='A renaissance faire' />
    </div>
    </div>
    </div>
      );
    };

export default IntroPage;
