import { createTheme, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: ["Russo One", "sans-serif"].join(","),
      fontSize: "36px",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
