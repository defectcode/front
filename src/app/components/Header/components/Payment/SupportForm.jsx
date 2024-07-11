import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import { CiCreditCard1 } from "react-icons/ci";

const SupportForm = () => {
  const [amount, setAmount] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (stripe && amount > 0) {
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
        const { error } = await stripe.confirmCardPayment(
          '{CLIENT_SECRET}', // Replace with actual client secret
          {
            payment_method: event.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );
        if (error) {
          event.complete('fail');
        } else {
          event.complete('success');
          const { error: confirmError } = await stripe.confirmCardPayment('{CLIENT_SECRET}');
          if (confirmError) {
            console.log('Payment failed', confirmError);
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

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value === '' ? '' : parseFloat(value));
    setIsCustomAmount(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
  };

  const handleSupportClick = async () => {
    if (paymentMethod === 'stripe') {
      const width = 600;
      const height = 800;
      const left = (window.screen.width / 2) - (width / 2);
      const top = (window.screen.height / 2) - (height / 2);
  
      const stripeDonateUrl = `https://donate.stripe.com/14kaFlb407Nu76weUV?amount=${amount}`;
  
      window.open(
        stripeDonateUrl,
        'Stripe Donation',
        `width=${width},height=${height},top=${top},left=${left}`,
      );
    } else if (paymentMethod === 'paypal') {
      document.querySelector('.paypal-button-container button').click();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[439px] h-auto w-[380px] max-lg:w-[350px] max-sm:w-[300px] px-20">
      {isPaymentSuccessful ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center bg-white rounded-full h-16 w-16 mb-4">
            <span className="text-2xl text-green-500">❤️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You, Name!</h2>
          <p className="mb-4 text-[#B7B7B7]">Your payment has been successfully processed. You will soon receive a receipt via email.</p>
          <button className="px-4 py-2 bg-black text-white rounded-lg font-bold flex items-center">
            Share
            <span className="ml-2">🔗</span>
          </button>
        </div>
      ) : (
        <div className=''>
          <h2 className="text-[20px] font-ek-mukta font-extrabold mt-[2px] mb-10 flex items-center justify-center">Support Your Series</h2>
          <p className="mb-5 text-[#B7B7B7] text-[12px] font-inter">Select the support amount:</p>
          <div className="flex justify-between gap-2 mb-5 max-lg:gap-2 max-sm:gap-1 text-sm ">
            {[1, 10, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => handleAmountChange(amt)}
                className={`px-6 max-md:px-5 max-md:mx-1 py-3 rounded-xl w-20 ${amount === amt && !isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              >
                ${amt}
              </button>
            ))}
            <div className="relative flex items-center">
              <span className={`absolute left-3 ${isCustomAmount ? 'text-black' : 'text-white'}`}>$</span>
              <input
                type="number"
                value={isCustomAmount ? customAmount : ''}
                onChange={handleCustomAmountChange}
                className={`pl-5 pr-2 py-3 rounded-xl font-normal w-20 ${isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
                placeholder="Other"
                style={{ appearance: 'textfield', height: 'auto', scrollbarWidth:'none', overflow: 'hidden' }}
              />
            </div>
          </div>
          <div className="my-5 mt-10 flex justify-between items-center w-full max-w-md mx-auto">
            <p className="text-white font-ek-mukta text-[14px]">Total:</p>
            <div className="flex-grow border-t border-dotted border-gray-600 mx-2"></div>
            <p className="text-white font-ek-mukta">${amount}</p>
          </div>
          <p className="mt-10 mb-4 text-[#B7B7B7] text-[12px] font-inter">Select a payment method:</p>
          <div className="flex justify-between mb-4 ga-">
            {['stripe', 'paypal'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`rounded-xl font-bold flex items-center justify-center w-[170px] h-[45px] mb-5 ${paymentMethod === method ? 'bg-black text-white mr-2' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              >
                {method === 'paypal' ? <div className='flex items-center px-5 max-md:px-2'>PayPal</div> : <div className="flex items-center justify-center gap-2 w-[143px] h-[45px]"><CiCreditCard1 size={30} /> <div className='mt-1'>Card</div></div>}
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
          {paymentMethod !== 'paypal' && (
            <div className="flex justify-center items-end">
              <button
                onClick={handleSupportClick}
                className="flex items-center justify-center w-[350px] h-[45px] bg-white text-black text-[16px] rounded-lg font-avenir-heavy "
              >
                Support
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportForm;
