import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import { FaPaypal } from 'react-icons/fa';

const SupportForm = () => {
  const [amount, setAmount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Support Amount',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const {error} = await stripe.confirmCardPayment(
          '{CLIENT_SECRET}',
          {
            payment_method: event.paymentMethod.id,
          },
          {
            handleActions: false
          }
        );
        if (error) {
          event.complete('fail');
        } else {
          event.complete('success');
          const {error} = await stripe.confirmCardPayment('{CLIENT_SECRET}');
          if (error) {
            console.log('Payment failed', error);
          } else {
            handlePaymentSuccess();
          }
        }
      });
    }
  }, [stripe, amount]);

  const handleAmountChange = (amt) => {
    setIsCustomAmount(false);
    setAmount(amt);
  };

  const handleCustomAmountClick = () => {
    setIsCustomAmount(true);
    setAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value === '' ? '' : parseFloat(value));
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
  };

  const handleSupportClick = async () => {
    if (paymentMethod === 'stripe') {
      window.open(
        'https://donate.stripe.com/14kaFlb407Nu76weUV',
        'Stripe Donation',
        'width=600,height=800'
      );
    } else if (paymentMethod === 'paypal') {
      document.querySelector('.paypal-button-container button').click();
    }
  };

  return (
    <div>
      {isPaymentSuccessful ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center bg-white rounded-full h-16 w-16 mb-4">
            <span className="text-2xl text-green-500">❤️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You, Name!</h2>
          <p className="mb-4 text-[#B7B7B7]">Your payment was processed successfully. You`ll receive a receipt by email shortly.</p>
          <button className="px-4 py-2 bg-black text-white rounded-lg font-bold flex items-center">
            Share
            <span className="ml-2">🔗</span>
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-10 flex items-center justify-center">Support Your Series</h2>
          <p className="mb-4 text-[#B7B7B7]">Select your support amount:</p>
          <div className="flex gap-4 mb-4">
            {[1, 10, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => handleAmountChange(amt)}
                className={`px-4 py-2 rounded-lg font-bold ${amount === amt && !isCustomAmount ? 'bg-white text-black' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              >
                ${amt}
              </button>
            ))}
            <button
              onClick={handleCustomAmountClick}
              className={`px-4 py-2 rounded-lg font-bold ${isCustomAmount ? 'bg-white text-black' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
            >
              $Other
            </button>
          </div>
          {isCustomAmount && (
            <div className="mb-4">
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full px-4 py-2 rounded-lg bg-[#252525] border-2 border-[#3e3d3d] text-white focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
          )}
          <div className="mb-4">
            <p>Total: ${amount}</p>
          </div>
          <p className="mb-4 text-[#B7B7B7]">Select a Payment Method:</p>
          <div className="flex justify-between mb-4">
            {['stripe', 'paypal'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`px-4 py-2 rounded-lg font-bold flex items-center justify-center mb-5 ${paymentMethod === method ? 'bg-black text-white mr-2' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              >
                {method === 'paypal' ? <Image src="/icons/paypal.svg" alt='paypal' width={100} height={50} /> : 'Apple Pay / Google Pay'}
              </button>
            ))}
          </div>
          {paymentMethod === 'paypal' && (
            <div className="paypal-button-container">
              <PayPalButton amount={amount} onSuccess={handlePaymentSuccess} />
            </div>
          )}
          {paymentRequest && paymentMethod === 'stripe' && (
            <PaymentRequestButtonElement
              options={{ paymentRequest }}
              className="PaymentRequestButton"
            />
          )}
          <button
            onClick={handleSupportClick}
            className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-bold"
          >
            Support
          </button>
        </>
      )}
    </div>
  );
};

export default SupportForm;
