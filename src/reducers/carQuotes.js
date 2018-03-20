import { UPDATE_QUOTE } from '../actions/carQuotes';

export const INITIAL_STATE_QUOTES = {
  ids: [],
  content: {},
};

function ids(state = [], action) {
  if (!action.payload) {
    return state;
  }
  const { id, data } = action.payload;

  switch (action.type) {
    case UPDATE_QUOTE:
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
    case UPDATE_QUOTE:
      return {
        ...state,
        [id]: data,
      };
    default:
      return state;
  }
}

export default function carQuotes(state = INITIAL_STATE_QUOTES, action) {
  switch (action.type) {
    case UPDATE_QUOTE:
      return {
        ids: ids(state.ids, action),
        content: content(state.content, action),
      };
    default:
      return state;
  }
}
