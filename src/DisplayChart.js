import React, { useState, useEffect } from 'react';
// import CandlestickChart from './CandlestickChart';
import CandlestickChart from './ChartHooks';
// import CandlestickChart from './IntradayChart';
// import CandlestickChart from './InterdayChart';
import { getData } from './GetData';


const barPeriods = ['month','day','hour','minute'];


const DisplayChart = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [activatedBP, setActivatedBP] = useState('day');

	const type = 'svg';
	
	const handleBPClick = (event) => {
		const clickSource = event.target.value;
		setActivatedBP(clickSource);
  	}

	const barPeriodButtons = barPeriods.map((value,index) => {

		const active = activatedBP===value ? 'active' : 'inactive';
		console.log(activatedBP,active,value);

		return (
			<button key={value} value={value} className={'button ' + active} onClick={handleBPClick}>
				{value}
			</button>
		)
	})
	
	useEffect(() => {

		setIsLoading(true);

		getData(activatedBP)
		.then(retData => {
			if(retData.length) {
				setData(retData);
				setIsLoading(false);
			}
		})
		.catch(err => {
        		console.log('cannot connect');
      	});
      },[activatedBP]);

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