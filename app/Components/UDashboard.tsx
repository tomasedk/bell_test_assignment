import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import history from '../routes/history';

import UDashboardContainer from '../Containers/UDashboardContainer';
import { UModalInput } from './UModalInput';

import { Actions, IDispatchProps } from '../Actions/Actions';
import { ModalActionTypes } from '../HelpingFolder/Consts'
import { IStoreState } from '../HelpingFolder/Interfaces';
import { needToLoad, nextUnit } from '../HelpingFolder/UUnitFunctions';

interface IStateProps {
    loginReducer: {
        loginStatus: boolean;
        loadedComp: boolean;
        loadedDept: boolean;
        loadedEmpl: boolean;
    };
    modalReducer: {
        showModal: string;
    };
}

interface IPassedProps extends React.Props<any> {
    header: string;
    dataForDash: Array<any>; //скорее всего можно будет Unit
    typeOfUnit: string;
    parentId: string; //Id родителя
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
    //возврат назад
    handleBack = () => { history.goBack() }

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
        //console.log(this.props.match.params.id.toString());
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
        if (needToLoad(this.props.loginReducer, nextUnit(this.props.typeOfUnit))) {
            this.props.actions.onLoadUnit(nextUnit(this.props.typeOfUnit));
        };
        history.push(`/${nextUnit(this.props.typeOfUnit).toLowerCase()}/${this.props.dataForDash[this.state.editRow].id}`);
    }

    render() {
        const { loginStatus } = this.props.loginReducer;
        const editRow: number = this.state.editRow;
        //console.log('UniversalForm, render, dataForDash: ', this.props.dataForDash);
        //console.log('UniversalForm, render, editRow: ', editRow);
        return (
            <div>
                {this.props.modalReducer.showModal !== ModalActionTypes.HIDE ?
                        <UModalInput
                            parentId={this.props.parentId}
                            selectedUnit={this.props.dataForDash[editRow !== -1 ? editRow : 0]}
                            typeOfUnit={this.props.typeOfUnit} />
                        : null}

                <div className="Content">
                    <UDashboardContainer
                        header={this.props.header}
                        loginStatus={loginStatus}
                        typeOfUnit={this.props.typeOfUnit}
                        dataForDash={this.props.dataForDash}
                        editRow={editRow}
                        handleClick={this.onTableClickLine}
                        toBack={this.handleBack}
                        onAdd={this.onModalAdd}
                        onEdit={this.onModalEdit}
                        onDelete={this.onModalDelete}
                        onODE={this.onODEClick} />
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
