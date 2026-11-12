import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Entry point (Create React App looks for src/index.js).
// No <StrictMode>: its dev-only double mount makes the Aurora WebGL canvas
// lose its context and render blank.
createRoot(document.getElementById('root')).render(<App />);
