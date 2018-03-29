import axios from 'axios';

export const UPDATE_QUOTE = 'UPDATE_QUOTE';

export function updateQuote(quote) {
  return {
    type: UPDATE_QUOTE,
    payload: {
      id: quote.id,
      data: quote,
    },
  };
}

function watchQuote(dispatch, id) {
  const quoteWatcher = () => {
    axios.get(`http://localhost:3000/car-quotes/${id}`)
      .then((response) => {
        if (response.data.status === 'quoted') {
          dispatch(updateQuote(response.data));
        } else {
          setTimeout(quoteWatcher, 1000);
        }
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };
  quoteWatcher();
}

export function postCarQuote(quote) {
  return dispatch => (
    axios.post('http://localhost:3000/car-quotes', quote)
      .then((response) => {
        watchQuote(dispatch, response.data.id);
        dispatch(updateQuote(response.data));
      })
      .catch(error => console.log(error)) // eslint-disable-line no-console
  );
}
