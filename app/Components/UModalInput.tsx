import * as React from 'react';
import * as ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import UModalInputCountainer from '../Containers/UModalInputCountainer'

import { Actions, IDispatchProps } from '../Actions/Actions';
import { ModalActionTypes } from '../HelpingFolder/Consts';
import { IStoreState, Units } from '../HelpingFolder/Interfaces';
import { getModalFunction, getModalHeader } from '../HelpingFolder/UModalFunctions';
import { getEmptyMas, getFullMas, getFullMasToShow, getTableHeaderMas, getUnitState, masToObj } from '../HelpingFolder/UUnitFunctions';

interface IStateProps {
    modalReducer: {
        showModal: string;
    }
}

interface IPassedProps extends React.Props<any> {
    selectedUnit: Units;
    typeOfUnit: string;
    parentId: string
}

interface IStateLocal {
    discriminator?: string;
    id: string, //ID в модальном окне
    inn?: number, //INN в модальном окне
    adress?: string, //ADR в модальном окне
    name: string //NAME в модальном окне

    parent?: string;
    phone?: number;

    position?: string;
}

type TProps = IDispatchProps & IStateProps & IPassedProps;

class UModalInput extends React.Component<TProps, IStateLocal> {

    constructor(props: any, context: any) {
        super(props, context);

        const tmpUnit = props.selectedUnit;////нужно ли?
        //console.log('YOOOOOOOO', this.props.typeOfUnit);
        //console.log('hello! ', this.props.parentId);

        if (props.modalReducer.showModal === ModalActionTypes.ADD) {
            this.state = masToObj(this.props.typeOfUnit, getEmptyMas(this.props.parentId, this.props.typeOfUnit));
        } else if (typeof tmpUnit !== 'undefined') {
            this.state = masToObj(this.props.typeOfUnit, getFullMas( this.props.typeOfUnit, tmpUnit));
        } else { //А это неприятная ситуация, когда получается обращение к undefined
            this.onModalClose(); console.log('ATTENTION!!!'); //не удалять этот лог
        };
        //console.log('UnivModal, constr, state: ', this.state);
    };

    //обработчик изменения Input в модальном окне. Изменяет id.. в this.state
    onModalChangeInput = (currentInput: string) => {
        let currentEnv = this;

        return function (event: React.FormEvent<HTMLInputElement>) {
            currentEnv.setState(getUnitState(currentEnv.state, currentInput, event.currentTarget.value));
        }
    };

    //обработчик закрытия модального окна без последствий
    onModalClose = () => { this.props.actions.onHideModal(); };

    //обработчик закрытия модального окна с добавлением организации
    onModalAddSubmit = () => {
        this.props.actions.onAddUnit(this.props.typeOfUnit, getFullMas(this.props.typeOfUnit, this.state));
    };

    //обработчик закрытия модального окна с изменением unit'а
    //с id: this.props.selectedUnit.id////
    onModalEditSubmit = () => {
        this.props.actions.onEditUnit(this.props.typeOfUnit, this.props.selectedUnit.id, getFullMas(this.props.typeOfUnit, this.state));
    };

    //обработчик закрытия модального окна с удалением организации с id: this.props.selectedUnit.id////
    onModalDeleteSubmit = () => { this.props.actions.onDeleteUnit(this.props.typeOfUnit, this.props.selectedUnit.id); };////

    render() {
        //console.log('OrgModal.tsx, render, props: ', this.props);
        //console.log('OrgModal.tsx, render, state: ', this.state);
        return (
            <div>
                <ReactModal
                    isOpen={this.props.modalReducer.showModal !== ModalActionTypes.HIDE}
                    contentLabel="Minimal Modal Example"
                    className="Modal"
                    ariaHideApp={false}
                >
                    <UModalInputCountainer
                        Header={getModalHeader(this.props.modalReducer.showModal, this.props.typeOfUnit, this.state.name, this.props.selectedUnit)}
                        InputType={this.props.modalReducer.showModal}
                        typeOfUnit={this.props.typeOfUnit}
                        InitialMas={getFullMasToShow(this.props.typeOfUnit, this.state)}
                        masHead={getTableHeaderMas(this.props.typeOfUnit)}
                        funcInput={this.onModalChangeInput}
                        funcClose={this.onModalClose}
                        funcSubmit={getModalFunction(this.props.modalReducer.showModal, this.onModalAddSubmit, this.onModalEditSubmit, this.onModalDeleteSubmit)}
                    />
                </ReactModal>
            </div>
        )
    };
}

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        modalReducer: state.modalReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectUModalInput = connect<{}, {}, IPassedProps>(mapStateToProps, mapDispatchToProps)(UModalInput);

export { connectUModalInput as UModalInput };
