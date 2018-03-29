import { UPDATE_HOTEL_QUOTE } from '../actions/hotelQuotes';
import { CLEAR_FLIGHT_QUOTE } from '../actions/flightQuote';
import { CLEAR_ORDER } from '../actions/orders';
import sortQuotesByPrice from './utils';

export const INITIAL_STATE_QUOTES = {
  ids: [],
  content: {},
};

function ids(state = [], action) {
  if (!action.payload) {
    return state;
  }
  const { id } = action.payload;

  switch (action.type) {
    case UPDATE_HOTEL_QUOTE:
      return state.includes(id) ? state : [...state, id];
    default:
      return state;
  }
}

function content(state = {}, action) {
  if (!action.payload) {
    return state;
  }
  const { id, data } = action.payload;
  switch (action.type) {
    case UPDATE_HOTEL_QUOTE:
      return {
        ...state,
        [id]: data,
      };
    default:
      return state;
  }
}

export default function hotelQuotes(state = INITIAL_STATE_QUOTES, action) {
  switch (action.type) {
    case UPDATE_HOTEL_QUOTE: {
      const newContent = content(state.content, action);
      return {
        ids: sortQuotesByPrice(ids(state.ids, action), newContent),
        content: newContent,
      };
    }
    case CLEAR_FLIGHT_QUOTE:
    case CLEAR_ORDER:
      return INITIAL_STATE_QUOTES;
    default:
      return state;
  }
}
