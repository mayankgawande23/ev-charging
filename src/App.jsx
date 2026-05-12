import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { router } from "./router.jsx";

export default function App() {
  const darkMode = useSelector((state) => state.ui.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#10B981" },
          secondary: { main: "#3B82F6" },
          error: { main: "#EF4444" },
          success: { main: "#06B6D4" },
          background: {
            default: darkMode ? "#020617" : "#F8FAFC",
            paper: darkMode ? "#0F172A" : "#FFFFFF",
          },
        },
        typography: {
          fontFamily: "Inter, system-ui, sans-serif",
          h1: { fontFamily: "Outfit, Inter, sans-serif", fontSize: 36, fontWeight: 700 },
          h2: { fontFamily: "Outfit, Inter, sans-serif", fontSize: 28, fontWeight: 600 },
          h3: { fontFamily: "Outfit, Inter, sans-serif", fontSize: 20, fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={darkMode ? "dark" : ""}>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}
