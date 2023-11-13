import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RegisterProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    // Replace with your actual post call
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, type, image_url: imageUrl }),
    });

    if (response.ok) {
      alert('Product registered successfully!');
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
};

export default RegisterProduct;