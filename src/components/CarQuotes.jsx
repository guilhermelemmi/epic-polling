import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postCarQuote } from '../actions/carQuotes';

class CarQuotes extends Component {
  state = {
    quote: {
      userId: 1,
      airportId: 1,
      carId: 1,
      from: '2018-03-17',
      to: '2018-03-23',
    },
  }

  render() {
    const {
      quote,
      createQuote,
    } = this.props;

    return (
      <div>
        <h1> Booking UI </h1>
        <textarea
          id="car-quote"
          defaultValue={JSON.stringify(this.state.quote)}
          cols="50"
          rows="10"
        />
        <div>
          {quote.status === 'in_progress' ? 'Quoting...' : `US$ ${quote.amount || 0}`}
        </div>
        <input
          type="button"
          value="Quote"
          onClick={() => createQuote(this.state.quote)}
        />
      </div>
    );
  }
}

CarQuotes.propTypes = {
  quote: PropTypes.shape({
    amount: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  createQuote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  quote: state.carQuotes.ids.length ?
    state.carQuotes.content[state.carQuotes.ids[state.carQuotes.ids.length - 1]] : {},
});

const mapDispatchToProps = dispatch => ({
  createQuote: quote => dispatch(postCarQuote(quote)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarQuotes);
