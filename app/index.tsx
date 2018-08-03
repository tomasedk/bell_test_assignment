import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/routes';
import { appStore } from './Store/Store';

ReactDOM.render(
    <Provider store={appStore}>
        <AppRouter />
    </Provider>,
    document.getElementById('app')
);
