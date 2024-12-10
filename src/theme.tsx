import { extendTheme } from '@chakra-ui/react';

const colors = {
  green: {
    600: '#2f7a5a',
    700: '#276749',
    800: '#1f5640',
  },
  blue: {
    default: '#1071cc',
  },
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const styles = {
  global: {
    'html, body': {
      background: '#F8F9FA',
      fontFamily: 'Roboto',
      WebkitFontSmoothing: 'antialiased',
      fontFeatureSettings: 'kern',
      textRendering: 'optimizelegibility',
    },
    a: {
      color: 'black',
    },
  },
};

export const theme = extendTheme({ colors, styles, breakpoints });
