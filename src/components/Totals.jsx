import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Table,
  Row,
  Col,
  Divider,
} from 'antd';
import { DEFAULT_QUOTE_SHAPE } from '../constants';

class Totals extends Component {
  static propTypes = {
    carQuote: PropTypes.shape(DEFAULT_QUOTE_SHAPE),
    flightQuote: PropTypes.shape(DEFAULT_QUOTE_SHAPE).isRequired,
    hotelQuote: PropTypes.shape(DEFAULT_QUOTE_SHAPE),
    isCarDisabled: PropTypes.bool.isRequired,
    isHotelDisabled: PropTypes.bool.isRequired,
    onOrder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    carQuote: undefined,
    hotelQuote: undefined,
  };

  columns = [
    {
      title: 'Item',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Item Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  render() {
    const {
      carQuote,
      flightQuote,
      hotelQuote,
      isCarDisabled,
      isHotelDisabled,
      onOrder,
    } = this.props;

    const dataSource = [];
    let dataSourceKey = 0;
    let total = 0;
    if (flightQuote) {
      total += flightQuote.amount || 0;
      dataSource.push({
        key: dataSourceKey++, // eslint-disable-line no-plusplus
        description: 'Flight',
        value: flightQuote.amount ? `US$ ${flightQuote.amount}` : 'Quoting...',
      });
    }

    if (carQuote && !isCarDisabled) {
      total += carQuote.amount || 0;
      dataSource.push({
        key: dataSourceKey++, // eslint-disable-line no-plusplus
        description: 'Car',
        value: carQuote.amount ? `US$ ${carQuote.amount}` : 'Quoting...',
      });
    }

    if (hotelQuote && !isHotelDisabled) {
      total += hotelQuote.amount || 0;
      dataSource.push({
        key: dataSourceKey++, // eslint-disable-line no-plusplus
        description: 'Hotel',
        value: hotelQuote.amount ? `US$ ${hotelQuote.amount}` : 'Quoting...',
      });
    }

    dataSource.push({
      key: dataSourceKey++, // eslint-disable-line no-plusplus
      description: 'Total',
      value: total ? `US$ ${total}` : 'Quoting...',
    });

    return (
      <Row>
        <Col span={12} offset={6}>
          <Divider />
          <Table
            dataSource={dataSource}
            columns={this.columns}
            pagination={false}
          />
          <div style={{ marginTop: 20, marginBottom: 20, textAlign: 'right' }}>
            <Button type="primary" onClick={onOrder}>Confirm Order</Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Totals;
