import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4}>
            <Router>
                <App />
            </Router>
        </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
