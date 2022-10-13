import { styled } from ".."

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 1rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const CartContainer = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: "$gray800",
  padding: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  borderRadius: 8,
  position: 'relative',

  svg: {
    color: "$gray500",
    transition: 'all 0.2s ease-in-out',
  },

  '&:hover': {
    filter: 'brightness(0.8)',
  }
})

export const Badge = styled('div', {
  position: 'absolute',
  right: '-10px',
  top: '-10px',
  border: '3px solid $gray900',
  fontSize: "$sm",
  borderRadius: '99px',
  height: '30px',
  width: '30px',
  backgroundColor: "$green500",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})