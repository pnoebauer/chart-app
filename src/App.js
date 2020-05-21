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

var initialState = {
  route: 'SignOut',
  userName: '',
  email: '',
  password: '',
}

function App() {

  const [route, setRoute] = React.useState(initialState.route);
  const [userName, setUserName] = React.useState(initialState.userName);
  const [email, setEmail] = React.useState(initialState.email);
  const [password, setPassword] = React.useState(initialState.password);

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
        console.log('Field type unavailable.')
    } // console.log(userName,email,password);
  }

  const connectBackend = (address, fetchSettings) => {

    fetch(address, fetchSettings)
      .then(returnedObject => returnedObject.json()
        .then(
          data => console.log(data))
      )
    .catch(err => console.log('cannot connect'));
  }

  const onSubmit = (type) => {
    let UrlExtension, method, address;
     UrlExtension = '';
     method = 'get';
     address = `http://localhost:3000/${UrlExtension}`;

    const body = JSON.stringify({
      userName: userName,
      email: email,
      password: password
    });

    const fetchSettings = {
      method: method,
      ...(method!=='get') && {headers: { 'Content-Type': 'application/json' }, body: body}
    };
    
    connectBackend(address,fetchSettings);
  }

  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesParams} 
      />
      <SetupNav currentRoute={route} onRouteChange={onRouteChange} />
      <Logo />
      <Form route={route} onFormUpdate={onFormUpdate} onSubmit={onSubmit}/>
    </div>
  );
}

const SetupNav = ({currentRoute,onRouteChange}) => {
  if(currentRoute==='SignOut') {  
    return (
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
            <Navigation onRouteChange={onRouteChange} route='Register'>Register</Navigation>
            <Navigation onRouteChange={onRouteChange} route='SignIn'>Sign in</Navigation>
          </nav>);
  } else {
    return (
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
            <Navigation onRouteChange={onRouteChange} route='SignOut'>Sign out</Navigation>
          </nav>);
  }
}

export default App;
