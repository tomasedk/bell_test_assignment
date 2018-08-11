import { ModalActionTypes } from './Consts';
import { Units } from './Interfaces';

export function getBtnType(object: string): string {
    switch (object) {
        case ModalActionTypes.ADD: return 'btn btn-outline-success';
        case ModalActionTypes.EDIT: return 'btn btn-outline-warning';
        case ModalActionTypes.DELETE: return 'btn btn-outline-danger';
    };
    return 'UNKNOWN(getBtnType)';
}

export function getBtnLabel(object: string): string {
    switch (object) {
        case ModalActionTypes.ADD: return 'ADD';
        case ModalActionTypes.EDIT: return 'EDIT';
        case ModalActionTypes.DELETE: return 'DELETE';
    };
    return 'UNKNOWN(getBtnLabel)';
}

export function getModalHeader(ModalType: string, typeOfUnit: string, name_1: string, name_2: Units): string {
    switch (ModalType) { // Это потом раскоментить с (*)
        case ModalActionTypes.ADD:
            return `Add ${typeOfUnit.toLowerCase()}: ${name_1}`;
        case ModalActionTypes.EDIT:
            return `Edit ${typeOfUnit.toLowerCase()}: ${name_2.name}`;
        case ModalActionTypes.DELETE:
            return `Delete ${typeOfUnit.toLowerCase()}: ${name_2.name}?`;
    }
}

export function getModalFunction(ModalType: string, add: Function, edit: Function, del: Function): Function {
    switch (ModalType) {
        case ModalActionTypes.ADD: return add;
        case ModalActionTypes.EDIT: return edit;
        case ModalActionTypes.DELETE: return del;
    }
}

export function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
