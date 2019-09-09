import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
      toggleForm: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
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
            <div onClick={this.handleForm} className={this.state.toggleForm ? 'hidden sign-up' : 'sign-up'}>Change PW</div>
            <form onSubmit={this.onSignIn} className={this.state.toggleForm ? 'form' : 'hidden form'}>
              <input onChange={this.handleChange} className="authput" name="oldPassword" type="password" placeholder="Old password"/>
              <input onChange={this.handleChange} className="authput" name="newPassword" type="password" placeholder="New password"/>
              <button onSubmit={this.onSignIn} type="submit" className={this.state.toggleForm ? 'butt' : 'butt hidden'}><span className="text">DONE</span></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
