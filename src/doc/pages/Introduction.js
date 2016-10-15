import React from 'react';
import Widgets from './Widgets';
import CodeExample from '../CodeExample';

class Introduction extends React.Component {
  render() {
    return (
      <div>
        <h1>React Bootstrap Widgets - 简介</h1>
        <p>
          React-Bootstrap-Widgets, 如它的名字所示, 是基于
          <a href="http://react-bootstrap.github.io/">React-Bootstrap</a>
          的一套 React 组件。
        </p>
        <p>
          React-Bootstrap 只是提供了对 Bootstrap 组件的 React 化封装, 为了提高开发的灵活性,
          封装程度比较低, 适应于所有的开发场景, 所有的交互方式。
        </p>
        <p>
          React-Bootstrap-Widgets 说成是对 React-Bootstrap 的扩展更合适, 因为当你在使用该组件库时,
          可以同时使用 React-Bootstrap 的组件。
        </p>
        <p>
          React-Bootstrap-Widgets 主要价值是对 Bootstrap 的一下常见的使用场景进行封住、组件化, 进一步提高开发的效率。
          但是封装程度的提升必然会带来灵活性的降低, 用户可以按照实际应用场景来选择是否使用 React-Bootstrap-Widgets。
        </p>

        <h3>安装</h3>
        <CodeExample codeText="npm install react-bootstrap-widgets" />

        <Widgets/>
        <hr />
        <p>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=react-bootstrap-widgets&repo=react-bootstrap-widgets&type=star&count=true"
            frameBorder="0" scrolling="0" width="170px" height="20px"
          />
        </p>
      </div>
    );
  }
}

Introduction.propTypes = {};
Introduction.defaultProps = {};

export default Introduction;
