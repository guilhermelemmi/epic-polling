import { UPDATE_FLIGHT_QUOTE, CLEAR_FLIGHT_QUOTE } from '../actions/flightQuote';

export default function flightQuote(state = {}, action) {
  switch (action.type) {
    case UPDATE_FLIGHT_QUOTE:
      return action.payload.data;
    case CLEAR_FLIGHT_QUOTE:
      return {};
    default:
      return state;
  }
}
