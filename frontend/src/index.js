import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// redux
import { Provider } from 'react-redux';

import storeRTK from './store/storeRTK'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <Provider store={storeRTK}>
                <App />
            </Provider>
        </React.StrictMode>
);