
import React, { useEffect, useState } from 'react';
import Auction from './Auction';
import { Button, Form } from 'react-bootstrap';
// import BidForm from './BidForm';
// import CurrentBid from './CurrentBid';

interface AuctionData {
    id: number;
    // Add other properties of the auction data here
}

const ViewPaymentStatus: React.FC = () => {
    const handlePaidStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPaidStatus(event.target.value);
    };
    const [paidStatus, setPaidStatus] = useState('');


    const [auctions, setAuctions] = useState<AuctionData[]>([]);
    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auctions');
            if (response.ok) {
                const data = await response.json();
                setAuctions(data);
            }
        };

        fetchAuctions();
    }, []);

    return (
        <Form>
            <Auction id={1} />
            <Form.Select value={paidStatus} onChange={handlePaidStatusChange}>
                <h3>Status: Paid</h3>
                <option value="">Select paid status...</option>
                <option value="Paid">Paid</option>
                <option value="Not Paid">Not Paid</option>
            </Form.Select>
            <Button> Update</Button>
        </Form>
    );
};

export default ViewPaymentStatus;
