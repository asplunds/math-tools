import { useState } from "react";
import NumberLine from "./components/math/NumberLine";
import "./styles/globals.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Patterns from "./components/math/Patterns";
import Spacing from "./components/general/Spacing";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <NumberLine />
        <Spacing space="240px" />
        <Patterns />
      </div>
    </ThemeProvider>
  );
}

export default App;
