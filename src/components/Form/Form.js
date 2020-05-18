import React from 'react';
import InputWithLabel from './InputWithLabel';

const Form = ( { route } ) => {
	var formName;
	if(route==='Register') {
		formName = 'Register';
	} else {
		formName = 'Sign in';
	}

	const onUpdate = (event) => {
		console.log(event.target.value);
	}

	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">
			      	{formName}
			      </legend>
			      {route==='Register' ? 
			      	<div className="mt3">
						<InputWithLabel type='text' name='name' id='name' onInputChange={onUpdate} >
							Name
						</InputWithLabel>
					</div>
			       : null}

			       <div className="mt3">
				        <div className="mt3">
						<InputWithLabel type='email' name='email-address' id='email-address' onInputChange={onUpdate}>
							Email
						</InputWithLabel>
					</div>
				      </div>

			      	<div className="mv3">
		      			<InputWithLabel type='password' name='password' id='password' onInputChange={onUpdate}>
							Password
						</InputWithLabel>
			      	</div>
			    </fieldset>
				    <div className="">
				      <input 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value={formName}
				      />
				    </div>
			  </div>
			</main>
		</article>
	)
};

export default Form;