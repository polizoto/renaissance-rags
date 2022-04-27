import React from 'react';
import RenaissanceFaire from "../assets/Renaissance-Faire.jpg"

const IntroPage = () => {
  return (
    <div>
        <h1>Well met! And Welcome to Renaissance Rags!</h1>
        <h2>This website is for those who are enthusiastic about not just the renaissance faire, but dressing up for it too!</h2>
        <img className="home-image" src={RenaissanceFaire} alt='A renaissance faire' />
    </div>
      );
    };

export default IntroPage;
