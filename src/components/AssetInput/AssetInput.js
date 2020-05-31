import React from 'react';
import './AssetInput.css';
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// var assets = ['SP500','NAS100','US300','GER30','UK100'];

const AssetInput = () => {
	return (
		<div className='pa2 tc'>
	      <input
	        className='pa0 ba b--green bg-lightest-blue f2 tc'
	        type='search'
	        name='asset'
	        placeholder='search assets'
	      />
	    </div>)
}

export default AssetInput;