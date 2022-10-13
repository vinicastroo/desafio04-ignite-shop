import { X } from "phosphor-react";
import { useShoppingCart } from "use-shopping-cart";
import { Button, ImageContainer, InformationContainer, Modal, Product } from "../../styles/components/modalCart";
import Image from 'next/future/image'
import { useState } from "react";
import axios from "axios";

interface ModalCartPros {
  isOpen: boolean;
  handleClose: () => void;
}
export default function ModalCart({ isOpen, handleClose }: ModalCartPros) {
  const {
    cartDetails,
    removeItem,
    formattedTotalPrice,
    cartCount,
  } = useShoppingCart()

  const products = Object.values(cartDetails ?? {})
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const productsFormatted = products.map(product => {
        return {
          price: product.sku_id,
          quantity: 1
        }
      })

      const response = await axios.post('/api/checkout', {
        products: productsFormatted
      });

      const { checkoutUrl } = response.data;

      //rota interna
      // router.push('')

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirencionar ao checkout!')
    }
  }

  return (
    isOpen && (
      <Modal>
        <div>
          <X size={24} weight="fill" onClick={() => handleClose()} />
          <h1>Sacola de compras</h1>

          {
            products.map(product => (
              <Product key={product.id}>
                <ImageContainer>
                  <Image src={product.image} width={94} height={94} alt="" />
                </ImageContainer>

                <div>
                  <span>{product.name}</span>
                  <strong>{product.formattedValue}</strong>
                  <button onClick={() => removeItem(product.id)}>Remover</button>
                </div>
              </Product>
            ))
          }

          {
            products.length === 0 && (
              <p>
                Nenhum produto selecionado
              </p>
            )
          }
        </div>

        <div>
          {
            cartCount > 0 && (
              <>
                <InformationContainer>
                  <div>
                    <span>Quantidade</span>
                    <span>{`${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}</span>
                  </div>

                  <div>
                    <strong>Valor total</strong>
                    <strong>{formattedTotalPrice}</strong>
                  </div>
                </InformationContainer>

                <Button onClick={() => handleCheckout()} disabled={isCreatingCheckoutSession}>
                  Finalizar compra
                </Button>
              </>
            )
          }
        </div>
      </Modal>
    )
  );
}