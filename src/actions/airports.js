import axios from 'axios';
import normalize from '../utils';
import { API_URL } from '../constants';

export const UPDATE_AIRPORTS = 'UPDATE_AIRPORTS';

export function updateAirports(airports) {
  return {
    type: UPDATE_AIRPORTS,
    payload: {
      data: airports,
    },
  };
}

export function fetchAirports() {
  return dispatch => axios.get(`${API_URL}/airports`)
    .then((response) => {
      dispatch(updateAirports(normalize(response.data)));
    })
    .catch(error => console.log(error)); // eslint-disable-line no-console
}
