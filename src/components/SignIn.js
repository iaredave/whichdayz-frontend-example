import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './fancyform.scss'
import { signIn } from '../api'
import messages from '../messages'
import { WelcomeFontMessage } from './HomePageStyle'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      toggleForm: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
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
            <div onClick={this.handleForm} className={this.state.toggleForm ? 'hidden sign-up' : 'sign-up'}><WelcomeFontMessage>SIGN IN</WelcomeFontMessage></div>
            <form onSubmit={this.onSignIn} className={this.state.toggleForm ? 'form' : 'hidden form'}>
              <input onChange={this.handleChange} className="authput" name="email" type="email" placeholder="Email Id"/>
              <input onChange={this.handleChange} className="authput" name="password" type="password" placeholder="Password"/>
              <button onSubmit={this.onSignIn} type="submit" className={this.state.toggleForm ? 'butt' : 'butt hidden'}><span className="text">DONE</span></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
