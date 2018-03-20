import React from 'react';
import { Provider } from 'react-redux';
import CarQuotes from './components/CarQuotes';

import store from './store';

const App = () => (
  <Provider store={store}>
    <CarQuotes />
  </Provider>
);

export default App;
