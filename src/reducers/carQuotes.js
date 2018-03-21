import {
  UPDATE_QUOTE,
  CAR_FETCH_SUCESSFUL,
  CAR_FETCH_START,
  CAR_FETCH_STOP,
} from '../actions/carQuotes';

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
    case CAR_FETCH_SUCESSFUL:
      return {
        ids: [...state.ids],
        content: {
          ...state.content,
          [action.payload.response.id]: action.payload.response,
        },
      };
    case CAR_FETCH_START:
      return {
        ids: [...state.ids, action.payload.id],
        content: {
          ...state.content,
          [action.payload.id]: action.payload.body,
        },
      };
    case CAR_FETCH_STOP:
      return {
        ...state,
        [action.payload.id]: {
          ...state.content[action.payload.id],
          status: action.payload.status,
        },
      };
    default:
      return state;
  }
}
