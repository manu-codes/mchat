import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Main from '../Main/Main';

import * as leftPaneActions from '../../components/LeftPane/actions.js';
import * as rightPaneActions from '../../components/RightPane/actions.js';
import * as chatActions from '../../containers/Chat/actions.js';
// IMPORT ACTIONS HERE //

function mapStateToProps(state) {
  return {
leftPaneData: state.leftPaneReducer,
rightPaneData: state.rightPaneReducer,
chatData: state.chatReducer,
// ADD STATE RETURN //
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
leftPaneActions,
rightPaneActions,
chatActions,
// ADD ACTIONS HERE //
  ), dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
