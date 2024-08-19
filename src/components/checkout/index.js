import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import SupportNavBar from '../../app/components/Header/components/Support'
import Image from 'next/image';


const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ amount = 1 }) => {
  const router = useRouter();

  const handler = async () => {
    try {
      const stripe = await asyncStripe;
      const res = await fetch("/api/stripe/session", {
        method: "POST",
        body: JSON.stringify({ amount }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error('Failed to create Stripe session');
      }

      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe redirect error:', error);
        router.push("/error");
      }
    } catch (err) {
      console.error('Checkout handler error:', err);
      router.push("/error");
    }
  };

  return (
    <button
      onClick={handler}
      className="flex items-center justify-center w-full h-[45px] bg-white text-[#1E1E1E] text-[16px] rounded-lg gap-1 font-bold"
      style={{ fontFamily: 'Avenir Heavy, sans-serif' }}
    >
      <Image src="/icons/heart.svg" width={16} height={1} alt="heart" className="w-[16px] h-auto" />
      Support
    </button>
  );
};

export default CheckoutButton;
