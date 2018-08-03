import * as React from 'react';

import { ModalActionTypes } from '../HelpingFolder/Consts';
import { getBtnLabel, getBtnType } from '../HelpingFolder/UModalFunctions';
import { getName } from '../HelpingFolder/UUnitFunctions';

interface IPassedProps extends React.Props<any> {
    Header: string; //То, что будет написано в заголовке модального окна
    InputType: string;
    InitialMas: Array<string | number>;
    masHead: Array<any>;
    funcInput: Function; //функция, обрабатывающая ввод в Input
    funcClose: any; //функция, закрывающая модальное окно
    funcSubmit: any; //функция ПОДТВЕРЖДАЮЩАЯ действие и закр. мод. окно. Например: ADD, EDIT, DELETE.
}

const UModalInputCountainer: React.SFC<IPassedProps> = (props) => (
    <div className="container-fluid">
        <form className="border container col-sm-3" style={{ marginTop: '10%', paddingBottom: '15px' }}>
            <div className="container">
                <div className="row text-center justify-content-center">
                    <h3>{props.Header}</h3>
                </div>
                {
                    (props.InputType === ModalActionTypes.DELETE) ?
                        <div>Are you sure you want to delete the item?</div>
                        : props.masHead.map((item, index) =>
                            <div key={index} className="form-group row">
                                <label className="col-form-label col-sm-3">{getName(item)}: </label>
                                <input type="text" className="form-control col-sm-9" placeholder={item} value={typeof props.InitialMas[index] === 'string' ?
                                    props.InitialMas[index] : props.InitialMas[index].toString()}
                                    onChange={props.funcInput(item)} />
                            </div>
                        )
                }
                <div className="row text-center justify-content-between">
                    <input className="btn btn-outline-dark" type="button" value="CLOSE" onClick={props.funcClose} />
                    <input className={getBtnType(props.InputType)}
                        disabled={!(props.InitialMas.every((item) => { return !!item; }))}
                        type="button"
                        value={getBtnLabel(props.InputType)} onClick={props.funcSubmit} />
                </div>
            </div>
        </form>
    </div>
);

export default UModalInputCountainer;
