
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';



const Checkout: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [receivingOption, setReceivingOption] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Checkout submitted');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formAddress">
                <Form.Label>Detailed Address</Form.Label>
                <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formReceivingOption">
                <Form.Label>Receiving Option</Form.Label>
                <Form.Select value={receivingOption} onChange={(e) => setReceivingOption(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="pickup">In-store pickup</option>
                    <option value="ship">Ship to above address</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="debit">Debit card</option>
                    <option value="visa">Visa</option>
                    <option value="cod">Cash on delivery (COD)</option>
                </Form.Select>
            </Form.Group>

            {paymentMethod === 'debit' || paymentMethod === 'visa' ? (
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </Form.Group>
            ) : null}

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );

};

export default Checkout;
