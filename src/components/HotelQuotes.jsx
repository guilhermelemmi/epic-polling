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

class HotelQuotes extends Component {
  static propTypes = {
    fromDate: PropTypes.string.isRequired,
    hotelQuotes: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    hotels: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onQuote: PropTypes.func.isRequired,
    onSelectHotelQuote: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
    toDate: PropTypes.string.isRequired,
    selectedHotelQuote: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    selectedHotelQuote: undefined,
  };

  componentDidMount() {
    const {
      fromDate,
      hotels,
      onQuote,
      toDate,
    } = this.props;

    hotels.ids.forEach((hotelId) => {
      onQuote({
        hotelId,
        userId: 1,
        from: fromDate,
        to: toDate,
      });
    });
  }

  renderHotelQuotes() {
    const {
      hotelQuotes,
      hotels,
      onSelectHotelQuote,
      selectedHotelQuote,
    } = this.props;

    const selectedId = selectedHotelQuote ? selectedHotelQuote.id : undefined;
    return hotelQuotes.ids.map((hotelQuoteId) => {
      const quote = hotelQuotes.content[hotelQuoteId];
      const hotel = hotels.content[quote.hotelId];
      const cardStyle = { width: 150, cursor: 'pointer' };
      if (hotelQuoteId === selectedId) {
        cardStyle.border = '3px solid red';
      }
      return hotel ? (
        <Col
          key={`hotel-quote-${hotelQuoteId}`}
          lg={{ span: 6, offset: 2 }}
        >
          <Card
            style={cardStyle}
            onClick={() => onSelectHotelQuote(quote)}
          >
            <h4>{hotel.name}</h4>
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

    const hotelQuotes = this.renderHotelQuotes();
    return (
      <Row>
        <Col span={12} offset={6}>
          <Divider />
          <Switch
            checked={!isDisabled}
            defaultChecked
            onChange={onDisable}
          />
          <h3 style={{ display: 'inline', marginLeft: 20 }}>Book hotel</h3>
          <div style={{
            marginTop: 20,
            display: this.props.isDisabled ? 'none' : 'block',
          }}>
            <Row>{hotelQuotes}</Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default HotelQuotes;
