import '../app/globals.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Script from 'next/script';

const stripePromise = loadStripe('pk_test_51PVB7hRtht67Hmi9iBphUO4Ngtqxti7a4MnbTiKeHvoT82wF28V4vzfQnb2iY2ig250ybRgLXeaDpjGtfaR10d6j00Tomwe4hA');

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Script src={`https://www.paypal.com/sdk/js?client-id=ASOxDBySChHRQPQC0EICF5vMRWfVp-73bRtt8wVOjApc-7OggX1GtvgRas0BwM6thvDslDte3OrezYQ1`} strategy="beforeInteractive" />
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    </div>
  );
}

export default MyApp;
