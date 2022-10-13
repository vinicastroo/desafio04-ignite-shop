import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    '-webkit-font-smoothing': 'antialiased'
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  html: {
    '@media (max-width: 1080px)': {
      fontSize: '93.75%',
    },

    '@media (max-width:720px)': {
      fontSize: '87.5%',
    }
  }
})