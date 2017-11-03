import * as types from './actions';

function chatHomeReducer(state = {}, action) {
  switch (action.type) {
    case types.ADD_CHAT: {
      // let newArray = state.chat[action.data.destination]array.slice();
      // newArray.splice(action.index, 0, action.item);

      return [];
    }

    default: {
      return {...state};
    }
  }
}

export default chatHomeReducer;
