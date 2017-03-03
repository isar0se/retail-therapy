import React from 'react'
import {browserHistory} from 'react-router'
import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export const Signup = ({ signup }) => (
	<div>
		<form onSubmit={evt => {
			evt.preventDefault()
			signup(evt.target.name.value, evt.target.email.value, evt.target.password.value)
			browserHistory.push('/')
		}}>
			<input name="name" placeholder="type your name" required/>
			<input name="email" placeholder="type your email" required/>
			<input name="password" type="password" placeholder="type a good password" required/>
			<input type="submit" value="Signup" />
		</form>
		<p><a href="/api/auth/google/login">sign up with Google</a></p>
		<p><a href="/api/auth/facebook/login">sign up with Facebook</a></p>
	</div>
)

export default connect(
	state => ({}),
	{signup}
)(Signup)
