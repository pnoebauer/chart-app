import React, { useState, useEffect } from 'react';
// import CandlestickChart from './CandlestickChart';
import CandlestickChart from './ChartHooks';
import { getData } from './GetData';

const DisplayChart = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const type = 'svg';
	
	useEffect(() => {
		// console.log('init');
		setIsLoading(true);

		getData()
		.then(retData => {
			if(retData.length) {
				setData(retData);
				setIsLoading(false);
			}
		})
		.catch(err => {
        		console.log('cannot connect');
      	});
	},[]);

	return (
		<React.Fragment>
			<nav className="zone blue sticky">
				<ul className="main-nav">
					<li><a href="/#/react">About</a></li>
					<li><a href="/#/react">Products</a></li>
					<li><a href="/#/react">Our Team</a></li>
					<li className="push"><a href="/#/react">Contacts</a></li>
				</ul>
			</nav>
			
				{isLoading ? (<div>Loading ...</div>) 
				: 
				(
				<React.Fragment>
		    		{data.length && 
		    		<div className="Chart">
		    			{/*console.log('mount',data.length,data)*/}		    			
		    			<CandlestickChart type={type} data={data} />
		    		</div>
		    		}
		    	</React.Fragment>
		    	)
		      	}
		</React.Fragment>
	);
}

export default DisplayChart;