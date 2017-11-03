import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Main from '../Main/Main';

import * as chatHomeActions from '../../components/ChatHome/actions.js';
import * as rightPaneActions from '../../components/RightPane/actions.js';
import * as chatActions from '../../containers/Chat/actions.js';
// IMPORT ACTIONS HERE //

function mapStateToProps(state) {
  return {
chatHomeData: state.chatHomeReducer,
rightPaneData: state.rightPaneReducer,
chatData: state.chatReducer,
// ADD STATE RETURN //
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
chatHomeActions,
rightPaneActions,
chatActions,
// ADD ACTIONS HERE //
  ), dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
