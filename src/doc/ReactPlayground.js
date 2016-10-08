const React = require('react');
const ReactDOM = require('react-dom');

/* eslint-disable */
const _Table = require('../lib/Table');
const _Dialog = require('../lib/Dialog');
const _Form = require('../lib/Form');
const _Confirm = require('../lib/Confirm');
const SafeAnchor = require('react-bootstrap/lib/SafeAnchor');
const Alert = require('react-bootstrap/lib/Alert');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
const Popover = require('react-bootstrap/lib/Popover');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Tooltip = require('react-bootstrap/lib/Tooltip');

const Table = _Table.default;
const Dialog = _Dialog.default;
const Form = _Form.default;
const Confirm = _Confirm.default;

console.info(Table.propsData);

const bootstrapUtils = require('react-bootstrap/lib/utils/bootstrapUtils');
/* eslint-enable */

import {transform} from 'babel-standalone';
import CodeExample, { CodeMirror } from './CodeExample';

const IS_MOBILE = typeof navigator !== 'undefined' && (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  );

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (IS_MOBILE || CodeMirror === undefined) {
      return;
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'jsx',
      lineNumbers: false,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    // wrap in a div to fully contain CodeMirror
    let editor;

    if (IS_MOBILE) {
      editor = (
        <CodeExample
          mode="jsx"
          codeText={this.props.codeText}
        />
      );
    } else {
      editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
    }

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
      );
  }
}

const selfCleaningTimeout = {
  componentDidUpdate() {
    clearTimeout(this.timeoutID);
  },

  updateTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  }
};

const ReactPlayground = React.createClass({
  mixins: [selfCleaningTimeout],

  propTypes: {
    codeText: React.PropTypes.string.isRequired,
    transformer: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      transformer(code) {
        return transform(code, {
          // TODO: Use preset options once babel-standalone v6.13 is released.
          presets: ['es2015-loose', 'react', 'stage-1']
        }).code;
      }
    };
  },

  getInitialState() {
    return {
      code: this.props.codeText,
      codeChanged: false
    };
  },

  componentWillMount() {
    // For the initial render, we can hijack React.render to intercept the
    // example element and render it normally. This is safe because it's code
    // that we supply, so we can ensure ahead of time that it won't throw an
    // exception while rendering.
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => this._initialExample = element;

    // Stub out mountNode for the example code.
    const mountNode = null;  // eslint-disable-line no-unused-vars
    try {
      const compiledCode = this.props.transformer(this.props.codeText);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } finally {
      ReactDOM.render = originalRender;
    }
  },

  componentWillUnmount() {
    this.clearExample();
  },

  handleCodeChange(value) {
    this.setState(
      {code: value, codeChanged: true},
      this.executeCode
    );
  },

  render() {
    return (
      <div className="playground">
        {this.renderExample()}
        {this.renderEditor()}
      </div>
    );
  },

  renderExample() {
    let example;
    if (this.state.codeChanged) {
      example = (
        <div ref="mount" />
      );
    } else {
      example = (
        <div>{this._initialExample}</div>
      );
    }
    let className = 'example';
    if (this.props.exampleClassName) {
      className = `${className} ${this.props.exampleClassName}`;
    }
    return (
      <div className={className}>
        {example}
      </div>
    );
  },

  renderEditor() {
    return (
      <CodeMirrorEditor
        key="jsx"
        onChange={this.handleCodeChange}
        className="highlight"
        codeText={this.state.code}
      />
    );
  },

  clearExample() {
    if (!this.state.codeChanged) {
      return null;
    }

    const mountNode = this.refs.mount;
    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }

    return mountNode;
  },

  executeCode() {
    const mountNode = this.clearExample();

    let compiledCode = null;
    try {
      compiledCode = this.props.transformer(this.state.code);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } catch (err) {
      if (compiledCode !== null) {
        console.log(err, compiledCode); // eslint-disable-line no-console
      } else {
        console.log(err); // eslint-disable-line no-console
      }

      this.updateTimeout(
        () => {
          ReactDOM.render(
            <Alert bsStyle="danger">
              {err.toString()}
            </Alert>,
            mountNode
          );
        },
        500
      );
    }
  }
});

export default ReactPlayground;
