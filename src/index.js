import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';

import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter} from 'react-router-dom';

import client from './client';

import { authReducer } from './store/reducers/authReducer';

import './index.scss';
import App from './App';

const store = createStore(combineReducers({authReducer}));

const app = (
    <BrowserRouter>
        <Provider store={store}>    
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));