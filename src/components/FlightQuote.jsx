import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
} from 'antd';

import {
  AIRPORT_SHAPE,
  DEFAULT_ENTITY_SHAPE,
} from '../constants';

class FlightQuote extends Component {
  static propTypes = {
    airports: PropTypes.shape(DEFAULT_ENTITY_SHAPE).isRequired,
    arrivalAirport: PropTypes.shape(AIRPORT_SHAPE),
    departureAirport: PropTypes.shape(AIRPORT_SHAPE),
    fromDate: PropTypes.string,
    isActiveQuote: PropTypes.bool.isRequired,
    onArrivalAirportChange: PropTypes.func.isRequired,
    onDepartureAirportChange: PropTypes.func.isRequired,
    onFromDateChange: PropTypes.func.isRequired,
    onQuote: PropTypes.func.isRequired,
    onToDateChange: PropTypes.func.isRequired,
    toDate: PropTypes.string,
  };

  static defaultProps = {
    arrivalAirport: undefined,
    departureAirport: undefined,
    fromDate: '',
    toDate: '',
  };

  getAirportOptions(key) {
    const { airports } = this.props;
    return airports.ids.map((airportId) => {
      const airport = airports.content[airportId];
      return (
        <Select.Option
          key={`${key}-${airport.icao}`}
          value={airport.id}
        >
          {airport.name}
        </Select.Option>
      );
    });
  }

  formItemLayout = {
    labelCol: { sm: { span: 3 } },
    wrapperCol: { sm: { span: 21 } },
  };

  handleQuote = () => {
    const {
      arrivalAirport,
      departureAirport,
      fromDate,
      onQuote,
      toDate,
    } = this.props;

    onQuote({
      userId: 1,
      arrivalAirportIcao: arrivalAirport.icao,
      departureAirportIcao: departureAirport.icao,
      from: fromDate,
      to: toDate,
    });
  }

  render() {
    const {
      airports,
      arrivalAirport,
      departureAirport,
      fromDate,
      isActiveQuote,
      onArrivalAirportChange,
      onDepartureAirportChange,
      onFromDateChange,
      onToDateChange,
      toDate,
    } = this.props;

    const departureAirportOptions = this.getAirportOptions('departure');
    const arrivalAirportOptions = this.getAirportOptions('arrival');
    return (
      <Row>
        <Col span={12} offset={6}>
          <h2 style={{ textAlign: 'center' }}>Book a Flight</h2>
          <Form layout="horizontal">
            <Form.Item
              {...this.formItemLayout}
              label="Departure"
            >
              <Select
                value={departureAirport.name}
                onChange={(val) => {
                  const airport = airports.content[val];
                  onDepartureAirportChange(airport);
                }}
              >
                {departureAirportOptions}
              </Select>
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="Arrival"
            >
              <Select
                value={arrivalAirport.name}
                onChange={(val) => {
                  const airport = airports.content[val];
                  onArrivalAirportChange(airport);
                }}
              >
                {arrivalAirportOptions}
              </Select>
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="From"
            >
              <DatePicker
                value={fromDate ? moment(fromDate, 'YYYY-MM-DD') : null}
                onChange={(date, dateStr) => onFromDateChange(dateStr)}
              />
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="To"
            >
              <DatePicker
                value={toDate ? moment(toDate, 'YYYY-MM-DD') : null}
                onChange={(date, dateStr) => onToDateChange(dateStr)}
              />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={this.handleQuote}
                >
                  {isActiveQuote ? 'Update Quote' : 'Request Quote'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default FlightQuote;
