import axios from 'axios';
import { API_URL, QUOTE_STATUS } from '../constants';

export const UPDATE_HOTEL_QUOTE = 'UPDATE_HOTEL_QUOTE';

export function updateQuote(quote) {
  return {
    type: UPDATE_HOTEL_QUOTE,
    payload: {
      id: quote.id,
      data: quote,
    },
  };
}

function watchQuote(dispatch, id) {
  const quoteWatcher = setInterval(() => {
    axios.get(`${API_URL}/hotel-quotes/${id}`)
      .then((response) => {
        if (response.data.status === QUOTE_STATUS.QUOTED) {
          clearInterval(quoteWatcher);
          dispatch(updateQuote(response.data));
        }
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }, 1000);
}

export function postHotelQuote(quote) {
  return dispatch => (
    axios.post(`${API_URL}/hotel-quotes`, quote)
      .then((response) => {
        watchQuote(dispatch, response.data.id);
        dispatch(updateQuote(response.data));
      })
      .catch(error => console.log(error)) // eslint-disable-line no-console
  );
}
