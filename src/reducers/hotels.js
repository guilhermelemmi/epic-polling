import { UPDATE_HOTELS } from '../actions/hotels';

export const INITIAL_STATE = {
  ids: [],
  content: {},
};

export default function hotels(state = INITIAL_STATE, action) {
  if (action.payload) {
    const actionData = action.payload.data;
    switch (action.type) {
      case UPDATE_HOTELS:
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
