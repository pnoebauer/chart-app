import React, { useState, useEffect } from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { getData } from './GetData';



// const ChartDisplay = () => {
function ChartDisplay() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// const { type, width, data, ratio }
	// let width, ratio;
	const width=1406;
	const ratio=1.8;
	const type = 'svg';
	// var xExtents;
	
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
	
	const xRetrieve = d => d.date;
	const xExtentsFct = () => {
		return [
				xRetrieve(last(data)),
				xRetrieve(data[data.length - 100])
			];
	}

	var xExtents;
	if(data.length){
		xExtents=xExtentsFct();
	}

	// if(data){
	// 	console.log('ret',data);
	// 	}
	// useEffect(() => {
	// 	console.log('data changed')

	// 	},[data])

	// if(data.date){
	// 		xExtents = [
	// 			last(data).date,
	// 			data[data.length - 100].date
	// 		];
	// 		console.log('xExtents', data,data.date, last(data).date)
	// }
	// console.log(xExtents)

	return (
		<React.Fragment>
		{console.log('fragment',isLoading,'data',data)}
			{isLoading ? (<div>Loading ...</div>) : 
			(
			<>
	    	{data.length && 
	    		<div className="Chart">
	    			{console.log(data.length)}
	    			{console.log('mount',data)}

	    			Chart Test	
	    			{/*console.log(xRetrieve(data),data[0],data[0].close),xRetrieve(last(data))*/
	    				// console.log(xExtentsFct(),xExtents,xRetrieve(data))
	    			}

	    			<ChartCanvas height={400}
						ratio={ratio}
						width={width}
						margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
						type={type}
						seriesName="MSFT"
						data={data}
						xAccessor={xRetrieve}
						xScale={scaleTime()}
						xExtents={xExtents}>

						{/*console.log('ChartCanvas props',ratio,width,xRetrieve,scaleTime(),xExtents)*/}

						<Chart 
							id={1} 
							yExtents={d => {
								// console.log([d.high, d.low])
								return [d.high, d.low]
								}
							}
						>
							<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
							<YAxis axisAt="left" orient="left" ticks={5} />
							<CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
						</Chart>
				</ChartCanvas>

	    			
					
	    			
	    			

	    		</div>
	    	}
	    	</>




	    	)
	      	}
		</React.Fragment>
	);
}


ChartDisplay = fitWidth(ChartDisplay);
export default ChartDisplay;

{
	/*
		<ChartCanvas height={400}
					ratio={ratio}
					width={width}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={xRetrieve}
					xScale={scaleTime()}
					xExtents={xExtents}>

					<Chart id={1} yExtents={d => [d.high, d.low]}>
						<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
						<YAxis axisAt="left" orient="left" ticks={5} />
						<CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
					</Chart>
				</ChartCanvas>


	*/
}