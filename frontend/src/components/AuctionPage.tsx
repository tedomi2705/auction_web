
import React, { useEffect, useState } from 'react';
import Auction from './Auction';
// import BidForm from './BidForm';
// import CurrentBid from './CurrentBid';

interface AuctionData {
  id: number;
  // Add other properties of the auction data here
}

const AuctionPage: React.FC = () => {
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
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {auctions.map(auction => (
        <div style={{ margin: '5px' }} key={auction.id}>
          <Auction id={auction.id} />
        </div>
      ))}
    </div>
  );
};

export default AuctionPage;
