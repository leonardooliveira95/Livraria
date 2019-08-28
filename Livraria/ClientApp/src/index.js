import 'react-bootstrap/dist/react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'pnotify/dist/PNotifyBrightTheme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PNotify from "pnotify/dist/es/PNotify";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

//Define padrões de mensagens PNotify
PNotify.defaults.styling = "bootstrap4";
PNotify.defaults.icons = 'fontawesome4';
PNotify.defaults.stack = {
    dir1: 'down',
    dir2: 'left',
    firstpos1: 25,
    firstpos2: 25,
    spacing1: 36,
    spacing2: 36,
    push: 'bottom',
    context: document.body
};

PNotify.defaults.modules = {
    Buttons: {
        sticker: false
    }
};

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
