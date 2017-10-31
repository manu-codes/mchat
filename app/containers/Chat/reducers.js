// import * as types from '../../const/types';

function chatReducer(state = [], action) {
  switch (action.type) {
    case 'message': {
      return Object.assign({}, {data: action.data});
    }
    case 'notify': {
      return Object.assign({}, {notification: action.data});
    }
    default: {
      return state;
    }
  }
}

export default chatReducer;
