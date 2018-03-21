export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const POST_QUOTE = 'POST_QUOTE';
export const CAR_FETCH_START = 'CAR_FETCH_START';
export const CAR_FETCH_STOP = 'CAR_FETCH_STOP';
export const CAR_FETCH_FAILED = 'CAR_FETCH_FAILED';
export const CAR_FETCH_SUCESSFUL = 'CAR_FETCH_SUCESSFUL';

export function updateQuote(quote) {
  return {
    type: UPDATE_QUOTE,
    payload: {
      id: quote.id,
      data: quote,
    },
  };
}

// function watchQuote(dispatch, id) {
//   const quoteWatcher = setInterval(() => {
//     axios.get(`http://localhost:3000/car-quotes/${id}`)
//       .then((response) => {
//         if (response.data.status === 'quoted') {
//           clearInterval(quoteWatcher);
//           dispatch(updateQuote(response.data));
//         }
//       })
//       .catch(error => console.log(error)); // eslint-disable-line no-console
//   }, 1000);
// }

export function carFetchStart(id, body) {
  return {
    type: CAR_FETCH_START,
    payload: {
      id,
      body: {
        ...body,
        status: 'in_progress',
      },
    },
  };
}

export function carFetchStop(status, id) {
  return {
    type: CAR_FETCH_STOP,
    payload: {
      status,
      id,
    },
  };
}

export function carFetchFailed(error, id) {
  return {
    type: CAR_FETCH_FAILED,
    payload: {
      error,
      id,
    },
  };
}

export function carFetchSucessful(response) {
  return {
    type: CAR_FETCH_SUCESSFUL,
    payload: {
      response,
    },
  };
}

export function postCarQuote(quote) {
  return {
    type: POST_QUOTE,
    payload: {
      quote,
    },
  };
}
