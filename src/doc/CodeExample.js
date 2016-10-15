import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/jsx/jsx';

export {CodeMirror};

export default class CodeExample extends React.Component {
  render() {
    return (
      <pre className="cm-s-solarized cm-s-light" style={{ display: this.props.inline ? 'inline' : 'block' }}>
        <code>
          {this.props.codeText}
        </code>
      </pre>
    );
  }

  componentDidMount() {
    if (CodeMirror === undefined) {
      return;
    }

    CodeMirror.runMode(
      this.props.codeText,
      this.props.mode,
      ReactDOM.findDOMNode(this).children[0]
    );
  }
}
