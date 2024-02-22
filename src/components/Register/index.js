import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  //   onSubmitSuccess = jwtToken => {
  //     const {history} = this.props

  //     Cookies.set('jwt_token', jwtToken, {
  //       expires: 30,
  //     })
  //     history.replace('/')
  //   }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, email, password} = this.state
    const userDetails = {username, email, password}
    const url = 'https://users-7c43.onrender.com/users'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      history.replace('/login')
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="email"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Register
          </button>
          <p style={{textAlign: 'center'}}>
            <Link to="/login" style={{textDecoration: 'none'}}>
              Already have account?
            </Link>
          </p>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
