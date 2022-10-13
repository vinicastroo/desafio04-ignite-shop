import { brotliDecompress } from "zlib";
import { styled } from "..";

export const ModalContainer = styled('div', {
  position: 'absolute',

  width: '100vw',
  height: '100vh',

  display: 'flex',
  justifyContent: 'flex-end'
})

export const CloseContainer = styled('div', {
  background: 'rgba(0,0,0,0.8)',
})

export const Modal = styled('div', {
  background: "$gray800",
  padding: '2rem',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  maxWidth: 480,
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,

  '>div': {
    p: {
      fontSize: '$sm',
      textAlign: 'center',
      color: '$gray300',
      maxWidth: '150px',
      margin: '0 auto'
    },
  },

  svg: {
    marginLeft: '95%',
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(0.8)',
    }
  },

  h1: {
    fontSize: "$xl",
    marginBottom: "2rem",
    marginTop: "0.5rem",
  },

})


export const Product = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  marginBottom: "1.5rem",

  div: {
    display: 'flex',
    flexDirection: 'column',

    span: {
      fontSize: '$md',
      color: '$gray300'
    },

    strong: {
      marginTop: '0.5rem',
      fontSize: '$md',
      fontWeight: 'bold',
      color: '$gray100'
    },

    button: {
      marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontWeight: 'bold',
      border: 0,
      background: 'transparent',
      color: "$green500",
      fontSize: '1rem',
      cursor: 'pointer',

      '&:hover': {
        color: "$green300",
      }
    }
  }
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  minHeight: 94,
  minWidth: 94,
  borderRadius: 8,
})

export const InformationContainer = styled('div', {
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
    color: "$gray100",



    'span:first-child': {
      fontSize: '1rem'
    },

    'span:last-child': {
      fontSize: '$md',
      color: '$gray300'
    },

    'strong:first-child': {
      fontSize: '$md'
    },

    'strong:last-child': {
      fontSize: '$xl'
    }
  }
})

export const Button = styled('button', {
  width: '100%',
  marginTop: '3.5rem',
  border: 0,
  padding: '1.25rem 0',
  backgroundColor: "$green500",
  borderRadius: 8,
  fontSize: "$md",
  fontWeight: "bold",
  color: "$white",
  cursor: "pointer",

  '&:hover': {
    backgroundColor: "$green300",
  }
})