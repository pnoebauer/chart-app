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
		<div>
		{/*console.log('fragment',isLoading,'data',data)*/}
			{isLoading ? (<div>Loading ...</div>) : 
			(
			<React.Fragment>
	    	{data.length && 
	    		<div className="Chart">
	    			{/*console.log('mount',data.length,data)*/}
	    			<h1>Chart Test	</h1>
	    			<CandlestickChart type={type} data={data} />
	    		</div>
	    	}
	    	</React.Fragment>

	    	)
	      	}
		</div>
	);
}

export default DisplayChart;