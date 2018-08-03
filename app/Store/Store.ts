import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from '../reducers/configStore'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export {store as appStore};
