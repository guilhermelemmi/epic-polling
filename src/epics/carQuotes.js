import 'rxjs';
import { Observable } from 'rxjs/Observable';

import {
  POST_QUOTE,
  CAR_FETCH_START,
  CAR_FETCH_STOP,
  CAR_FETCH_FAILED,
  carFetchSucessful,
  carFetchStop,
  carFetchFailed,
  carFetchStart,
  CAR_FETCH_SUCESSFUL,
} from '../actions/carQuotes';

export const carFetchEpic = action$ =>
  action$.ofType(CAR_FETCH_START)
    .switchMap(action =>
      Observable.timer(0, 4000)
        .takeUntil(action$.ofType(CAR_FETCH_STOP))
        .switchMap(() =>
          Observable.ajax({
            url: `http://localhost:3000/car-quotes/${action.payload.id}`,
            method: 'GET',
          })
            .map((res) => {
              if (res.response.status === 'quoted') {
                return carFetchSucessful(res.response);
              }
              return null;
            })
            .catch(error => Observable.of(carFetchFailed(error, action.payload.id)))));

export const carFetchFailEpic = action$ =>
  action$.ofType(CAR_FETCH_FAILED)
    .switchMap(action => carFetchStop('failed', action.payload.id));

export const carFetchSucessfulEpic = action$ =>
  action$.ofType(CAR_FETCH_SUCESSFUL)
    .switchMap(action => carFetchStop('quoted', action.response.id));

export const carPostQuote = action$ =>
  action$.ofType(POST_QUOTE)
    .switchMap(action =>
      Observable.ajax({
        url: 'http://localhost:3000/car-quotes',
        body: action.payload.quote,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .map(res => carFetchStart(res.response.id, action.payload.quote))
        .catch(error => console.log('Error: ', error)));

export default carFetchEpic;
