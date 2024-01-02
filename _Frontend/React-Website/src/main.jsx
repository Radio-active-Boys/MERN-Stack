import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contextAPI/Auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <App />
    <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        position="top-right"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
         
        />
  </React.StrictMode>
  </AuthProvider>,
)