import React from 'react'
import {Container,Row,Col,Button,Navbar,Nav,NavDropdown,Form,FormControl} from 'react-bootstrap';

export const Header = () => {

  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="#" >comeOn</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="#" >Profile</Nav.Link>
                <Nav.Link href="#" >Signout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}
