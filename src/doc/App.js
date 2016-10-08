import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

class App extends React.PureComponent {
  render() {
    return (
      <div id="app">
        <Header/>
        <div className="sidebar">
          <Navigation href={this.props.location.pathname} />
        </div>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
