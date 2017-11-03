import React from 'react';
import {List, ListItem} from 'material-ui/List';
// import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from
  'material-ui/svg-icons/communication/chat-bubble';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSend from 'material-ui/svg-icons/content/send';
class ChatHome extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      messages: [],
      selectedUser: null,
      msg: '',
    };
    this.onUserSelect = this.onUserSelect.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.setMsg = this.setMsg.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.response && nextProps.response.notification &&
      nextProps.response.notification.users) {
      this.setState({
        users: nextProps.response.notification.users
          .filter((user) => user != this.props.loggedInAs),
      });
    }

    if (nextProps.response && nextProps.response.data &&
      nextProps.response.data.success) {
      if (nextProps.response.data.req == 'server/msgTo') {
        let msgs = this.state.messages.slice();

        msgs.push({
          content: nextProps.response.data.content,
          sender: nextProps.response.data.sender,
        });
        this.setState({messages: msgs});
      }
    }
  }
  onUserSelect(e) {
    this.setState({selectedUser: e.target.textContent});
  }
  sendMsg(e) {
    if (this.state.msg) {
      this.props.ping('server/msgTo',
        {
          to: this.state.selectedUser,
          content: this.state.msg,
        }
      );
      this.setState({msg: ''});
    }
  }
  setMsg(e) {
    this.setState({msg: e.currentTarget.value});
  }

  render() {
    return (
      <div>

        <Card className='left'>
          <CardHeader
            title="Users"
          />
          <CardText >
            <List>

              {
                this.state.users.map(
                  (user) => <ListItem
                    onClick={this.onUserSelect}
                    key={user}
                    rightIcon={<CommunicationChatBubble />}
                    primaryText={user}>

                  </ListItem >
                )
              }
            </List>
          </CardText>
        </Card>
        <Card className='right' >
          <CardHeader title={this.state.selectedUser}></CardHeader>
          <CardText >
            <List>
              {
                this.state.messages.map(
                  (msg, ind) => <ListItem
                    key={ind}
                    primaryText={msg.content}>
                  </ListItem >
                )
              }
            </List>
            <div className='footer'>
              <div className='text-cont'>
                <TextField
                  hintText="chat"
                  value={this.state.msg}
                  fullWidth
                  className='send-txt'
                  onChange={this.setMsg}
                />
              </div>
              <FloatingActionButton className='send-btn' onClick={this.sendMsg}>
                <ContentSend />
              </FloatingActionButton>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default ChatHome;
