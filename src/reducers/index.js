import { combineReducers } from 'redux';
import flightQuote from './flightQuote';
import carQuotes from './carQuotes';
import hotelQuotes from './hotelQuotes';
import cars from './cars';
import hotels from './hotels';
import airports from './airports';

export default combineReducers({
  flightQuote,
  carQuotes,
  hotelQuotes,
  cars,
  hotels,
  airports,
});
