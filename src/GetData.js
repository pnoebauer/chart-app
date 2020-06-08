import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

// tsvParse(data, parseData(parseDate))
// row conversion is used - parseData achieves the conversion
const parseData = (parse) => { 
	// console.log('parse',parse);
	// var parseTime = d3.timeParse("%B %d, %Y");
	// parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
	//parse = timeParse("%Y-%m-%d");
	return (d) => {
		// console.log('before d object',d);
		// console.log('before',d.date);
		d.date = parse(d.date); //convert date string to datestamp
		// console.log('after',d.date);
		d.open = +d.open;	//+: convert string to int/float
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		// console.log('after d object',d);
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");
// const getData = () => {
export function getData() {	

	const promiseMSFT = 
		fetch("http://localhost:4000/files/csv")
			.then(response => response.text())
			// .then(data => console.log(data));
			.then(data => csvParse(data, parseData(parseDate)));

	// const promiseMSFT = 
	// 	fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
	// 		.then(response => response.text())
	// 		.then(data => tsvParse(data, parseData(parseDate))); //d3.tsvParse("foo\tbar\n1\t2"); // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]

	return promiseMSFT;
}

// export default getData;

// https://github.com/d3/d3-dsv
// If a row conversion function is specified, the specified function is invoked for each row, being passed an object representing the current row (d), the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined, the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object. For example:
// var data = d3.csvParse(string, function(d) {
//   return {
//     year: new Date(+d.Year, 0, 1), // lowercase and convert "Year" to Date
//     make: d.Make, // lowercase
//     model: d.Model, // lowercase
//     length: +d.Length // lowercase and convert "Length" to number
//   };
// });