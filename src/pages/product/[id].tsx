import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import { useShoppingCart } from 'use-shopping-cart';
import { formatPrice } from '../../utils/formatPrice';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    priceFormatted: string;
    defaultPriceId: string;
    price_data: Stripe.Price
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <Header />

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={450} height={400} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>

          <p>{product.description}</p>

          <button onClick={() => addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            value: product.price,
            sku_id: product.price_data.id,
            currency: 'BRL',
            image: product.imageUrl,
            description: product.description
          })}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_MaxqNEM7oJINWn' }
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        price_data: price,
        priceFormatted: formatPrice(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, //1 hourf
  }
}