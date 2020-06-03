import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// import { fitWidth } from "react-stockcharts/lib/helper";
import { fitChart } from "react-stockcharts/lib/helper";
//https://www.freecodecamp.org/forum/t/what-does-mean-in-an-es6-import-statement/268940/3
// NODE IMPLEMENTATION with require: 
// 1) look in node_modules…
// 2) for a folder called my-module…
// 3) then load the index.js file from there.

// NPM implementation
// import React from "../../node_modules/react/index"

//IF NOT ./ path is used with import webpack assumes the node implementation

import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

var CandleStickChart = ({ type, width, data, ratio, height }) => {
// function CandleStickChart({ type, width, data, ratio }) {

	console.log(width);
	const xRetrieve = d => d.date;
	const xExtents = [
				xRetrieve(last(data)),
				xRetrieve(data[data.length - 100])
			];

	return (
		<ChartCanvas height={height}
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
	);
}

CandleStickChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
	type: "svg",
};

// CandleStickChart = fitWidth(CandleStickChart);
CandleStickChart = fitChart(CandleStickChart);
export default CandleStickChart;