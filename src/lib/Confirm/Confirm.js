import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Dialog from '../Dialog';

class Confirm extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          title={this.props.title}
          show={this.props.show}
          buttons={[
            {
              text: '取消',
              onClick: () => this.props.onConfirm(false),
            },
            {
              text: '确认',
              onClick: () => this.props.onConfirm(true),
            },
          ]}
        >
          <Alert
            style={{ marginBottom: 0 }}
            bsStyle={this.props.style}
          >{this.props.message}</Alert>
        </Dialog>
      </div>
    );
  }
}

Confirm.propTypes = {

  /**
   * Weather to show confirm dialog.
   */
  show: React.PropTypes.bool,

  /**
   * Title of the confirm dialog.
   */
  title: React.PropTypes.string,

  /**
   * bsStyle of the confirm.
   */
  style: React.PropTypes.string,

  /**
   * Confirm message.
   */
  message: React.PropTypes.string,

  /**
   * Confirm result callback.
   */
  onConfirm: React.PropTypes.func,
};

Confirm.defaultProps = {
  title: false,
  show: false,
  type: 'danger',
  message: 'Are you sure?',
  onConfirm: () => null,
};

export default Confirm;
