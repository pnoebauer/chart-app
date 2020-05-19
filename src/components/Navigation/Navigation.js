import React from 'react';

const Navigation = ( { onRouteChange, route, children } ) => {
	return (
			<p onClick={() => onRouteChange(route)} className='f3 link underline dim black pa2 pointer'>
				{children}
			</p>
	);
}

export default Navigation;