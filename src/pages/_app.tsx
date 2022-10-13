import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import { Container } from "../styles/pages/app";

import { CartProvider } from 'use-shopping-cart'

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const stripeKey = 'pk_test_51LrlpsKES7rM1V007A9dGf3Ch6zaOVRH734S6lLGZT8QK6sGHfSEUyKLQnVBIXhpfyhbO1epfYyGSQJTwMYDEnqv00lpnOlhB4'

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`http://localhost:3000/`}
      currency="BRL"
      allowedCountries={['BR', 'US', 'CA']}
      billingAddressCollection={true}
    >
      <Container>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}

