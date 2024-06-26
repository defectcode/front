import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const ApplePayButton = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          '{PAYMENT_INTENT_CLIENT_SECRET}', // Replace with the client secret from the PaymentIntent creation
          {
            payment_method: ev.paymentMethod.id,
          }
        );

        if (error) {
          ev.complete('fail');
          console.error(error);
        } else {
          ev.complete('success');
          onSuccess();
        }
      });
    }
  }, [stripe, elements, amount, onSuccess]);

  if (!canMakePayment) {
    return null;
  }

  return <PaymentRequestButtonElement options={{ paymentRequest }} />;
};

export default ApplePayButton;
