import axios from 'axios';
import normalize from '../utils';
import { API_URL } from '../constants';

export const UPDATE_CARS = 'UPDATE_CARS';

export function updateCars(cars) {
  return {
    type: UPDATE_CARS,
    payload: {
      data: cars,
    },
  };
}

export function fetchCars() {
  return dispatch => axios.get(`${API_URL}/cars`)
    .then((response) => {
      dispatch(updateCars(normalize(response.data)));
    })
    .catch(error => console.log(error)); // eslint-disable-line no-console
}
