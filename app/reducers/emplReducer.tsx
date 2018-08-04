import { UnitActionTypes, UnitTypes } from '../HelpingFolder/Consts';
import { IActionType, IStoreEmplState } from '../HelpingFolder/Interfaces';

const initialState = {
    get state(): IStoreEmplState {
        return {
            emplData: [
                // Для примера
                // { discriminator: UnitTypes.EMPLOYEE, id: 1, parent: 1, name: 'NEW_EMPL', adress: 'Sovetskii', position: 'stager'},
                // { discriminator: UnitTypes.EMPLOYEE, id: 2, parent: 2, name: 'OLD_EMPL', adress: 'Leninskii', position: 'CEO' },
                // { discriminator: UnitTypes.EMPLOYEE, id: 3, parent: 1, name: 'YOUNG_EMPL', adress: 'Moscowskii', position: 'SMM-manager' }
            ]
        }
    }
};

export default function deptReducer(state: IStoreEmplState = initialState.state, action: IActionType) {
    //console.log(JSON.stringify(state.emplData));
    switch (action.type) {
        case `${UnitTypes.EMPLOYEE.toUpperCase()}${UnitActionTypes.EDIT}`:
            let newEmplDataEdit: Array<any> = [];
            for (let i = 0; i < state.emplData.length; i++) {
                newEmplDataEdit.push((action.payload.unitIdToEdit === state.emplData[i].id) ? action.payload.newUnit : state.emplData[i]);
            }
            return { ...state, emplData: newEmplDataEdit };

        case `${UnitTypes.EMPLOYEE.toUpperCase()}${UnitActionTypes.ADD}`:
            return {...state, emplData: [...state.emplData, action.payload] };

        case `${UnitTypes.EMPLOYEE.toUpperCase()}${UnitActionTypes.DELETE}`:
            //В payload передается id компании, которую необходимо удалить.
            //Если передается несуществующий id, то ВЕСЬ массив emplData очищается. Этот случай применяется в action.onLogout();

            let newEmplDataDelete: Array<any> = [];
            for (let i = 0; i < state.emplData.length; i++) {
                if (state.emplData[i].id !== action.payload) newEmplDataDelete.push(state.emplData[i]);
            }

            if (newEmplDataDelete.length === state.emplData.length) {
                return { ...state, emplData: [] };
            }
            return { ...state, emplData: newEmplDataDelete };
    }
    return state;
}
