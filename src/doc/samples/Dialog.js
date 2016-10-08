export default `
class DialogDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }

  buttons = [
    {
      text: '取消',
      onClick: () => this.handleHideDialog(),
    },
    {
      text: '确认',
      bsStyle: 'primary',
      onClick: () => this.handleHideDialog(),
    }
  ];

  handleShowDialog() {
    this.setState({ showDialog: true });
  }

  handleHideDialog() {
    this.setState({ showDialog: false });
  }

  render() {
    return (
      <div>
        <Dialog
          show={this.state.showDialog}
          title="弹出框标题"
          buttons={this.buttons}
          onHide={() => this.handleHideDialog()}
        >
          <div>
          	<h4>弹出框的内容</h4>
	          <p>盼望着，盼望着，东风来了，春天的脚步近了。</p>
            <p>一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。</p>
          </div>
				</Dialog>

        <Button
          bsStyle="primary"
          onClick={() => this.handleShowDialog()}
        >
          弹出对话框
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<DialogDemo />, mountNode);
`;
