class ConfirmDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,
      result: null,
    };
  }

  handleShowConfirm() {
    this.setState({ showConfirm: true });
  }

  handleConfirm(ret) {
    this.setState({ result: ret });
  }

  render() {
    return (
      <div>
        <p>
          <Button onClick={() => this.handleShowConfirm()}>Show Confirm</Button>
        </p>
        <p>
          Confirm Result: <strong className="text-danger">{this.state.result}</strong>
        </p>
        <Confirm
          show={this.state.showConfirm}
          message={this.state}
          conConfim={ret => this.handleConfirm(ret)}
        />
      </div>
    );
  }
}

ReactDOM.render(<ConfirmDemo />, mountNode);
