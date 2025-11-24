import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 Necesitas esto
import App from './App.jsx';

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
    );