import axios from 'axios';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';

export function updateQuote (quote) {
  return {
    type: UPDATE_QUOTE,
    payload: {
      id: quote.id,
      data: quote,
    },
  };
}

export function postCarQuote (quote) {
  return (dispatch) => {
    return axios.post('http://localhost:3000/car-quotes', quote)
      .then((response) => {
        console.log(response);
        watchQuote(dispatch, response.data.id);
        dispatch(updateQuote(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function watchQuote(dispatch, id) {
  console.log('watchQuote', id);
  const quoteWatcher = setInterval(() => {
    axios.get('http://localhost:3000/car-quotes/' + id)
      .then((response) => {
        console.log(response);
        if (response.data.status === 'quoted') {
          clearInterval(quoteWatcher);
          dispatch(updateQuote(response.data));
        }
      })
      .catch((error) => console.log(error));
  }, 1000);
}
