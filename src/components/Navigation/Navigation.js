import React from 'react';

const Navigation = ({ currentRoute,onRouteChange }) => {
  if(currentRoute==='SignOut') {  
    return (
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
            <Link onRouteChange={onRouteChange} route='Register'>Register</Link>
            <Link onRouteChange={onRouteChange} route='SignIn'>Sign in</Link>
          </nav>);
  } else {
    return (
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}} >
            <Link onRouteChange={onRouteChange} route='SignOut'>Sign out</Link>
          </nav>);
  }
}

const Link = ( { onRouteChange, route, children } ) => {
	return (
			<p onClick={() => onRouteChange(route)} className='f3 link underline dim black pa2 pointer'>
				{children}
			</p>
	);
}

export default Navigation;