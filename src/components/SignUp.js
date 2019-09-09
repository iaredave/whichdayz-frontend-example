import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './fancyform.scss'

import { signUp, signIn } from '../api'
import messages from '../messages'
import { WelcomeFontMessage } from './HomePageStyle'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      toggleForm: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  handleForm = (event) => {
    this.setState({ toggleForm: !this.state.toggleForm })
    event.stopPropagation()
  };

  render () {
    // const { email, password } = this.state

    return (
      <div className="app">
        <div className={this.state.toggleForm ? 'background content' : 'content'}>
          <div className="header hidden"></div>
          <div className={this.state.toggleForm ? 'expanded button' : 'button'}>
            <div onClick={this.handleForm} className={this.state.toggleForm ? 'hidden sign-up' : 'sign-up'}><WelcomeFontMessage>SIGN UP</WelcomeFontMessage></div>
            <form onSubmit={this.onSignUp} className={this.state.toggleForm ? 'form' : 'hidden form'}>
              <input onChange={this.handleChange} className="authput" name="email" type="email" placeholder="Email Id"/>
              <input onChange={this.handleChange} className="authput" name="password" type="password" placeholder="Password"/>
              <input onChange={this.handleChange} className="authput" name="passwordConfirmation" type="password" placeholder="Confirm Password"/>
              <button onSubmit={this.onSignUp} type="submit" className={this.state.toggleForm ? 'butt' : 'butt hidden'}><span className="text">DONE</span></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
