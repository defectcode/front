import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "ASOxDBySChHRQPQC0EICF5vMRWfVp-73bRtt8wVOjApc-7OggX1GtvgRas0BwM6thvDslDte3OrezYQ1" }}>
      <div>
        <div className="w-full">
          <PayPalButtons
            style={{ layout: 'vertical', color: 'white', shape: 'rect', label: 'paypal' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: amount.toString(),
                  },
                }],
              }).then((orderID) => {
                // Return the order ID to capture later
                return orderID;
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                const orderID = data.orderID; // Obține orderID-ul din detalii
                alert("Transaction completed by " + details.payer.name.given_name);
                onSuccess(); // notificăm componenta părinte despre succes

                // Trimite orderID-ul către backend pentru procesare
                return fetch("http://127.0.0.1:8000/api/process-payment", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    orderID: orderID
                  })
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  if (data.error) {
                    alert("Payment failed: " + data.error);
                  } else {
                    alert("Payment successful!");
                  }
                })
                .catch(error => {
                  console.error("Error:", error);
                });
              });
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
