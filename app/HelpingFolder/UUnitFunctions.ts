import { DeptProps, EmplProps, OrgProps, UnitTypes } from './Consts';
import { IOrganistion, Units } from './Interfaces';
import { isNumeric } from './UModalFunctions';

declare function require(path: string): any;
const uuidv4 = require('uuid/v4');

export function getTableHeaderMas(typeOfUnit: string): Array<any> {
    switch (typeOfUnit) {
        case (UnitTypes.ORGANISATION): return [/*OrgProps.ID,*/ OrgProps.NAME, OrgProps.ADRESS, OrgProps.INN]; break;
        case (UnitTypes.DEPARTMENT): return [/*DeptProps.ID,  DeptProps.ID_ORG, */DeptProps.NAME, DeptProps.PHONE_NUMBER]; break;
        case (UnitTypes.EMPLOYEE): return [/*EmplProps.ID,  EmplProps.ID_DEPT,*/ EmplProps.NAME, EmplProps.ADRESS, EmplProps.POSITION]; break;
    }
}
//getTableHeaderMas и getFullMasToShow обязательно должны возвращать массивы одинковой длинны, потому что оба
//  помогают в отражении данных в таблице и ModalInput

//Функция возвращает массив, состоящий из данных, которые необходимо отобразить в таблице
export function getFullMasToShow(typeOfUnit: string, object: any): Array<any> {
    //console.log('Interfaces, returnDisc: ', object, ' ', object.discriminator);
    //console.log('getFullMas', object);
    switch (typeOfUnit) {
        case UnitTypes.ORGANISATION: return [object.name, object.adress, object.inn];
        case UnitTypes.DEPARTMENT: return [object.name, object.phone];
        case UnitTypes.EMPLOYEE: return [object.name, object.adress, object.position];
    }
    return [];
}
//Функция возвращает массив, состоящий из данных, которые необходимо отобразить в таблице
export function getFullMas(typeOfUnit: string, object: any): Array<any> {
    //console.log('Interfaces, returnDisc: ', object, ' ', object.discriminator);
    //console.log('getFullMas', object);
    switch (typeOfUnit) {
        case UnitTypes.ORGANISATION: return [object.id, object.name, object.adress, object.inn];
        case UnitTypes.DEPARTMENT: return [object.id, object.parent, object.name, object.phone];
        case UnitTypes.EMPLOYEE: return [object.id, object.parent, object.name, object.adress, object.position];
    }
    return [];
}
//получает тип<string>, позвращает пустой массив нужного вида
export function getEmptyMas(parentId: string, typeOfUnit: string): Array<any> {
    //console.log('Interfaces, returnDisc: ', object, ' ', object.discriminator);
    //console.log('getEmptyMas', typeOfUnit);
    switch (typeOfUnit) {
        // case UnitTypes.ORGANISATION: return ['', '', '', 0]; //здесь ввести айдишники
        // case UnitTypes.DEPARTMENT: return ['', 0, '', 0];
        // case UnitTypes.EMPLOYEE: return ['', 0, '', '', ''];
        case UnitTypes.ORGANISATION: return [uuidv4(), '', '', 0]; //здесь ввести айдишники
        case UnitTypes.DEPARTMENT: return [uuidv4(), parentId, '', 0];
        case UnitTypes.EMPLOYEE: return [uuidv4(), parentId, '', '', ''];
    }
    return [];
}
//Функция возвращает массив, состоящий из названий полей интерфейса
//по-моему, эта штука не используется
export function getFields(Unit: any): Array<any> {
    //console.log('Interfaces, returnFields: ', object, ' ', object.discriminator);
    switch (Unit.discriminator) {
        case UnitTypes.ORGANISATION: return ['id', 'name', 'adress', 'inn'];
        case UnitTypes.DEPARTMENT: return ['id', 'parent', 'name', 'phone'];
        case UnitTypes.EMPLOYEE: return ['id', 'parent', 'name', 'adress', 'position'];
    }
    return [];
}

export function getName(typeOfUnit: string, typeOfParam: string): string {

    if (typeOfUnit === UnitTypes.ORGANISATION) {
        switch (typeOfParam) {
            case OrgProps.INN: return 'ИНН';
            case OrgProps.ADRESS: return 'Адрес';
            case OrgProps.NAME: return 'Наименование';
        }
    }

    if (typeOfUnit === UnitTypes.DEPARTMENT) {
        switch (typeOfParam) {
            case DeptProps.NAME: return 'Наименование';
            case DeptProps.PHONE_NUMBER: return 'Тел. номер';
        }
    }
    if (typeOfUnit === UnitTypes.EMPLOYEE) {
        switch (typeOfParam) {
            case EmplProps.NAME: return 'ФИО';
            case EmplProps.ADRESS: return 'Адрес';
            case EmplProps.POSITION: return 'Должность';
        }
    }
}

export function nextUnit(typeOfUnit: string): string {
    switch (typeOfUnit) {
        case (UnitTypes.ORGANISATION): return 'department';
        case (UnitTypes.DEPARTMENT): return 'employee';
        case (UnitTypes.EMPLOYEE): return '';
    }
}

//функция проверяет, является ли Объект интерфейса IOrganisation
export function instanceOf(object: Units, typeOfUnit: string): object is IOrganistion {
    //console.log(object.discriminator, ' ', DescriminatrTypes.ORGANISATION)
    return object.discriminator === typeOfUnit;
}

export function getUnitState(thatState: any, curInput: string, valueToSet: string | number) {
    //console.log('getState! ', thatState, ' ', curInput, ' ', valueToSet);
    switch (curInput) {
        case OrgProps.INN:
            if (isNumeric(valueToSet)) {
                thatState.inn = +valueToSet;
            };
            break;

        case OrgProps.ADRESS:
            thatState.adress = valueToSet.toString();
            break;

        case OrgProps.NAME:
            thatState.name = valueToSet.toString();
            break;

        case DeptProps.PHONE_NUMBER:
            if (isNumeric(valueToSet)) {
                thatState.phone = +valueToSet
            };
            break;

        case EmplProps.POSITION:
            thatState.position = valueToSet.toString();
            break;
    }
    return thatState;
}

export function masToObj(typeOfUnit: string, mas: Array<string | number>): Units {
    let newUnit: Units;
    switch (typeOfUnit) {
        case UnitTypes.ORGANISATION:
            newUnit = {
                discriminator: UnitTypes.ORGANISATION,
                id: mas[0].toString(),
                //id: uuidv4(),
                name: mas[1].toString(),
                adress: mas[2].toString(),
                inn: +mas[3],
            };
            break;
        case UnitTypes.DEPARTMENT:
            newUnit = {
                discriminator: UnitTypes.DEPARTMENT,
                id: mas[0].toString(),
                //id: uuidv4(),
                parent: mas[1].toString(),//разобраться с .toString()
                name: mas[2].toString(),
                phone: +mas[3],
            };
            break;
        case UnitTypes.EMPLOYEE:
            newUnit = {
                discriminator: UnitTypes.EMPLOYEE,
                id: mas[0].toString(),
                //id: uuidv4(),
                parent: mas[1].toString(),
                name: mas[2].toString(),
                adress: mas[3].toString(),
                position: mas[4].toString(),
            };
            break;

    }
    return newUnit;
}
