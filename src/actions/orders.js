import axios from 'axios';
import { API_URL, ORDER_STATUS } from '../constants';

export const UPDATE_ORDER = 'UPDATE_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export function resetOrder() {
  return { type: CLEAR_ORDER };
}

export function updateOrder(order) {
  return {
    type: UPDATE_ORDER,
    payload: {
      data: order,
    },
  };
}

function watchOrder(dispatch, id) {
  const orderWatcher = setInterval(() => {
    axios.get(`${API_URL}/orders/${id}`)
      .then((response) => {
        if (response.data.status === ORDER_STATUS.CONFIRMED) {
          clearInterval(orderWatcher);
          dispatch(updateOrder(response.data));
        }
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }, 1000);
}

export function confirmOrder(order) {
  return dispatch => (
    axios.post(`${API_URL}/orders`, order)
      .then((response) => {
        watchOrder(dispatch, response.data.id);
        dispatch(updateOrder(response.data));
      })
      .catch(error => console.log(error)) // eslint-disable-line no-console
  );
}
