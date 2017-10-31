// import * as types from '../../const/types';

function chatReducer(state = [], action) {
  switch (action.type) {
    case 'message': {
      console.log(action);
      return Object.assign({}, {message: action.data});
    }
    default: {
      console.log(action);
      return state;
    }
  }
}

export default chatReducer;
