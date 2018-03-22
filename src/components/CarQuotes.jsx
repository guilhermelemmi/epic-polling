import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Col,
  Divider,
  Row,
  Switch,
} from 'antd';
import { DEFAULT_ENTITY_SHAPE } from '../constants';

class CarQuotes extends Component {
  static propTypes = {
    arrivalAirportId: PropTypes.number.isRequired,
    carQuotes: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    cars: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    fromDate: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onQuote: PropTypes.func.isRequired,
    onSelectCarQuote: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
    toDate: PropTypes.string.isRequired,
    selectedCarQuote: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    selectedCarQuote: undefined,
  };

  componentDidMount() {
    const {
      arrivalAirportId,
      cars,
      fromDate,
      onQuote,
      toDate,
    } = this.props;

    cars.ids.forEach((carId) => {
      onQuote({
        carId,
        userId: 1,
        airportId: arrivalAirportId,
        from: fromDate,
        to: toDate,
      });
    });
  }

  renderCarQuotes() {
    const {
      carQuotes,
      cars,
      onSelectCarQuote,
      selectedCarQuote,
    } = this.props;

    const selectedId = selectedCarQuote ? selectedCarQuote.id : undefined;
    return carQuotes.ids.map((carQuoteId) => {
      const quote = carQuotes.content[carQuoteId];
      const car = cars.content[quote.carId];
      const cardStyle = { width: 150, cursor: 'pointer' };
      if (carQuoteId === selectedId) {
        cardStyle.border = '3px solid red';
      }
      return car ? (
        <Col
          key={`car-quote-${carQuoteId}`}
          lg={{ span: 6, offset: 2 }}
        >
          <Card
            style={cardStyle}
            onClick={() => onSelectCarQuote(quote)}
          >
            <h4>{car.model}</h4>
            {quote.amount ? `US$ ${quote.amount}` : 'Quoting...'}
          </Card>
        </Col>
      ) : undefined;
    });
  }

  render() {
    const {
      isDisabled,
      onDisable,
    } = this.props;

    const carQuotes = this.renderCarQuotes();
    return (
      <Row>
        <Col span={12} offset={6}>
          <Divider />
          <Switch
            checked={!isDisabled}
            defaultChecked
            onChange={onDisable}
          />
          <h3 style={{ display: 'inline', marginLeft: 20 }}>Rent a car</h3>
          <div style={{
            marginTop: 20,
            display: this.props.isDisabled ? 'none' : 'block',
          }}>
            <Row>{carQuotes}</Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default CarQuotes;
