import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RegisterAuction: React.FC = () => {
    const [name, setName] = useState('');
    const [productId, setProductId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startingBid, setStartingBid] = useState(0);
    const [currentBid, setCurrentBid] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = async () => {
        // Replace with your actual post call
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                product_id: productId,
                user_id: userId,
                start_date: startDate,
                end_date: endDate,
                starting_bid: startingBid,
                current_bid: currentBid,
                is_active: isActive
            }),
        });
        console.log(JSON.stringify({
            name,
            product_id: productId,
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            starting_bid: startingBid,
            current_bid: currentBid,
            is_active: isActive
        }));
        if (response.ok) {
            alert('Auction registered successfully!');
        }
    };

    return (
        <Form>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formProductId">
                <Form.Label>Product ID</Form.Label>
                <Form.Control type="number" value={productId} onChange={(e) => setProductId(Number(e.target.value))} />
            </Form.Group>

            <Form.Group controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="number" value={userId} onChange={(e) => setUserId(Number(e.target.value))} />
            </Form.Group>

            <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formStartingBid">
                <Form.Label>Starting Bid</Form.Label>
                <Form.Control type="number" value={startingBid} onChange={(e) => setStartingBid(Number(e.target.value))} />
            </Form.Group>

            <Form.Group controlId="formCurrentBid">
                <Form.Label>Current Bid</Form.Label>
                <Form.Control type="number" value={currentBid} onChange={(e) => setCurrentBid(Number(e.target.value))} />
            </Form.Group>

            <Form.Group controlId="formIsActive">
                <Form.Label>Is Active</Form.Label>
                <Form.Check type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
                Register
            </Button>
        </Form>
    );
};

export default RegisterAuction;