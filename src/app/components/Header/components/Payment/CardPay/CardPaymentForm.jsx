import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CardPaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: 'Name', 
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#B7B7B7',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#6f6f6f',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div>
      <label className="block text-[#B7B7B7] text-md mb-2" htmlFor="card-number">
        Сard information
        </label>
        <div className="bg-[#252525] border border-[#6f6f6f] p-2 rounded-t-lg">
          <CardNumberElement
            id="card-number"
            options={cardElementOptions}
            className="p-2 bg-[#252525] rounded-t-lg"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <div className="w-1/2">
          <div className="bg-[#252525] border border-[#6f6f6f] p-2 rounded-bl-lg">
            <CardExpiryElement
              id="card-expiry"
              options={cardElementOptions}
              className="p-2 bg-[#252525] rounded-bl-lg"
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-[#252525] border border-[#6f6f6f] p-2 rounded-br-lg">
            <CardCvcElement
              id="card-cvc"
              options={cardElementOptions}
              className="p-2 bg-[#252525] rounded-br-lg"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CardPaymentForm;
