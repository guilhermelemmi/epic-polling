import { UPDATE_CARS } from '../actions/cars';

export const INITIAL_STATE = {
  ids: [],
  content: {},
};

export default function cars(state = INITIAL_STATE, action) {
  if (action.payload) {
    const actionData = action.payload.data;
    switch (action.type) {
      case UPDATE_CARS:
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
