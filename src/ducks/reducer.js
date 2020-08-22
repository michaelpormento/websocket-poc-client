import * as t from "./types";

const initialState = {
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_SOCKET_MESSAGE:
      console.log(action.payload);
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
