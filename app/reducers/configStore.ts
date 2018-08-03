import { combineReducers } from 'redux';

import deptReducer from './deptReducer';
import emplReducer from './emplReducer';
import loginReducer from './loginReducer';
import modalReducer from './modalReducer';
import orgReducer from './orgReducer';

export default combineReducers({
    loginReducer,
    orgReducer,
    modalReducer,
    deptReducer,
    emplReducer,
})
