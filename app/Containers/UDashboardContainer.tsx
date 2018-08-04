import * as React from 'react';

import { UnitTypes } from '../HelpingFolder/Consts';
import { Units } from '../HelpingFolder/Interfaces';
import { getFullMasToShow, getName, getTableHeaderMas, nextUnit } from '../HelpingFolder/UUnitFunctions';

interface IPassedProps extends React.Props<any> {
    header: string;
    loginStatus: boolean;
    typeOfUnit: string;
    dataForDash: Array<Units>; //позже сюда надо будет добавить интерфейсы подразделений и сотрудника
    editRow: number;
    handleClick: Function;
    toBack: any;
    onAdd: any;
    onEdit: any;
    onDelete: any;
    onODE: any;
}

const UDashboardContainer: React.SFC<IPassedProps> = (props) => (
    <div className="container">
        <div className="row text-left justify-content-center">
            <div className="container col-sm-8">
                <div className="container">
                     <div className="row align-items-center" style={{ marginTop: '5px', marginBottom: '5px'}}>
                        <div className="col-sm-10">
                            <h3>{props.header}</h3>
                        </div>
                    </div>
                </div>
                <table id="table" className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            {
                                getTableHeaderMas(props.typeOfUnit).map((item: any, index: number) => {
                                    return (<th key={index}> {getName(props.typeOfUnit, item)}</th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dataForDash.map((elem: Units, index: number) => {
                                return (
                                    <tr key={index} className={(props.editRow === index) ? 'bg-primary' : ''} onClick={props.handleClick(index)}>
                                        {
                                            getFullMasToShow(elem.discriminator, elem).map((item: any, indexInner: number) => {
                                                return (<td key={indexInner}>{item}</td>);
                                            })
                                        }
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
                <div className="container" style={{ marginBottom: '15px' }}>
                    <div className="row justify-content-between">
                        <div className="col-sm">
                            <div className="row">
                                <input className="btn btn-outline-primary" style={{ marginRight: '5px' }} type="button" value="BACK" onClick={props.toBack} />
                                <input className="btn btn-outline-primary"
                                    disabled={(!props.loginStatus) || (props.editRow < 0) || (props.editRow >= props.dataForDash.length)}
                                    style={props.typeOfUnit !== UnitTypes.EMPLOYEE ? {} : { display: 'none' }}
                                    value={`${nextUnit(props.typeOfUnit).toUpperCase()}S`}
                                    type="button"
                                    onClick={props.onODE} /></div>
                        </div>
                        <input className="btn btn-outline-success" disabled={!props.loginStatus} type="button" value="ADD" onClick={props.onAdd} />
                        <input className="btn btn-outline-warning" style={{ marginLeft: '5px' }} disabled={(!props.loginStatus) || (props.editRow < 0) || (props.editRow >= props.dataForDash.length)} type="button" value="EDIT" onClick={props.onEdit} />
                        <input className="btn btn-outline-danger" style={{ marginLeft: '5px' }} disabled={(!props.loginStatus) || (props.editRow < 0) || (props.editRow >= props.dataForDash.length)} type="button" value="DELETE" onClick={props.onDelete} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default UDashboardContainer;
