import { styled } from "..";


export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100"
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4
  },

  button: {
    display: 'block',
    marginTop: '5rem',
    fontSize: "$lg",
    color: "$green500",
    textDecoration: 'none',
    fontWeight: 'bold',
    background: "transparent",
    cursor: "pointer",
    border: 0,

    '&:hover': {
      color: "$green300",
    }
  }
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 130,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 90,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 28px rgba(0, 0, 0, 0.5)',

  '& + &': {
    marginLeft: '-2.5rem',
  },
  img: {
    objectFit: 'cover'
  }
});

export const Products = styled('div', {
  display: 'flex',
  marginTop: '1rem'
})