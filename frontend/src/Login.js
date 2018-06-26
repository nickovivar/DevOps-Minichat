import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  setUsername = (evt) => this.setState({username: evt.target.value})
  handleLogin = () => this.props.onLogin(this.state.username)

  render() {
    return (
      <div className="login">
        <input
          type="text"
          value={this.state.username}
          onChange={this.setUsername}
          />
        <button
          disabled={this.state.username.trim() === ""}
          onClick={this.handleLogin}
        >
        Log in
        </button>
      </div>
    );
  }
}

export default Login;
