import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
// import { fitChart } from "react-stockcharts/lib/helper";

import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";


var CandleStickChart = ({ type, width, data, ratio, height }) => {
// function CandleStickChart({ type, width, data, ratio }) {

	// console.log(width);
	const xRetrieve = d => d.date;
	const endData = xRetrieve(last(data));
	const startData = xRetrieve(data[data.length - 100]);
	const xExtents = [startData, endData];

	// console.log('sizes',window.innerHeight,window.innerWidth);
	var vh = window.innerHeight;
// (window.innerHeight-100)
	return (
		<ChartCanvas height={(vh*0.9)}
			ratio={ratio}
			width={width}
			margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
			type={type}
			seriesName="MSFT"
			data={data}
			xAccessor={xRetrieve}
			xScale={scaleTime()}
			xExtents={xExtents}>

			<Chart 
				id={1} 
				yExtents={d => {// console.log([d.high, d.low])
					return [d.high, d.low]}
				}
			>
				<XAxis axisAt="bottom" orient="bottom" ticks={6} />
				<YAxis axisAt="left" orient="left" ticks={5} />
				<CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
				<OHLCTooltip origin={[-10, -10]}/>
				<MouseCoordinateX
					at="bottom"
					orient="bottom"
					displayFormat={timeFormat("%Y-%m-%d")}
				/>
				<MouseCoordinateY
					at="left"
					orient="left"
					displayFormat={format(".4s")}
				/>
			</Chart>
			<CrossHairCursor />
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
// CandleStickChart = fitChart(CandleStickChart);
export default CandleStickChart;

// xZoomHeight={vh*0.1} fontSize={vh*0.04} fontWeight={400}