import React from 'react';
import NavBar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

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
          <Nav>
            <NavItem eventKey={1} href="#">Introduction</NavItem>
            <NavItem eventKey={2} href="#">Widgets</NavItem>
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    </div>
  );
}