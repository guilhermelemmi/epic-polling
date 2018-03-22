import axios from 'axios';
import { API_URL, QUOTE_STATUS } from '../constants';

export const CLEAR_FLIGHT_QUOTE = 'CLEAR_FLIGHT_QUOTE';
export const UPDATE_FLIGHT_QUOTE = 'UPDATE_FLIGHT_QUOTE';

export function clearFlightQuote() {
  return {
    type: CLEAR_FLIGHT_QUOTE,
  };
}

export function updateFlightQuote(quote) {
  return {
    type: UPDATE_FLIGHT_QUOTE,
    payload: {
      data: quote,
    },
  };
}

function watchQuote(dispatch, id) {
  const quoteWatcher = setInterval(() => {
    axios.get(`${API_URL}/flight-quotes/${id}`)
      .then((response) => {
        if (response.data.status === QUOTE_STATUS.QUOTED) {
          clearInterval(quoteWatcher);
          dispatch(updateFlightQuote(response.data));
        }
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }, 1000);
}

export function postFlightQuote(quote) {
  return (dispatch) => {
    dispatch(clearFlightQuote());
    return (
      axios.post(`${API_URL}/flight-quotes`, quote)
        .then((response) => {
          watchQuote(dispatch, response.data.id);
          dispatch(updateFlightQuote(response.data));
        })
        .catch(error => console.log(error)) // eslint-disable-line no-console
    );
  };
}
