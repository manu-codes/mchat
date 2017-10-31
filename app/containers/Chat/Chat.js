import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as chatActions from './actions';

import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';
import ChatLogin from '../../components/ChatLogin/ChatLogin';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps');
    console.log(nextProps);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>

        {(this.state && this.state.loggedIn) ? (
          <div>
            <LeftPane {...this.props}></LeftPane>
            <RightPane {...this.props}></RightPane></div>) :
          <ChatLogin {...this.props} />}
      </div>
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
