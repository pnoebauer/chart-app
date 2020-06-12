import { csvParse } from  "d3-dsv";
// import { tsvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";

// tsvParse(data, parseData(parseDate))
// row conversion is used - parseData achieves the conversion
const parseData = (parse) => { 
	return (d) => {
		// console.log('before d object',d);
		d.date = parse(d.date); //convert date string to datestamp
		d.open = +d.open;	//+: convert string to int/float
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		// console.log('after d object',d);
		return d;
	};
}

/*use timeParse if the datetime from the fetched csv file needs to be changed */
// const parseDate = timeParse("%Y-%m-%d");

export function getData(period) {	

	// console.log(period)
	// const period = 'hour';

	const body = JSON.stringify({
      period: period,
    });

    const fetchSettings = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }, 
      body: body
    };

	const promiseData = 
		fetch("http://localhost:4000/files/csv",fetchSettings) //"https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
			.then(response => response.text())			
			// .then(data => csvParse(data, parseData(parseDate)))
			.then(data => csvParse(data, parseData(d => new Date(+d))))
			// .then(data => console.log(data))

	return promiseData;
}