import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [is_authenticated, setIs_authenticated] = useState(false);
  const [is_admin, setIs_admin] = useState(false);


  useEffect(() => {
    // fetch user profile
    const fetchProfile = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/' + localStorage.getItem('id'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setPassword(data.password);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setDate_of_birth(data.date_of_birth);
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
        setIs_authenticated(data.is_authenticated);
        setIs_admin(data.is_admin);
      } else {
        const data = await response.json();
        setErrorMessage(data.detail);
      }
    };
    fetchProfile();
  }
    , []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/' + localStorage.getItem('id'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email, phone, date_of_birth, first_name, last_name, address, is_authenticated, is_admin })
    });
    console.log('body', JSON.stringify({ username, password, email, phone, date_of_birth, first_name, last_name, address, is_authenticated, is_admin }))
    if (response.ok) {
      // back to home page
      setErrorMessage('OK');

    } else {
      const data = await response.json();
      setErrorMessage(data.detail.toString());
    }

  };
  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" value={first_name} onChange={e => setFirstName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" value={last_name} onChange={e => setLastName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicDob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control type="date" value={date_of_birth} onChange={e => setDate_of_birth(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      {errorMessage && <div className="text-danger">{errorMessage}</div>}

      <Button variant="primary" type="submit">
        update
      </Button>
    </Form>
  );
};

export default Profile;