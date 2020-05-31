import React, { useState, useEffect } from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { getData } from './GetData';

const ChartDisplay = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log('init');
		setIsLoading(true);

		getData()
		.then(retData => {
			if(retData.length) {
				setData(retData);
				setIsLoading(false);
			}
				// console.log(retData.length);
		})
		.catch(err => {
        		console.log('cannot connect');
      	});
	},[]);

	return (
	<React.Fragment>
		{isLoading ? (
        	<div>Loading ...</div>
      		) : (
    		<div className="Chart">
    			{console.log('mount',data)}
    			Chart Test	
    		</div>
    		)
      	}
	</React.Fragment>
	);
}

export default ChartDisplay;