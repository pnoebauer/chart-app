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
  userName: '',
  email: '',
  password: '',
  userId: '',
  userJoinDate: '',
}

function App() {

  const [route, setRoute] = React.useState(initialState.route);
  const [isSignedIn, setIsSignedIn] = React.useState(initialState.isSignedIn);
  const [userName, setUserName] = React.useState(initialState.userName);
  const [email, setEmail] = React.useState(initialState.email);
  const [password, setPassword] = React.useState(initialState.password);
  const [userId, setUserId] = React.useState(initialState.userId);
  const [userJoinDate, setUserJoinDate] = React.useState(initialState.userJoinDate);

  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
    if(newRoute === 'SignOut'){
      setIsSignedIn(initialState.isSignedIn);
      setUserName(initialState.userName);
      setEmail(initialState.email);
      setPassword(initialState.password);
      setUserId(initialState.userId);
      setUserJoinDate(initialState.userJoinDate);
    }
  };

  //updates the state when the user types into the input fields
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
    }
  }

  const loadUser = (userData) => {
    setUserName(userData.name);
    setEmail(userData.email);
    setUserId(userData.id);
    setUserJoinDate(userData.joined);
    setIsSignedIn(true);
    setRoute('SignIn');
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
  const onSubmit = (formType) => {
    let UrlExtension, method, address;

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
      ...(UrlExtension==='register') && {name: userName},
      email: email,
      password: password
    });

    const fetchSettings = {
      method: method,
      ...(method!=='get') && {headers: { 'Content-Type': 'application/json' }, body: body}
    };

    connectBackend(address,fetchSettings);
    // console.log(userName,email,userId,userJoinDate);
  }

  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesParams} 
      />
      <SetupNav currentRoute={route} onRouteChange={onRouteChange} />
      <Logo />
      {isSignedIn ?
        <p>name:{userName} id:{userId} email: {email} join date: {userJoinDate}</p>
        :
        <Form route={route} onFormUpdate={onFormUpdate} onSubmit={onSubmit}/>
      }
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
