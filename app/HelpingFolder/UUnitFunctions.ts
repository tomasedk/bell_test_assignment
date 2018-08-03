import { DeptProps, EmplProps, OrgProps, UnitTypes } from './Consts';
import { IOrganistion, Units } from './Interfaces';

//Функция возвращает массив, состоящий из данных, которые необходимо отобразить в таблице
export function getFullMas(typeOfUnit: string, object: any): Array<any> {
    //console.log('Interfaces, returnDisc: ', object, ' ', object.discriminator);
    switch (typeOfUnit) {
        case UnitTypes.ORGANISATION: return [/*object.id,*/ object.name, object.adress, object.inn];
        case UnitTypes.DEPARTMENT: return [object.id, object.parent, object.name, object.phone];
        case UnitTypes.EMPLOYEE: return [object.id, object.parent, object.name, object.adress, object.position];
    }
    return [];
}
//получает тип<string>, позвращает пустой массив нужного вида
export function getEmptyMas(typeOfUnit: string): Array<any> {
    //console.log('Interfaces, returnDisc: ', object, ' ', object.discriminator);
    switch (typeOfUnit) {
        case UnitTypes.ORGANISATION: return [0, '', '', 0];
        case UnitTypes.DEPARTMENT: return [0, 0, '', 0];
        case UnitTypes.EMPLOYEE: return [0, 0, '', '', ''];
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

export function getTableHeaderMas(typeOfUnit: string): Array<any> {
    switch (typeOfUnit) {
        case (UnitTypes.ORGANISATION): return [/*OrgProps.ID, */OrgProps.NAME, OrgProps.ADRESS, OrgProps.INN]; break;
        case (UnitTypes.DEPARTMENT): return [DeptProps.ID, DeptProps.ID_ORG, DeptProps.NAME, DeptProps.PHONE_NUMBER]; break;
        case (UnitTypes.EMPLOYEE): return [EmplProps.ID, EmplProps.ID_DEPT, EmplProps.NAME, EmplProps.ADRESS, EmplProps.POSITION]; break;
    }
}

export function getName(typeOfParam: string): string {
    switch (typeOfParam) {
        case OrgProps.ID: return 'Id';
        case OrgProps.INN: return 'ИНН';
        case OrgProps.ADRESS: return 'Адрес';
        case OrgProps.NAME: return 'Наименование';

        case DeptProps.ID_ORG: return 'Id родителя';
        case DeptProps.PHONE_NUMBER: return 'Номер';

        case EmplProps.POSITION: return 'Должность';
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

export function masToObj(typeOfUnit: string, mas: Array<string | number>): Units {
    let newUnit: Units;
    switch (typeOfUnit) {
        case UnitTypes.ORGANISATION:
            newUnit = {
                discriminator: UnitTypes.ORGANISATION,
                id: +mas[0],
                name: mas[1].toString(),
                adress: mas[2].toString(),
                inn: +mas[3],
            };
            break;
        case UnitTypes.DEPARTMENT:
            newUnit = {
                discriminator: UnitTypes.DEPARTMENT,
                id: +mas[0],
                parent: +mas[1],
                name: mas[2].toString(),
                phone: +mas[3],
            };
            break;
        case UnitTypes.EMPLOYEE:
            newUnit = {
                discriminator: UnitTypes.EMPLOYEE,
                id: +mas[0],
                parent: +mas[1],
                name: mas[2].toString(),
                adress: mas[3].toString(),
                position: mas[4].toString(),
            };
            break;

    }
    return newUnit;
}
