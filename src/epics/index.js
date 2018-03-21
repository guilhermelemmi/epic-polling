import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { carFetchEpic, carFetchFailEpic, carFetchSucessfulEpic, carPostQuote } from './carQuotes';

const epics = combineEpics(
  carFetchEpic,
  carFetchFailEpic,
  carFetchSucessfulEpic,
  carPostQuote,
);
const epicMiddleware = createEpicMiddleware(epics);

export default epicMiddleware;
