import PropTypes from 'prop-types';

export const API_URL = 'http://localhost:3000';

export const QUOTE_STATUS = {
  QUOTED: 'quoted',
};

export const ORDER_STATUS = {
  CONFIRMED: 'confirmed',
};

export const DEFAULT_ENTITY = { ids: [], content: {} };

export const DEFAULT_ENTITY_SHAPE = {
  ids: PropTypes.array,
  content: PropTypes.object,
};

export const AIRPORT_SHAPE = {
  id: PropTypes.number,
  icao: PropTypes.string,
  name: PropTypes.string,
};

export const DEFAULT_QUOTE_SHAPE = {
  id: PropTypes.number.isRequired,
  amount: PropTypes.number,
};
