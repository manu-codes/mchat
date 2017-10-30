import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as chatActions from './actions';

import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';
class Chat extends React.Component {
  componentDidMount() {
    console.log('ChatMount');
    // let {dispatch} = this.props;
    // dispatch('server/Hello');
  console.log(this.props);
  this.props.ping();
  }
  render() {
    return (
      <div>
        <LeftPane></LeftPane>
        <RightPane></RightPane>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    todos: state.chatReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ping: (id) => {
      dispatch(ping(id));
    },
  };
};
function ping(data) {
  return {type: 'server/hello', data: data};
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
