import React from 'react';
import NavBar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import bH from 'react-router/lib/browserHistory';

export default function () {
  return (
    <div>
      <NavBar fixedTop fluid>
        <NavBar.Header>
          <NavBar.Brand>
            <a href="#">React-Bootstrap-Widgets</a>
          </NavBar.Brand>
          <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Collapse>
          <Nav onSelect={(p, e) => {e.preventDefault(); bH.push(p);}}>
            <NavItem eventKey={'/intro.html'} href="#">简介</NavItem>
            <NavItem eventKey={'/widgets.html'} href="#">组件</NavItem>
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    </div>
  );
}
