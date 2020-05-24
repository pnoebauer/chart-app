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
  isSignedIn: false,
  user: {
    name: '',
    email: '',
    password: '',
    id: '',
    joinDate: ''
  }
}

function App() {

  const [route, setRoute] = React.useState(initialState.route);
  const [isSignedIn, setIsSignedIn] = React.useState(initialState.isSignedIn);
  const [user, setUser] = React.useState(initialState.user);

  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
    if(newRoute === 'SignOut'){
      setIsSignedIn(initialState.isSignedIn);
      setUser(initialState.user);
    }
  };

  //updates the state when the user types into the input fields
  // const onFormUpdate = (event,type) => {
  const onFormUpdate = (event) => {
    let fieldType = event.target.name;
    let input = event.target.value;
    setUser(
          { ...user,
            [fieldType]: input
          });
  }

  const loadUser = (userData) => {
    setIsSignedIn(true);
    setRoute('SignIn');
    setUser({ ...user,
            name: userData.name,
            email: userData.email,
            id: userData.id,
            joinDate: userData.joined,
          })
  }

  const connectBackend = (address, fetchSettings) => {
    fetch(address, fetchSettings)
      .then(response => response.json()
        .then(userData => {
            if(userData.id){
              loadUser(userData);
            }
            else console.log('no user returned - res:',userData);
          })
      )
      .catch(err => {
        console.log('cannot connect');
      });
  }

  //when the user clicks the submit button the input data is sent to the backend
  const onSubmit = (event) => {
    let UrlExtension, method, address, formType;
    formType = event.target.value;
    switch (formType){
      case 'Sign in':
        UrlExtension = 'signin';
        method = 'post';
        break;
      case 'Register':
        UrlExtension = 'register';
        method = 'post';
        break;
      default:
        UrlExtension = '';
        method = 'get';
    }

    address = `http://localhost:3000/${UrlExtension}`;

    const body = JSON.stringify({
      ...(UrlExtension==='register') && {name: user.name},
      email: user.email,
      password: user.password
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
      <Navigation currentRoute={route} onRouteChange={onRouteChange} />
      <Logo />
      {isSignedIn ?
        <p>name:{user.name} id:{user.id} email: {user.email} join date: {user.joinDate}</p>
        :
        <Form route={route} onFormUpdate={onFormUpdate} onSubmit={onSubmit}/>
      }
    </div>
  );
}

export default App;
