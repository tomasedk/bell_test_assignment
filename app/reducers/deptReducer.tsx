import { UnitActionTypes, UnitTypes } from '../HelpingFolder/Consts';
import { IActionType, IStoreDeptState } from '../HelpingFolder/Interfaces';

const initialState = {
    get state(): IStoreDeptState {
        return {
            deptData: [
                // Для примера
                // { discriminator: UnitTypes.DEPARTMENT, id: 1, parent: 3, name: 'HR', phone: 111222333 },
                // { discriminator: UnitTypes.DEPARTMENT, id: 2, parent: 3, name: 'DEVELOPMENT', phone: 444555666 },
                // { discriminator: UnitTypes.DEPARTMENT, id: 3, parent: 1, name: 'TESTING', phone: 999000111 }
            ]
        }
    }
};
export default function deptReducer(state: IStoreDeptState = initialState.state, action: IActionType) {
    switch (action.type) {
        case `${UnitTypes.DEPARTMENT}${UnitActionTypes.EDIT}`:
            let newDeptDataEdit: Array<any> = [];
            for (let i = 0; i < state.deptData.length; i++) {
                newDeptDataEdit.push((action.payload.unitIdToEdit === state.deptData[i].id) ? action.payload.newUnit : state.deptData[i]);
            }
            return { ...state, deptData: newDeptDataEdit };

        case `${UnitTypes.DEPARTMENT}${UnitActionTypes.ADD}`:
            return { ...state, deptData: [...state.deptData, action.payload] };

        //В payload передается id компании, которую необходимо удалить.
        //Если передается несуществующий id, то ВЕСЬ массив deptData очищается. Этот случай применяется в action.onLogout();
        case `${UnitTypes.DEPARTMENT}${UnitActionTypes.DELETE}`:
            let newDeptDataDelete: Array<any> = [];

            for (let i = 0; i < state.deptData.length; i++) {
                if (state.deptData[i].id !== action.payload) newDeptDataDelete.push(state.deptData[i]);
            }

            if (newDeptDataDelete.length === state.deptData.length) {
                return { ...state, deptData: [] };
            }
            return { ...state, deptData: newDeptDataDelete };
    }
    return state;
}
