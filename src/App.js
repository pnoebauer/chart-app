import React from 'react';
// import logo from './logo.svg';
import 'tachyons';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation';

// https://vincentgarreau.com/particles.js/
const particlesParams = {
  particles: {
    number: {
      value: 30,
      density: {
          enable: true,
          value_area: 800
      }
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
};

function App() {

  const [route, setRoute] = React.useState('SignOut');

  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
    console.log(newRoute);
  };

  var createLogButtons;
  if(route==='SignOut') 
  {  
    createLogButtons = 
      <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
        <Navigation onRouteChange={onRouteChange} route='SignIn' routeName='Register'/>
        <Navigation onRouteChange={onRouteChange} route='SignIn' routeName='Sign in'/>
      </nav>;
  }
  else
  {
    createLogButtons = 
    <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
      <Navigation onRouteChange={onRouteChange} route='SignOut' routeName='Sign out'/>;
    </nav>;
  }

  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesParams} 
      />
      {createLogButtons}
    </div>
  );
}

export default App;
