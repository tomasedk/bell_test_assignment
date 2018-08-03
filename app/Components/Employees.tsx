import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';

import { UDashboard } from './UDashboard';

import { Actions, IDispatchProps } from '../Actions/Actions';
import { UnitTypes } from '../HelpingFolder/Consts';
import { IDepartment, IEmployee, IOrganistion, IStoreState } from '../HelpingFolder/Interfaces';
//import history from '../routes/history';

interface IStateProps {
    orgReducer: {
        orgData: Array<IOrganistion>;
    };
    deptReducer: {
        deptData: Array<IDepartment>;
    };
    emplReducer: {
        emplData: Array<IEmployee>;
    };
}

interface IPassedProps extends React.Props<any> {
    match: any;
}
type TProps = IDispatchProps & IStateProps & IPassedProps;

class Employees extends React.Component<TProps, {}> {

    constructor(props: any, context: any) {
        super(props, context);
        //console.log('DepDashboard, constructor, props:', this.props);
        //console.log('match.params', this.props.match.params.id);
    }

    render() {
        const parent: number = +this.props.match.params.id;
        let companyDept: string = 'UNKNOWN';

        for (let i = 0; i < this.props.deptReducer.deptData.length; i++) {
            if (this.props.deptReducer.deptData[i].id === parent) {
                companyDept = this.props.deptReducer.deptData[i].name;
            }
        }

        const Header = `Employees of ${companyDept} department.`;

        const mas = this.props.emplReducer.emplData.filter((item) => {
            return item.parent === parent;
        });

        //console.log('mas', mas);
        return (
            <div>
                <UDashboard
                    dataForDash={mas}
                    header={Header}
                    typeOfUnit={UnitTypes.EMPLOYEE} />
            </div>
        );
    }
};

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        orgReducer: state.orgReducer,
        deptReducer: state.deptReducer,
        emplReducer: state.emplReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectEmpl = connect(mapStateToProps, mapDispatchToProps)(Employees);

export { connectEmpl as Employees };
