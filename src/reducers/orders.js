import { UPDATE_ORDER, CLEAR_ORDER } from '../actions/orders';

export default function orders(state = {}, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.payload.data;
    case CLEAR_ORDER:
      return {};
    default:
      return state;
  }
}
