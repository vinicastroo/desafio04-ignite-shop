import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, Products, SuccessContainer } from "../styles/pages/success";
import Image from 'next/future/image';
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}
export default function Success({ customerName, product }: SuccessProps) {
  const {
    cartDetails,
    cartCount,
    clearCart
  } = useShoppingCart()
  const router = useRouter()

  const products = Object.values(cartDetails ?? {})

  function handleRedirect() {
    clearCart()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        {
          products.length === 0 ? (
            <p>Carregando</p>
          ) : (
            <>
              <h1>Compra efetuada!</h1>

              <Products>
                {
                  products.map(product => (
                    <ImageContainer key={product.id}>
                      <Image src={product.image} width={120} height={110} alt="" />
                    </ImageContainer>
                  ))
                }
              </Products>

              <p>
                Uhuul <strong>{customerName}</strong>, sua compra de {cartCount} {cartCount === 1 ? 'camiseta' : 'camisetas'} já está a caminho da sua casa.
              </p>

              <button onClick={() => handleRedirect()}>
                Voltar ao catálogo
              </button>
            </>
          )
        }
      </SuccessContainer>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}