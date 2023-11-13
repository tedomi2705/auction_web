import React, { useEffect, useState } from 'react';
import { Badge, Card, Form, Button, Dropdown } from 'react-bootstrap';

interface AuctionProps {
    id: number;
}


const Auction: React.FC<AuctionProps> = ({ id }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [auctionData, setAuctionData] = useState({
        id: 1,
        product_id: 0,
        start_date: "2023-11-13T03:45:37.985000",
        starting_bid: 11232,
        is_active: true,
        user_id: 0,
        name: "rk75",
        end_date: "2023-11-13T03:45:37.985000",
        current_bid: 33333
    });
    const [bid, setBid] = useState(0);
    const [register, setRegister] = useState(false);
    const loggedInUserId = Number(localStorage.getItem('id'));
    var current_bid;
    const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBid(Number(event.target.value));
        setAuctionData(prevState => ({ ...prevState, current_bid: event.target.value }));

    };
    const handleRegister = (event) => {
        event.preventDefault();
        const register = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: localStorage.getItem('id'), auction_id: id, bid_price: 0, is_winner: false })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                const data = await response.json();
                console.log(data);
            }
        };
        register();
        setRegister(true);


    };

    const handleUnregister = (event) => {
        event.preventDefault();
        const unregister = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/bid/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: localStorage.getItem('id'), auction_id: id, bid_price: 0, is_winner: false })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                const data = await response.json();
                console.log(data);
            }
        };
        unregister();
        setRegister(false);
    };
    const [agreeToS, setAgreeToS] = useState(false);

    const handleCheckboxChange = (event) => {
        setAgreeToS(event.target.checked);
    };

    const handleCancelBid = (event: React.FormEvent) => {
        window.location.reload();


    };

    const handlePlaceBid = (event: React.FormEvent) => {
        event.preventDefault();
        // update auction data

        const placeBid = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auctions/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(auctionData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert('Bid placed successfully!');

            } else {
                const data = await response.json();
                console.log(data);
            }
            const response2 = await fetch(import.meta.env.VITE_BACKEND_URL + '/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: localStorage.getItem('id'), auction_id: id, bid_price: bid, is_winner: false })
            });
            if (response2.ok) {
                const data = await response2.json();
                console.log(data);
            } else {
                const data = await response2.json();
                console.log(data);
            }
        };
        placeBid();


    };
    useEffect(() => {
        // fetch auction
        const fetchAuction = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auctions/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAuctionData(data);
                current_bid = data.current_bid;
            } else {
                const data = await response.json();
                console.log(data);
            }
        };
        fetchAuction();
        const fetchProduct = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/products/' + auctionData.product_id);
            if (response.ok) {
                const data = await response.json();
                setImageUrl(data.image_url); // Replace 'image_url' with the actual property name in your data
            }
        };

        fetchProduct();
        const fetchRegister = async () => {
            if (!loggedInUserId) {
                setRegister(false);
                return;
            }
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/bids/');
            if (response.ok) {
                const data = await response.json();
                const userBid = data.find(bid => bid.user_id === loggedInUserId && bid.auction_id === id);
                if (userBid) {
                    setRegister(true);
                }
            }
        }
        fetchRegister();
    }
        , [auctionData.product_id]);

    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={imageUrl} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{auctionData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Start Date: {new Date(auctionData.start_date).toLocaleString()}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">End Date: {new Date(auctionData.end_date).toLocaleString()}</Card.Subtitle>
                <Card.Text>
                    Starting Bid: ${auctionData.starting_bid}<br />
                    Current Bid: ${auctionData.current_bid}
                </Card.Text>
                <Badge bg={auctionData.is_active ? 'success' : 'secondary'}>{auctionData.is_active ? 'Active' : 'Inactive'}</Badge>
                <Badge bg={register ? 'success' : 'secondary'}>{register ? 'Registered' : 'Not Registered'}</Badge>
                <Form.Control type="number" value={bid} onChange={handleBidChange} />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Button onClick={handlePlaceBid} disabled={!register}>Place Bid</Button>
                    <Button onClick={handleCancelBid} variant="danger" disabled={!register}>Cancel Bid</Button>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Register
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form.Check
                                type="checkbox"
                                label="Agree to ToS"
                                checked={agreeToS}
                                onChange={handleCheckboxChange}
                                style={{ marginLeft: '15px' }}
                            />
                            <Dropdown.Item href="#/action-2">
                                <Button onClick={handleRegister} disabled={!agreeToS}>Register</Button>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                <Button variant="danger" onClick={handleUnregister} disabled={!agreeToS}>Unregister</Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Auction;