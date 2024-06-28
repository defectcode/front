import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
          '{CLIENT_SECRET}', // Înlocuiește cu client secretul real
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
      window.open(
        'https://donate.stripe.com/14kaFlb407Nu76weUV',
        'Stripe Donation',
        `width=${width},height=${height},top=${top},left=${left}`,
      );
    } else if (paymentMethod === 'paypal') {
      document.querySelector('.paypal-button-container button').click();
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[500px] h-auto w-[400px] max-lg:w-[350px] max-sm:w-[300px]">
      {isPaymentSuccessful ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center bg-white rounded-full h-16 w-16 mb-4">
            <span className="text-2xl text-green-500">❤️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Mulțumim, Nume!</h2>
          <p className="mb-4 text-[#B7B7B7]">Plata dumneavoastră a fost procesată cu succes. Veți primi în curând o chitanță prin email.</p>
          <button className="px-4 py-2 bg-black text-white rounded-lg font-bold flex items-center">
            Share
            <span className="ml-2">🔗</span>
          </button>
        </div>
      ) : (
        <div className=''>
          <h2 className="text-2xl font-bold mb-10 flex items-center justify-center">Susțineți seria dvs.</h2>
          <p className="mb-4 text-[#B7B7B7]">Selectați suma de susținere:</p>
          <div className="flex justify-between gap-5 mb-5 max-lg:gap-2 max-sm:gap-1">
            {[1, 10, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => handleAmountChange(amt)}
                className={`px-6 py-3 rounded-xl font-bold max-sm:px-3 ${amount === amt && !isCustomAmount ? 'bg-white text-black' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              >
                ${amt}
              </button>
            ))}
            <input
              type="number"
              value={isCustomAmount ? customAmount : ''}
              onChange={handleCustomAmountChange}
              className={`px-6 py-3 rounded-xl font-bold max-sm:px-3 ${isCustomAmount ? 'bg-white text-black' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              placeholder="$Other"
              style={{ appearance: 'textfield', width: '150px', height: 'auto', scrollbarWidth:'none', overflow: 'hidden' }}
            />
          </div>
          <div className="my-5 flex justify-between items-center w-full max-w-md mx-auto">
            <p className="text-white">Total:</p>
            <div className="flex-grow border-t border-dotted border-gray-600 mx-2"></div>
            <p className="text-white">${amount}</p>
          </div>
          <p className="mt-6 mb-4 text-[#B7B7B7]">Selectați o metodă de plată:</p>
          <div className="flex justify-between mb-4">
            {['stripe', 'paypal'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`px-9 py-1 rounded-xl font-bold flex items-center justify-center mb-5 ${paymentMethod === method ? 'bg-black text-white mr-2' : 'bg-[#252525] border-2 border-[#3e3d3d]'}`}
              >
                {method === 'paypal' ? <Image src="/icons/paypal.svg" alt='paypal' width={100} height={50} /> : <div className="flex items-center gap-2 px-5"><CiCreditCard1 size={70} /></div>}
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
            <div className="flex justify-center items-center">
              <button
                onClick={handleSupportClick}
                className="mt-4 px-40 max-lg:px-32 py-4 bg-white text-black text-xl rounded-lg font-bold"
              >
                Susțineți
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportForm;
