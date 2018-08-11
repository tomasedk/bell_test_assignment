import { Dispatch } from 'redux';
import history from '../routes/history';

import { AsyncActionTypes, LoginActionTypes, ModalActionTypes, UnitActionTypes, UnitTypes } from '../HelpingFolder/Consts';
import { getUnitLink, instanceOf, masToObj } from '../HelpingFolder/UUnitFunctions';

declare function require(path: string): any;
const uuidv4 = require('uuid/v4');

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
        unitToCreate[0]=uuidv4();
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
        this.dispatch({ type: `${UnitTypes.ORGANISATION}${UnitActionTypes.DELETE}`, payload: -1 });
        this.dispatch({ type: `${UnitTypes.DEPARTMENT}${UnitActionTypes.DELETE}`, payload: -1 });
        this.dispatch({ type: `${UnitTypes.EMPLOYEE}${UnitActionTypes.DELETE}`, payload: -1 });
        this.dispatch({ type: `${UnitTypes.ORGANISATION}${UnitActionTypes.LOADED}`, payload: false});
        this.dispatch({ type: `${UnitTypes.DEPARTMENT}${UnitActionTypes.LOADED}`, payload: false});
        this.dispatch({ type: `${UnitTypes.EMPLOYEE}${UnitActionTypes.LOADED}`, payload: false});
        //то же самое с удалением подразделений и сотрудников
    };

    onLoadUnit = (typeOfUnit: string) => {
        //console.log(typeOfUnit);
        //console.log(getUnitLink(typeOfUnit));
        //Список юнитов
         fetch(getUnitLink(typeOfUnit))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw 'error';
                }
            })
            .then(data => {
                this.dispatch({type: `${typeOfUnit}${UnitActionTypes.LOADED}`, payload: true});
                for (let i = 0; i < data.length; i++) {
                    if (instanceOf(data[i], typeOfUnit)) { //Проверка, является ли объект нужного типа
                        this.dispatch({ type: `${typeOfUnit}${UnitActionTypes.ADD}`, payload: data[i] });
                    }
                };
            })
            .catch(error => {
                this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
            });
    }

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

                this.onLoadUnit(UnitTypes.ORGANISATION);
                /*Здесь идет загрузка ВСЕХ юнитов, что неверно
                //Список организаций
                //fetch('http://www.mocky.io/v2/5b62040e3000007e1c6a4467') //id - number
                //fetch('http://www.mocky.io/v2/5b65c0f23300001000f6aa5f') //id
                //fetch('http://www.mocky.io/v2/5b65d5f73300007800f6aa71') //Discriminator - с большой буквы
                fetch('http://www.mocky.io/v2/5b6ea59531000058007819d4')
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
                                this.dispatch({ type: `${UnitTypes.ORGANISATION}${UnitActionTypes.ADD}`, payload: data[i] });
                            }
                        };
                    })
                    .catch(error => {
                        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
                    });

                //Список подразделений
                //fetch('http://www.mocky.io/v2/5b63178230000062096502f1') //id - number
                //fetch('http://www.mocky.io/v2/5b65c1403300009a0df6aa61')
                //fetch('http://www.mocky.io/v2/5b65dacb3300006100f6aa7c') //Discriminator - с большой буквы
                fetch('http://www.mocky.io/v2/5b6ea6283100002a007819d5')
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
                            if (instanceOf(data[i], UnitTypes.DEPARTMENT)) { //Проверка, является ли объект подразделением
                                this.dispatch({ type: `${UnitTypes.DEPARTMENT}${UnitActionTypes.ADD}`, payload: data[i] });
                            }
                        };
                    })
                    .catch(error => {
                        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
                    });

                //Список сотрудников
                //fetch('http://www.mocky.io/v2/5b63140630000062006502e1') //id - number
                //fetch('http://www.mocky.io/v2/5b65c17e3300003810f6aa62')
                //fetch('http://www.mocky.io/v2/5b65dbca3300006100f6aa81') //Discriminator - с большой буквы
                fetch('http://www.mocky.io/v2/5b6ea65c31000056007819d7')
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
                            if (instanceOf(data[i], UnitTypes.EMPLOYEE)) { //Проверка, является ли объект сотрудником
                                this.dispatch({ type: `${UnitTypes.EMPLOYEE}${UnitActionTypes.ADD}`, payload: data[i] });
                            }
                        };
                    })
                    .catch(error => {
                        this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
                    });
                    */
            })
            .catch(error => {
                this.dispatch({ type: `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error });
            });
    };

}
