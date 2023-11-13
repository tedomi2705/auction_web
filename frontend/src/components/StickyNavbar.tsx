import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StickyNavbar: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem('login');
    const username = localStorage.getItem('username');
    if (login === 'true' && username) {
      setUsername(username);
      setLogin(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      // save login state
      const data = await response.json();
      localStorage.setItem('username', username);
      localStorage.setItem('login', 'true');
      localStorage.setItem('id', data.id)
      console.log(data)
      setLogin(true);
      window.location.reload();
    } else {
      setErrorMessage('Wrong username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    setLogin(false);
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/" className='ms-4'>MKAuction</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/auction" className='nav-link'>Auction List</Link>
          <NavDropdown title="Payment" id="basic-nav-dropdown">

            <NavDropdown.Item as={Link} to="/checkout" >Checkout</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/paymentstatus" >Payment status</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Admin" id="basic-nav-dropdown">

            <NavDropdown.Item as={Link} to="/checkout" >Checkout</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/viewpaymentstatus" >View payment status</NavDropdown.Item>
            <NavDropdown.Item href="/updateproductstatus">Update payment status</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/registerproduct" >Register product</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/registerauction" >Register auction</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className='ms-auto me-5'>

          {login ? (
            <NavDropdown align="end" title={`Welcome, ${username}`}>
              <NavDropdown.Item as={Link} to="/profile" >Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} >Sign out</NavDropdown.Item>
            </NavDropdown>) :

            <><Dropdown>
              <Dropdown.Toggle as={Nav.Link} variant="success" id="dropdown-basic">
                Login
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: '350px' }} align="end" >
                <Form className="px-3" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default StickyNavbar;