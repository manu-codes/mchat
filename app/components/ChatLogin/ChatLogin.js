import React from 'react';


class ChatLogin extends React.Component {
  constructor() {
    super();
    this.logon = this.logon.bind(this);
    this.setName = this.setName.bind(this);
  }
  logon() {
    if (this.state.userName)
      this.props.ping('server/addUser', {userName: this.state.userName});
  }
  setName(e) {
    this.setState({userName: e.currentTarget.value});
  }
  render() {
    return (
      <div>
        <input type='text' onChange={this.setName} />
        <button onClick={this.logon}>Logon</button>
      </div>
    );
  }
}

export default ChatLogin;
