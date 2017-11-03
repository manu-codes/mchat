import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as chatActions from './actions';

import ChatHome from '../../components/LeftPane/LeftPane';
import ChatLogin from '../../components/ChatLogin/ChatLogin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});
class Chat extends React.Component {

  constructor() {
    super();
    this.state = {loggedIn: false};
  }

  componentWillReceiveProps(nextProps) {
    console.log('LISTEN', nextProps);
    if (nextProps.response && nextProps.response.data &&
      nextProps.response.data.success) {
      if (nextProps.response.data.req == 'server/addUser')
        this.setState({loggedIn: true,
          loggedInAs: nextProps.response.data.user});
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {(this.state && this.state.loggedIn) ? (
          <ChatHome {...this.props}
          loggedInAs={this.state.loggedInAs}>
          </ChatHome>
        ) :
          <ChatLogin {...this.props} />}
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    response: state.chatReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ping: (type, data) => {
      dispatch(ping(type, data));
    },
  };
};
function ping(type, data) {
  return {type, data};
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
