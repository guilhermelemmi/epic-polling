import axios from 'axios';
import normalize from '../utils';
import { API_URL } from '../constants';

export const UPDATE_HOTELS = 'UPDATE_HOTELS';

export function updateHotels(hotels) {
  return {
    type: UPDATE_HOTELS,
    payload: {
      data: hotels,
    },
  };
}

export function fetchHotels() {
  return dispatch => axios.get(`${API_URL}/hotels`)
    .then((response) => {
      dispatch(updateHotels(normalize(response.data)));
    })
    .catch(error => console.log(error)); // eslint-disable-line no-console
}
