import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as chatActions from './actions';

import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';
class Chat extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('nextProps');
    console.log(nextProps);
  }
  componentDidMount() {
    console.log(this.props);
    this.props.ping('Hi server........');
  }
  render() {
    return (
      <div>
        <LeftPane {...this.props}></LeftPane>
        <RightPane {...this.props}></RightPane>
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
    ping: (data) => {
      dispatch(ping(data));
    },
  };
};
function ping(data) {
  return {type: 'server/hello', data: data};
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
