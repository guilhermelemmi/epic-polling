import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

const OrderConfirmation = ({ order, onClose }) => (
  <Modal
      title="Order confirmation"
      visible={!!order.id}
      onOk={onClose}
      closable={false}
      footer={null}
    >
      <div>
        {order && order.status === 'confirmed' ?
          (
            <div>
              <h3>Your order has been confirmed!</h3>
              <strong>Order ID:</strong><span>{order.id}</span>
            </div>
          ) : <h3>Your order is being created...</h3>}
        <Button
          type="primary"
          onClick={onClose}
          disabled={!order || order.status !== 'confirmed'}
        >
          Ok
        </Button>
      </div>
  </Modal>
);

OrderConfirmation.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

OrderConfirmation.defaultProps = {
  order: undefined,
};

export default OrderConfirmation;
