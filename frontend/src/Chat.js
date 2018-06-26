import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config';

class Message extends Component {
  render() {
    return [
      <dd key={0}>{this.props.sender}</dd>,
      <dt key={1}>{this.props.message}</dt>
    ]
  }
}

class MessageList extends Component {
  render() {
    return (
      <dl>
        {this.props.messages.map((m, key) => <Message key={key} {...m} />)}
      </dl>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_message: "",
      messages: [],
      intervalID: null
    }
  }

  componentDidMount = () => {
    const intervalID = setInterval(this.fetchMessages, 5000);
    this.setState({intervalID})
  }
  componentWillUnmount = () => {
    clearInterval(this.state.intervalID);
  }

  fetchMessages = () => {
    const headers = new Headers();
    headers.append("Authorization", "bearer " + this.props.token);
    fetch(config.serverURL + "/api/messages", {
      headers
    })
    .then(response => response.json())
    .then(messages => this.setState({messages}))
    .catch(console.error);
  }

  sendMessage = () => {
    const headers = new Headers();
    headers.append("Authorization", "bearer " + this.props.token);
    headers.append("Content-Type", "application/json");
    fetch(config.serverURL + "/api/messages", {
      method: "POST",
      body: JSON.stringify({message: this.state.current_message}),
      headers
    })
    .then(response => response.json())
    .then(messages => this.setState({messages}))
    .catch(console.error);
    this.setState({current_message: ""});
  }

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages} />
        <div>
          <input
            type="text"
            value={this.state.current_message}
            onChange={evt => this.setState({current_message: evt.target.value})}
          />
          <button
            onClick={this.sendMessage}
            disabled={this.state.current_message.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default App;
