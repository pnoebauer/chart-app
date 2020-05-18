import React from 'react';

const Navigation = ( { onRouteChange, route, routeName } ) => {
	return (
			<p onClick={() => onRouteChange(route)} className='f3 link underline dim black pa2 pointer'>
				{routeName}
			</p>
	);
}

export default Navigation;