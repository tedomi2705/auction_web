import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Auction from './Auction';

const UpdateProductStatus: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async () => {
        // Replace with your actual update call
        const response = await fetch('https://api.example.com/updateProductStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (response.ok) {
            alert('Product status updated successfully!');
        }
    };

    return (
        <Form>
            <Auction id={1} />
            <Form.Group controlId="formStatus">
                <Form.Label>Product Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Received">Received</option>
                    <option value="Not Received">Not Received</option>
                </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
                Update
            </Button>
        </Form>
    );
};

export default UpdateProductStatus;