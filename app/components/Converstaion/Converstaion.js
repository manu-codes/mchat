import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import Subheader from 'material-ui/Subheader';
import NullConversation from '../NullConversation/NullConversation';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from
'material-ui/svg-icons/communication/chat-bubble';


class Converstaion extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      msg: '',
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.setMsg = this.setMsg.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillReceiveProps(nextProps) {
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
  sendMsg(e) {
    if (this.state.msg) {
      this.props.ping('server/msgTo',
        {
          to: this.props.towards,
          content: this.state.msg,
        }
      );
      this.setState({msg: ''});
    }
  }
  setMsg(e) {
    this.setState({msg: e.currentTarget.value});
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMsg();
    }
  }
  render() {
    return ( this.props.towards?
      <Card className='full-height right-card'>
            <CardHeader title={'Chat with '+this.props.towards}></CardHeader>
            <CardText >
              <List>
                {
                  this.state.messages.map(
                    (msg, ind) => <ListItem
                      key={ind}
                      leftIcon={<CommunicationChatBubble />}
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
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
                <FloatingActionButton
                className='send-btn' onClick={this.sendMsg}>
                  <ContentSend />
                </FloatingActionButton>
              </div>
            </CardText>
          </Card>
    :<NullConversation/>);
  }
}

export default Converstaion;
