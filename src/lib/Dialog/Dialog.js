import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class Dialog extends React.Component {

  render() {
    const { title, buttons, ...modalProps } = this.props;
    return (
      <Modal {...modalProps}>
        {title && (
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        <Modal.Footer>
          {
            buttons.map((button, index) => {
              const { text, ...buttonProps } = button;
              return <Button key={index} {...buttonProps}>{text}</Button>;
            })
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

Dialog.propTypes = {

  /**
   * Dialog header title, disabled when title == false.
   */
  title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),

  /**
   * Dialog buttons. React-Bootstrap Button props and 'text'.
   */
  buttons: React.PropTypes.arrayOf(React.PropTypes.object),
};

Dialog.defaultProps = {
  title: false,
  buttons: [],
};

export default Dialog;
