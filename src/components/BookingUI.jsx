import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCars } from '../actions/cars';
import { fetchHotels } from '../actions/hotels';
import { fetchAirports } from '../actions/airports';
import { postFlightQuote } from '../actions/flightQuote';
import { postCarQuote } from '../actions/carQuotes';
import { postHotelQuote } from '../actions/hotelQuotes';
import { confirmOrder, resetOrder } from '../actions/orders';
import {
  DEFAULT_ENTITY,
  DEFAULT_ENTITY_SHAPE,
  INITIAL_APP_STATE,
  QUOTE_STATUS,
} from '../constants';

import FlightQuote from './FlightQuote';
import CarQuotes from './CarQuotes';
import HotelQuotes from './HotelQuotes';
import Totals from './Totals';
import OrderConfirmation from './OrderConfirmation';

class BookingUI extends Component {
  static propTypes = {
    airports: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    carQuotes: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    cars: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    fetchAirports: PropTypes.func.isRequired,
    fetchCars: PropTypes.func.isRequired,
    fetchHotels: PropTypes.func.isRequired,
    flightQuote: PropTypes.shape({
      userId: PropTypes.number,
      arrivalAirportIcao: PropTypes.string,
      departureAirportIcao: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    order: PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string,
    }).isRequired,
    hotelQuotes: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    hotels: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    quoteCar: PropTypes.func.isRequired,
    quoteFlight: PropTypes.func.isRequired,
    quoteHotel: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
    clearOrder: PropTypes.func.isRequired,
  };

  state = INITIAL_APP_STATE;

  componentDidMount() {
    this.props.fetchAirports();
    this.props.fetchCars();
    this.props.fetchHotels();
  }

  componentWillReceiveProps(nextProps) {
    const {
      carQuotes,
      hotelQuotes,
    } = nextProps;

    const finishedCarQuoteIds = carQuotes.ids.filter(id => (
      carQuotes.content[id].status === QUOTE_STATUS.QUOTED
    ));
    if (finishedCarQuoteIds.length) {
      this.setState({
        selectedCarQuote: carQuotes.content[finishedCarQuoteIds[0]],
      });
    }

    const finishedHotelQuoteIds = hotelQuotes.ids.filter(id => (
      hotelQuotes.content[id].status === QUOTE_STATUS.QUOTED
    ));
    if (finishedHotelQuoteIds.length) {
      this.setState({
        selectedHotelQuote: hotelQuotes.content[finishedHotelQuoteIds[0]],
      });
    }
  }

  handleArrivalAirportChange = (airport) => {
    this.setState({ arrivalAirport: airport });
  }

  handleDepartureAirportChange = (airport) => {
    this.setState({ departureAirport: airport });
  }

  handleFromDateChange = (fromDate) => {
    this.setState({ fromDate });
  }

  handleToDateChange = (toDate) => {
    this.setState({ toDate });
  }

  handleSelectCarQuote = (quote) => {
    this.setState({ selectedCarQuote: quote });
  }

  handleSelectHotelQuote = (quote) => {
    this.setState({ selectedHotelQuote: quote });
  }

  handleDisableCar = (isEnabled) => {
    this.setState({ isCarDisabled: !isEnabled });
  }

  handleDisableHotel = (isEnabled) => {
    this.setState({ isHotelDisabled: !isEnabled });
  }

  handleConfirmOrder = () => {
    const {
      selectedCarQuote,
      selectedHotelQuote,
    } = this.state;
    this.props.createOrder({
      userId: 1,
      flightQuoteId: this.props.flightQuote.id,
      carQuoteId: selectedCarQuote ? selectedCarQuote.id : null,
      hotelQuoteId: selectedHotelQuote ? selectedHotelQuote.id : null,
    });
  }

  handleClearOrder = () => {
    this.props.clearOrder();
    this.setState(INITIAL_APP_STATE);
  }

  render() {
    const {
      airports,
      carQuotes,
      cars,
      flightQuote,
      hotelQuotes,
      hotels,
      quoteCar,
      quoteFlight,
      quoteHotel,
      order,
    } = this.props;

    const {
      arrivalAirport,
      departureAirport,
      fromDate,
      selectedCarQuote,
      selectedHotelQuote,
      toDate,
      isCarDisabled,
      isHotelDisabled,
    } = this.state;

    return (
      <div>
        <FlightQuote
          airports={airports}
          arrivalAirport={arrivalAirport}
          departureAirport={departureAirport}
          fromDate={fromDate}
          isActiveQuote={!!flightQuote.id}
          onArrivalAirportChange={this.handleArrivalAirportChange}
          onDepartureAirportChange={this.handleDepartureAirportChange}
          onFromDateChange={this.handleFromDateChange}
          onQuote={quoteFlight}
          onToDateChange={this.handleToDateChange}
          toDate={toDate}
        />
        {flightQuote.id && (
          <div>
            <CarQuotes
              arrivalAirportId={arrivalAirport.id}
              carQuotes={carQuotes}
              cars={cars}
              fromDate={fromDate}
              isDisabled={isCarDisabled}
              onDisable={this.handleDisableCar}
              onQuote={quoteCar}
              onSelectCarQuote={this.handleSelectCarQuote}
              selectedCarQuote={selectedCarQuote}
              toDate={toDate}
            />
            <HotelQuotes
              fromDate={fromDate}
              hotelQuotes={hotelQuotes}
              hotels={hotels}
              isDisabled={isHotelDisabled}
              onDisable={this.handleDisableHotel}
              onQuote={quoteHotel}
              onSelectHotelQuote={this.handleSelectHotelQuote}
              selectedHotelQuote={selectedHotelQuote}
              toDate={toDate}
            />
            <Totals
              carQuote={selectedCarQuote}
              flightQuote={flightQuote}
              hotelQuote={selectedHotelQuote}
              isCarDisabled={isCarDisabled}
              isHotelDisabled={isHotelDisabled}
              onOrder={this.handleConfirmOrder}
            />
            <OrderConfirmation order={order} onClose={this.handleClearOrder} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  airports: state.airports || DEFAULT_ENTITY,
  carQuotes: state.carQuotes || DEFAULT_ENTITY,
  cars: state.cars || DEFAULT_ENTITY,
  flightQuote: state.flightQuote,
  hotelQuotes: state.hotelQuotes || DEFAULT_ENTITY,
  hotels: state.hotels || DEFAULT_ENTITY,
  order: state.orders,
});

const mapDispatchToProps = dispatch => ({
  createOrder: order => dispatch(confirmOrder(order)),
  clearOrder: () => dispatch(resetOrder()),
  fetchAirports: () => dispatch(fetchAirports()),
  fetchCars: () => dispatch(fetchCars()),
  fetchHotels: () => dispatch(fetchHotels()),
  quoteCar: quote => dispatch(postCarQuote(quote)),
  quoteFlight: quote => dispatch(postFlightQuote(quote)),
  quoteHotel: quote => dispatch(postHotelQuote(quote)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingUI);
