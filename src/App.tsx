import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
