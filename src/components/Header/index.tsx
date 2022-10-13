import { Bag } from "phosphor-react";
import ModalCart from "../../components/ModalCart";
import logoImg from '../../assets/logo.svg';
import Image from 'next/future/image'
import { useState } from "react";
import { CartContainer, HeaderContainer, Badge } from "../../styles/components/header";
import { useShoppingCart } from "use-shopping-cart";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartDetails } = useShoppingCart()
  const products = Object.values(cartDetails ?? {})

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <CartContainer onClick={() => setIsOpen(true)}>
        <Bag size={20} weight="bold" />

        {
          products.length > 0 && (
            <Badge>{products.length}</Badge>
          )
        }
      </CartContainer>

      <ModalCart isOpen={isOpen} handleClose={handleCloseModal} />
    </HeaderContainer>
  )
}