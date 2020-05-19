import React from 'react';
// import logo from './logo.svg';
import 'tachyons';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Form from './components/Form/Form';

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
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const onFormUpdate = (event,type) => {
    switch(type) {
      case 'name':
        setUserName(event.target.value);
        break;
      case 'email':
       setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        // code block
    }
    // console.log(event.target.value,type);
    // console.log(userName,email,password);
  }

  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesParams} 
      />
      <SetupNav currentRoute={route} onRouteChange={onRouteChange} />
      <Logo />
      <Form route={route} onFormUpdate={onFormUpdate} />
    </div>
  );
}

const SetupNav = ({currentRoute,onRouteChange}) => {
  if(currentRoute==='SignOut') 
  {  
    return (
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
            <Navigation onRouteChange={onRouteChange} route='Register'>Register</Navigation>
            <Navigation onRouteChange={onRouteChange} route='SignIn'>Sign in</Navigation>
          </nav>);
  }
  else
  {
    return (
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
            <Navigation onRouteChange={onRouteChange} route='SignOut'>Sign out</Navigation>
          </nav>);
  }
}

export default App;
