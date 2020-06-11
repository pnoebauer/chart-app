import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";

import { last } from "react-stockcharts/lib/utils";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

var CandleStickChart = ({ type, width, data: initialData, ratio, height }) => {

	// const xRetrieve = d => d.date;
	const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

	const endData = xAccessor(last(data));
	const startData = xAccessor(data[data.length - 100]);
	const xExtents = [startData, endData];

	// console.log('sizes',window.innerHeight,window.innerWidth);
	var vh = window.innerHeight;
// (window.innerHeight-100)
	return (
		<ChartCanvas height={(vh*0.8)}
			ratio={ratio}
			width={width}
			margin={{ left: 50, right: 50, top: 50, bottom: 30 }}
			type={type}
			seriesName="Asset"
			data={data}
			xAccessor={xAccessor}
			xScale={xScale}
			displayXAccessor={displayXAccessor}
			xExtents={xExtents}>

			<Chart 
				id={1} 
				yExtents={[d => [d.high, d.low]]}				
			>
				<XAxis axisAt="bottom" orient="bottom" />
				<YAxis axisAt="left" orient="left" ticks={5} />
				<MouseCoordinateX
					rectWidth={110}
					at="bottom"
					orient="bottom"
					displayFormat={timeFormat("%Y-%m-%d %H:%M")}
				/>
				<MouseCoordinateY
					at="left"
					orient="left"
					displayFormat={format(".2f")}
				/>
				<CandlestickSeries />
				<OHLCTooltip origin={[-10, -10]} xDisplayFormat={timeFormat("%Y-%m-%d %H:%M:%S")}/>

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
export default CandleStickChart;

// xZoomHeight={vh*0.1} fontSize={vh*0.04} fontWeight={400}