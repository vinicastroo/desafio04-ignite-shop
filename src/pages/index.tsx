import Image from "next/future/image"
import { CartContainer, HomeContainer, Product } from "../styles/pages/home"
import Head from 'next/head';

import Link from 'next/link';

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import { Bag } from "phosphor-react";
import { useShoppingCart } from "use-shopping-cart";
import { formatPrice } from "../utils/formatPrice";
import 'keen-slider/keen-slider.min.css'
import Header from "../components/Header";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    priceFormatted: string;
    price_data: Stripe.Price
  }[]
}
export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 24, },
      },
      "(min-width: 600px)": {
        slides: {
          perView: 2,
          spacing: 48,
        },
      },
      "(min-width: 1000px)": {
        slides: {
          perView: 3,
          spacing: 48,
        },
      },
    },

  });

  const { addItem } = useShoppingCart()

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <Header />

      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map(product => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={500} height={480} alt="" />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
                </div>

                <CartContainer onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  value: product.price,
                  currency: 'BRL',
                  image: product.imageUrl,
                  sku_id: product.price_data.id,
                  description: product.description
                })}>
                  <Bag size={20} weight="bold" />
                </CartContainer>
              </footer>
            </Product>

          )
        }
        )}


      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({ expand: ['data.default_price'] });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: price.unit_amount,
      value: price.unit_amount,
      price_data: price,
      priceFormatted: formatPrice(price.unit_amount / 100)
    }
  });

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}