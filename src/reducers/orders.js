import { UPDATE_ORDER } from '../actions/orders';

export default function orders(state = {}, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.payload.data;
    default:
      return state;
  }
}
