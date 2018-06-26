import React, { Component } from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

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
        <h2>What's your name?</h2>
        <FormControl
          type="text"
          value={this.state.username}
          onChange={this.setUsername}
          />
        <Button
          disabled={this.state.username.trim() === ""}
          onClick={this.handleLogin}
        >
        Log in
        </Button>
      </div>
    );
  }
}

export default Login;
