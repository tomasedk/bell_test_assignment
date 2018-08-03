import { ModalActionTypes } from '../HelpingFolder/Consts';
import { IActionType, IStoreModalState } from '../HelpingFolder/Interfaces';

const initialState = {
    get state(): IStoreModalState {
        return {
            showModal: ModalActionTypes.HIDE,
        }
    }
};

export default function modalReducer(state: IStoreModalState = initialState.state, action: IActionType) {

    //console.log('modalReducer, state: ', action.type);
    switch (action.type) {
        case ModalActionTypes.ADD:
        case ModalActionTypes.DELETE:
        case ModalActionTypes.EDIT:
        case ModalActionTypes.HIDE:
            //console.log('modalReducer, SWITCH state: ', action.type);
            return {
                ...state,
                showModal: action.type,
            };
    }
    return state;
}
