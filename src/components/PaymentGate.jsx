import React from 'react';

const PaymentGate = ({ onPaymentSuccess }) => {
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_RpcGXevGHzUVrf', 
      amount: 1, 
      currency: 'INR',
      name: 'Bio Pellet Locator',
      description: 'Access Plant Locator',
      image: 'https://yourlogo.url/logo.png',
      handler: function (response) {
        alert('✅ Payment successful!');
        onPaymentSuccess();
      },
      prefill: {
        name: 'Kushagra',
        email: 'kushagra@example.com',
        contact: '9000000000'
      },
      theme: {
        color: '#2b6777'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h3>🔒 Please complete payment to use the locator</h3>
      <button
        onClick={handlePayment}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#2b6777',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentGate;
