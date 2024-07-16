import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import Image from 'next/image';



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
    <div className="flex flex-col justify-center items-center min-h-[439px] h-auto w-[344px] ">
      <div className=''>
        <h2 className="text-[20px] font-ek-mukta font-extrabold -mt-[30px] mb-10 flex items-center justify-center">Support Your Series</h2>
        <p className="mb-4 text-[#B7B7B7] text-[12px] font-inter ml-1">Select the support amount:</p>
        <div className="flex justify-between gap-2 mb-5 max-lg:gap-2 max-sm:gap-[1px] text-sm ">
          {[1, 10, 500].map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountChange(amt)}
              className={`px-5 max-md:px-3 max-md:mx-[2px] py-3 rounded-xl w-[70px] ${amount === amt && !isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
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
              className={`pl-5 pr-2 py-3 rounded-xl font-normal w-[70px] ${isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border-2 border-[#3e3d3d] text-[#5B5B5B]'}`}
              placeholder="Other"
              style={{ appearance: 'textfield', height: 'auto', scrollbarWidth:'none', overflow: 'hidden' }}
            />
          </div>
        </div>
        <div className="my-5 mt-10 flex justify-between items-center w-full max-w-md mx-auto ml-1">
          <p className="text-white font-ek-mukta text-[14px]">Total:</p>
          <div className="flex-grow border-t border-dotted border-gray-600 mx-6"></div>
          <p className="text-white font-ek-mukta mr-1">${amount}</p>
        </div>
        <p className="mt-10 mb-4 text-[#B7B7B7] text-[12px] font-inter flex justify-start ml-1">Select a Payment Method:</p>
        <div className="flex justify-between mb-4 gap-4">
          {['stripe', 'paypal'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl font-bold flex items-center justify-center w-[143px] h-[45px] mb-5 ${paymentMethod === method ? 'bg-black text-white mr-2' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
            >
              {method === 'paypal' ? <div className='flex items-center px-5 max-md:px-2'><Image src="/icons/paypal.svg" width={48} height={1} alt="sony" className="w-[48px]" /></div> : <div className="flex items-center justify-center gap-2 h-[45px]"><Image src="/icons/card.svg" width={64} height={1} alt="sony" className="w-[63px]" /></div>}
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
              className="flex items-center justify-center w-[304px] h-[45px] bg-white text-[#1E1E1E] text-[16px] rounded-lg gap-1 font-avenir-heavy "
              style={{ fontFamily: 'Avenir Heavy, sans-serif' }}
            >
              
              <Image src="/icons/heart.svg" width={14} height={1} alt="sony" className="w-[14px] h-[12px]" />
              Support
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportForm;
