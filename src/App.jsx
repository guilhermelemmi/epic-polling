import React from 'react';
import { Provider } from 'react-redux';
import BookingUI from './components/BookingUI';

import store from './store';

const App = () => (
  <Provider store={store}>
    <BookingUI />
  </Provider>
);

export default App;
