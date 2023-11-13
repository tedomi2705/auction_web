import React, { useEffect, useState } from 'react';

const PaymentStatus: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [timePaid, setTimePaid] = useState('2002-11-11');
  const [paymentMethod, setPaymentMethod] = useState('');


  return (
    <div>
      <h2>Payment Status: Completed</h2>
      <h3>Time Paid: {new Date(timePaid).toLocaleString()}</h3>
      <h3>Payment Method: CoD</h3>
    </div>
  );
};

export default PaymentStatus;