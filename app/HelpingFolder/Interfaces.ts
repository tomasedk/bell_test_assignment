import { Action } from 'redux';
import { UnitTypes } from './Consts';

export interface IActionType extends Action {
    type: string;
    payload: any;
}

export interface IStoreLoginState {
    data?: number;
    loginStatus: boolean;
    loading: boolean;
    userData: { nickname: string, password: string };
}

export interface IOrganistion {
    discriminator?: UnitTypes.ORGANISATION,
    id: number,
    name: string,
    adress: string,
    inn: number,
}

export interface IDepartment {
    discriminator?: UnitTypes.DEPARTMENT,
    id: number,
    parent: number,
    name: string,
    phone: number,
}

export interface IEmployee {
    discriminator?: UnitTypes.EMPLOYEE,
    id: number,
    parent: number,
    name: string, //FIO
    adress: string,
    position: string,
}
export type Units = IOrganistion | IDepartment | IEmployee;

export interface IStoreOrgState {
    orgData: Array<IOrganistion>;
}

export interface IStoreDeptState {
    deptData: Array<IDepartment>;
}

export interface IStoreEmplState {
    emplData: Array<IEmployee>;
}

export interface IStoreModalState {
    showModal: string;
}
//Интерфейс ВСЕГО store. Нужен, чтобы подключать в компонентах
export interface IStoreState {
    orgReducer: IStoreOrgState;
    loginReducer: IStoreLoginState;
    modalReducer: IStoreModalState;
    deptReducer: IStoreDeptState;
    emplReducer: IStoreEmplState;
}
