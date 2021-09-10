import { createTheme } from '@material-ui/core';

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'rgb(0, 0, 0, 0.9)',
        },
      },
    },
  },
});

export default theme;
