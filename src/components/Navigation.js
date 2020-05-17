import React from 'react';

const Navigation = ( { onRouteChange, route, routeName } ) => {
	return (
			<p onClick={() => onRouteChange(route)} className='f3 link underline dim black pa3 pointer'>
				{routeName}
			</p>
	);
}

export default Navigation;