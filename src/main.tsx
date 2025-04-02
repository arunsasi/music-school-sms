
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Reset CSS will be handled by Tailwind
import './index.css'

createRoot(document.getElementById("root")!).render(
  <App />
);
