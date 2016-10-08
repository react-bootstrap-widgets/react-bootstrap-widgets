import React from 'react';
import Link from 'react-router/lib/Link';

class Introduction extends React.Component {
  render() {
    return (
      <div>
        <h1>React Bootstrap Widgets - 简介</h1>
        <p>
          基于 <a href="http://react-bootstrap.github.io/">React-Bootstrap</a>, 封装了如下常用的组件, 以或许更高的开发效率。
        </p>
      </div>
    );
  }
}

Introduction.propTypes = {};
Introduction.defaultProps = {};

export default Introduction;
