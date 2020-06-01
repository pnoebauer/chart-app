import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

var CandleStickChart = ({ type, width, data, ratio }) => {
// function CandleStickChart({ type, width, data, ratio }) {

	const xRetrieve = d => d.date;
	const xExtents = [
				xRetrieve(last(data)),
				xRetrieve(data[data.length - 100])
			];

	return (
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

CandleStickChart = fitWidth(CandleStickChart);
export default CandleStickChart;