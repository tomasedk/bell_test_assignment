import { UnitActionTypes, UnitTypes } from '../HelpingFolder/Consts';
import { IActionType, IStoreOrgState } from '../HelpingFolder/Interfaces';

// declare function require(path: string): any;
// const uuidv4 = require('uuid/v4');

const initialState = {
    get state(): IStoreOrgState {
        return {
            orgData: [
                // Для примера
                // { id: 1, name: 'Bell Integrator', adress: 'Moscow', inn: 111222333 },
                // { id: 2, name: 'Nova Me', adress: 'Berlin', inn: 444555666 },
                // { id: 3, name: 'TheFloors', adress: 'Kaliningrad', inn: 999000111 }
            ]
        }
    }
};

export default function orgReducer(state: IStoreOrgState = initialState.state, action: IActionType) {
    switch (action.type) {
        case `${UnitTypes.ORGANISATION.toUpperCase()}${UnitActionTypes.EDIT}`:
            let newOrgDataEdit: Array<any> = [];
            for (let i = 0; i < state.orgData.length; i++) {
                //console.log('compare: ', +action.payload.unitIdToEdit === state.orgData[i].id)
                newOrgDataEdit.push((action.payload.unitIdToEdit === state.orgData[i].id) ? action.payload.newUnit : state.orgData[i]);
            }
            //console.log('new state of STORE: ', newOrgDataEdit);
            return { ...state, orgData: newOrgDataEdit };

        case `${UnitTypes.ORGANISATION.toUpperCase()}${UnitActionTypes.ADD}`:
            return { ...state, orgData: [...state.orgData, action.payload] };

        case `${UnitTypes.ORGANISATION.toUpperCase()}${UnitActionTypes.DELETE}`:
            //В payload передается id компании, которую необходимо удалить.
            //Если передается несуществующий id, то ВЕСЬ массив orgData очищается. Этот случай применяется в action.onLogout();

            let newOrgDataDelete: Array<any> = [];
            for (let i = 0; i < state.orgData.length; i++) {
                if (state.orgData[i].id !== action.payload) newOrgDataDelete.push(state.orgData[i]);
            }

            if (newOrgDataDelete.length === state.orgData.length) {
                return { ...state, orgData: [] };
            }
            return { ...state, orgData: newOrgDataDelete };
    }
    return state;
}
