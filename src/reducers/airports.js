import { UPDATE_AIRPORTS } from '../actions/airports';

export const INITIAL_STATE = {
  ids: [],
  content: {},
};

export default function airports(state = INITIAL_STATE, action) {
  if (action.payload) {
    const actionData = action.payload.data;
    switch (action.type) {
      case UPDATE_AIRPORTS:
        return {
          ids: actionData.ids,
          content: actionData.content,
        };
      default:
        return state;
    }
  } else {
    return state;
  }
}
