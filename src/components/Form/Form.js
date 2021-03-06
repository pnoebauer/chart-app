import React from 'react';
import InputWithLabel from './InputWithLabel';

const Form = ( { route, onFormUpdate, onSubmit } ) => {
	var formName;
	if(route==='Register') {
		formName = 'Register';
	} else {
		formName = 'Sign in';
	}

	return (
		<main className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">
		      	{formName}
		      </legend>
		      {route==='Register' && 
		      	<div className="mt3">
					<InputWithLabel 
						type='text' 
						name='name' 
						id='name' 
						onInputChange={onFormUpdate} 
					>
						Name
					</InputWithLabel>
				</div>
		       }
		       <div className="mt3">
					<InputWithLabel 
						type='email' 
						name='email' 
						id='email-address' 
						onInputChange={onFormUpdate/*(event) => onFormUpdate(event,'email')*/} 
					>
						Email
					</InputWithLabel>
				</div>
		      	<div className="mv3">
	      			<InputWithLabel 
	      				type='password' 
	      				name='password' 
	      				id='password' 
	      				onInputChange={onFormUpdate} 
	      			>
						Password
					</InputWithLabel>
		      	</div>
		    </fieldset>
			    <div className="button">
			      <input 
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value={formName}
			      	onClick={onSubmit/*()=>onSubmit(formName)*/}
			      />
			    </div>
		  </div>
		</main>
	)
};

export default Form;

//comment: 
//	onInputChange={onUpdate}
//	same as:
//	onInputChange={(e)=>onUpdate(e)}