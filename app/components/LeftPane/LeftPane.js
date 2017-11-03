import React from 'react';
import {List, ListItem} from 'material-ui/List';
// import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Converstaion from '../Converstaion/Converstaion';
import {cyan300, grey100} from 'material-ui/styles/colors';
// ,
// blue300,
// indigo900,
// orange200,
// pink400,
// purple500,

const style = {margin: 5};
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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.response && nextProps.response.notification &&
      nextProps.response.notification.users) {
      this.setState({
        users: nextProps.response.notification.users
          .filter((user) => user != this.props.loggedInAs),
      });
      // this.setState({
      //   users: nextProps.response.notification.users,
      // });
    }
  }
  onUserSelect(e) {
    this.setState({selectedUser: e.target.textContent});
  }

  render() {
    return (
      <div className='col-12 chat-home-container'>

        <div className='col-3 float-left full-height'>

          <Card className='full-height'>
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
                      leftAvatar={
                        <Avatar
                          color={grey100}
                          backgroundColor={cyan300}
                          size={40}
                          style={style}
                        >
                         { user.charAt(0)}
                        </Avatar>
                      }
                      primaryText={user}>

                    </ListItem >
                  )
                }
              </List>
            </CardText>
          </Card>
        </div>
        <div className='col-9 float-left full-height'>
          <Converstaion
            {...this.props}
            towards={this.state && this.state.selectedUser} />
        </div>
      </div>
    );
  }
}

export default ChatHome;
