import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import MyAppRoutes from "./routes";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: "#FCF5EE",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyAppRoutes />
    </ThemeProvider>
  );
}

export default App;
