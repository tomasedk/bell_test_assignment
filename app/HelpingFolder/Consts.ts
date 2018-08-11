export enum LoginActionTypes {
    LOGIN = 'ACTION_LOGIN',
    LOGOUT = 'ACTION_LOGOUT',
    CLICK = 'ACTION_CLICK',
}

export enum AsyncActionTypes {
    BEGIN = '_BEGIN',
    SUCCESS = '_SUCCESS',
    FAILURE = '_FAILURE',
}

export enum OrgProps {
    ID = 'id',
    NAME = 'name',
    ADRESS = 'adress',
    INN = 'inn',
}

export enum DeptProps {
    ID = 'id',// Идентификатор
    ID_ORG = 'parent_id',// Идентификатор организации, к которой принадлежит подразделение
    NAME = 'name', // Название
    PHONE_NUMBER = 'phone_number',// Телефон
}

export enum EmplProps {
    ID = 'id',
    ID_DEPT = 'parent_id',
    NAME = 'name', //FIO
    ADRESS = 'adress',
    POSITION = 'pos',
}

export enum UnitActionTypes {
    ADD = '_ADD',
    EDIT = '_EDIT',
    DELETE = '_DELETE',
    LOADED = 'LOADED_FROM_NET',
}

export enum ModalActionTypes {
    ADD = 'MODAL_ADD',
    EDIT = 'MODAL_EDIT',
    DELETE = 'MODAL_DELETE',
    HIDE = 'MODAL_HIDE',
}

// export enum UnitTypes {
//     ORGANISATION = 'Company',
//     DEPARTMENT = 'Department',
//     EMPLOYEE = 'Employee',
// }

export enum UnitTypes {
    ORGANISATION = 'COMPANY',
    DEPARTMENT = 'DEPARTMENT',
    EMPLOYEE = 'EMPLOYEE',
}

export enum UnitTypeRefs {
    ORGANISATION = 'http://www.mocky.io/v2/5b6ea59531000058007819d4',
    DEPARTMENT = 'http://www.mocky.io/v2/5b6ea6283100002a007819d5',
    EMPLOYEE = 'http://www.mocky.io/v2/5b6ea65c31000056007819d7',
}
