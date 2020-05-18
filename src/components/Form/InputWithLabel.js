import React from 'react';

const InputWithLabel = ( { type, name, id, children, onInputChange } ) => {
	return (
		<>
		<label 
			className="db fw6 lh-copy f6" 
			htmlFor={id}
		>
        	{children}
        </label>
        <input 
        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        	type={type} 
        	name={name}  
        	id={id} 
        	onChange={onInputChange}
        />
		</>
	)
}

export default InputWithLabel;