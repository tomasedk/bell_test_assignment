import { Dispatch } from 'redux';
import history from '../routes/history';

import { AsyncActionTypes, LoginActionTypes, ModalActionTypes, UnitActionTypes, UnitTypes } from '../HelpingFolder/Consts';
import { instanceOf, masToObj } from '../HelpingFolder/UUnitFunctions';

export interface IDispatchProps {
    actions: Actions;
}

export class Actions {
    constructor(private dispatch: Dispatch<IDispatchProps>) {
    }

    //Для МОДАЛЬНЫХ ОКОН
    onShowModal = (typeOfModal: string) => {
        this.dispatch({ type: typeOfModal });
    }

    onHideModal = () => {
        this.dispatch({ type: ModalActionTypes.HIDE });
    }

    //Для unit'ов
    onAddUnit = (typeOfUnit: string, unitToCreate: Array<string | number>) => {
        this.dispatch({ type: `${typeOfUnit.toUpperCase()}${UnitActionTypes.ADD}`, payload: masToObj(typeOfUnit, unitToCreate) });
        this.onHideModal();
    }

    onEditUnit = (typeOfUnit: string, unitIdToEdit: string, unitToCreate: Array<string | number>) => {
        let tmp: Object = {
            'unitIdToEdit': unitIdToEdit,
            newUnit: masToObj(typeOfUnit, unitToCreate),
        };

        this.dispatch({ type: `${typeOfUnit.toUpperCase()}${UnitActionTypes.EDIT}`, payload: tmp });
        this.onHideModal();
    }

    onDeleteUnit = (typeOfUnit: string, id: string) => {
        this.dispatch({ type: `${typeOfUnit.toUpperCase()}${UnitActionTypes.DELETE}`, payload: id });
        this.onHideModal();
    }

    //Для ЛОГИНА
    onLogout = () => {
        this.dispatch({ type: LoginActionTypes.LOGOUT });
        this.dispatch({ type: `${UnitTypes.ORGANISATION.toUpperCase()}${UnitActionTypes.DELETE}`, payload: -1 });
        this.dispatch({ type: `${UnitTypes.DEPARTMENT.toUpperCase()}${UnitActionTypes.DELETE}`, payload: -1 });
        this.dispatch({ type: `${UnitTypes.EMPLOYEE.toUpperCase()}${UnitActionTypes.DELETE}`, payload: -1 });
        //то же самое с удалением подразделений и сотрудников
    };

    onLogin = (nick: string, pass: string) => {
        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.BEGIN}` });

        fetch('http://www.mocky.io/v2/5aafaf6f2d000057006eff31') //200 - true
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'error';
                }
            })
            .then(data => {
                data['userNP'] = {
                    nickname: nick,
                    password: pass
                };

                this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`, payload: data });
                history.push('/orgs');
                //Список организаций
                //fetch('http://www.mocky.io/v2/5b62040e3000007e1c6a4467') //id - number
                fetch('http://www.mocky.io/v2/5b65c0f23300001000f6aa5f')
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw 'error';
                        }
                    })
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (instanceOf(data[i], UnitTypes.ORGANISATION)) { //Проверка, является ли объект организацией
                                this.dispatch({ type: `${UnitTypes.ORGANISATION.toUpperCase()}${UnitActionTypes.ADD}`, payload: data[i] });
                            }
                        };
                    })
                    .catch(error => {
                        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
                    });

                //Список подразделений
                //fetch('http://www.mocky.io/v2/5b63178230000062096502f1') //id - number
                fetch('http://www.mocky.io/v2/5b65c1403300009a0df6aa61')
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw 'error';
                        }
                    })
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            //console.log(data[i]);
                            if (instanceOf(data[i], UnitTypes.DEPARTMENT)) { //Проверка, является ли объект организацией
                                this.dispatch({ type: `${UnitTypes.DEPARTMENT.toUpperCase()}${UnitActionTypes.ADD}`, payload: data[i] });
                            }
                        };
                    })
                    .catch(error => {
                        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
                    });

                //Список сотрудников
                //fetch('http://www.mocky.io/v2/5b63140630000062006502e1') //id - number
                fetch('http://www.mocky.io/v2/5b65c17e3300003810f6aa62')
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw 'error';
                        }
                    })
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            //console.log(data[i]);
                            if (instanceOf(data[i], UnitTypes.EMPLOYEE)) { //Проверка, является ли объект организацией
                                this.dispatch({ type: `${UnitTypes.EMPLOYEE.toUpperCase()}${UnitActionTypes.ADD}`, payload: data[i] });
                            }
                        };
                    })
                    .catch(error => {
                        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
                    });
            })
            .catch(error => {
                this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
            });
    };

}
