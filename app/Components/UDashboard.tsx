import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import history from '../routes/history';

import UDashboardContainer from '../Containers/UDashboardContainer';
import { UModalInput } from './UModalInput';

import { Actions, IDispatchProps } from '../Actions/Actions';
import { ModalActionTypes } from '../HelpingFolder/Consts'
import { IStoreState } from '../HelpingFolder/Interfaces';
import { nextUnit } from '../HelpingFolder/UUnitFunctions';

interface IStateProps {
    loginReducer: {
        loginStatus: boolean;
    };
    modalReducer: {
        showModal: string;
    };
}

interface IPassedProps extends React.Props<any> {
    header: string;
    dataForDash: Array<any>; //скорее всего можно будет Unit
    typeOfUnit: string;
}

type TProps = IDispatchProps & IStateProps & IPassedProps;

interface IStateLocal {
    selectedRowId: number, //при нажатии на изменение Орг, запоминается ее Id
    editRow: number, //при нажатии на изменение Орг, запоминается ее Порядковый номер в таблице
}

class UDashboard extends React.Component<TProps, IStateLocal> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            selectedRowId: -1,
            editRow: -1,
        };
        //console.log('UDashBoard, const, props: ', this.props);
    }

    //возврат в корень
    handleReturnToRoot = () => { history.push('/'); }

    //обработчик открытия модального окна.
    onModalAdd = () => { this.props.actions.onShowModal(ModalActionTypes.ADD); };

    //обработчик открытия модального окна.
    onModalEdit = () => { this.props.actions.onShowModal(ModalActionTypes.EDIT); };

    //обработчик закрытия модального окна.
    onModalDelete = () => {
        this.props.actions.onShowModal(ModalActionTypes.DELETE);
        //this.setState({ editRow: this.state.editRow - 1 });
    };

    //обработчик нажатия на строку в таблице. Задает selectedRowId, editRow
    onTableClickLine = (index: number) => {
        let currentEnv = this;
        let currentMas = this.props.dataForDash[index];
        return function () {
            currentEnv.setState({
                selectedRowId: currentMas.id,
                editRow: index
            });
        };
    }

    //OrgDeptEmpl
    onODEClick = () => {
        //console.log('UniversalForm, render, props: ', this.props.dataForDash[this.state.editRow].id);
        history.push(`/${nextUnit(this.props.typeOfUnit)}/${this.props.dataForDash[this.state.editRow].id}`);
    }

    render() {
        const { loginStatus } = this.props.loginReducer;
        const editRow: number = this.state.editRow;
        //console.log('UniversalForm, render, dataForDash: ', this.props.dataForDash);
        //console.log('UniversalForm, render, editRow: ', editRow);

        return (
            <div>
                {this.props.modalReducer.showModal !== ModalActionTypes.HIDE ?
                        <UModalInput selectedUnit={this.props.dataForDash[editRow !== -1 ? editRow : 0]} typeOfUnit={this.props.typeOfUnit} />
                        : null}

                <div className="Content">
                    <UDashboardContainer
                        header={this.props.header}
                        loginStatus={loginStatus}
                        typeOfUnit={this.props.typeOfUnit}
                        dataForDash={this.props.dataForDash}
                        editRow={editRow}
                        handleClick={this.onTableClickLine}
                        toRoot={this.handleReturnToRoot}
                        onAdd={this.onModalAdd}
                        onEdit={this.onModalEdit}
                        onDelete={this.onModalDelete}
                        onODE={this.onODEClick} />
                    {/* <input className="btn btn-outline-primary" type="button" value="Homepage" onClick={this.handleReturnToRoot} />
                    <input className="btn btn-outline-success" disabled={!loginStatus} type="button" value="ADD" onClick={this.onModalAdd} />
                    <input className="btn btn-outline-warning" disabled={(!loginStatus) || (editRow < 0) || (editRow >= this.props.dataForDash.length)} type="button" value="EDIT" onClick={this.onModalEdit} />
                    <input className="btn btn-outline-danger" disabled={(!loginStatus) || (editRow < 0) || (editRow >= this.props.dataForDash.length)} type="button" value="DELETE" onClick={this.onModalDelete} />
                    <input className="btn btn-outline-primary" disabled={(!loginStatus) || (editRow < 0) || (editRow >= this.props.dataForDash.length)} style={this.props.typeOfUnit !== UnitTypes.EMPLOYEE  ? {} : { display: 'none' }} type="button" value={`${nextUnit(this.props.typeOfUnit).toUpperCase()}S`} onClick={this.onODEClick} /> */}
                </div>
            </div>
        );
    }
};

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        loginReducer: state.loginReducer,
        modalReducer: state.modalReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectUDashboard = connect<{}, {}, IPassedProps>(mapStateToProps, mapDispatchToProps)(UDashboard);

export { connectUDashboard as UDashboard };
