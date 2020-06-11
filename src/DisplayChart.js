import React, { useState, useEffect } from 'react';
// import CandlestickChart from './CandlestickChart';
import CandlestickChart from './ChartHooks';
// import CandlestickChart from './IntradayChart';
// import CandlestickChart from './InterdayChart';
import { getData } from './GetData';


const barPeriods = ['month','day','hour','minute'];
const initalBP = {
	month: false,
	day: false,
	hour: false,
	minute: false
};

const DisplayChart = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isToggleOn, setToggle] = useState(true);

	const [activeBP, setActiveBP] = useState(initalBP);

	const type = 'svg';
	
	const handleBPClick = (event) => {
		const clickSource = event.target.value;
		// console.log('clicked',clickSource);
		setActiveBP({
			...initalBP,
			[clickSource]: true
		})
		// console.log(activeBP);
  	}

	const barPeriodButtons = barPeriods.map((value,index) => {
		// set class based on active state
		const active = activeBP[value] ? 'active' : 'inactive';
		console.log(activeBP[value],active,value);

		return (
			<button key={value} value={value} className={'button ' + active} onClick={handleBPClick}>
				{value}
			</button>
		)
		// console.log(value,index);
		// return value;
	})

	// console.log(barPeriodButtons);
	
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

	const handleClick = () => {
		setToggle(!isToggleOn);
  	}

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
		    			{/*<button className='barPeriod' onClick={handleClick}>
        					{isToggleOn ? 'ON' : 'OFF'}
						</button>*/}
						<div className='barPeriodButtons'>
							{barPeriodButtons}
						</div>
						
		    		</div>
		    		}
		    	</React.Fragment>
		    	)
		      	}
		</React.Fragment>
	);
}

export default DisplayChart;