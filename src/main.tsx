
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeProvider'

// Reset CSS will be handled by MUI's CssBaseline
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
