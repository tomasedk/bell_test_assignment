import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';

import { UDashboard } from './UDashboard';

import { Actions, IDispatchProps } from '../Actions/Actions';
import { UnitTypes } from '../HelpingFolder/Consts';
import { IDepartment, IOrganistion, IStoreState } from '../HelpingFolder/Interfaces';
//import history from '../routes/history';

interface IStateProps {
    deptReducer: {
        deptData: Array<IDepartment>;
    };
    orgReducer: {
        orgData: Array<IOrganistion>;
    };
}

interface IPassedProps extends React.Props<any> {
    match: any;
}
type TProps = IDispatchProps & IStateProps & IPassedProps;

class Departments extends React.Component<TProps, {}> {

    constructor(props: any, context: any) {
        super(props, context);
        //console.log('DepDashboard, constructor, props:', this.props);
        //console.log('match.params', this.props.match.params.id);
    }

    render() {
        const parent: string = this.props.match.params.id.toString();
        let companyName: string ='UNKNOWN';
        //console.log(this.props.orgReducer, ' ', this.props.match.params);
        for (let i=0;i<this.props.orgReducer.orgData.length;i++) {
            if (this.props.orgReducer.orgData[i].id === parent) {
                //console.log(this.props.orgReducer.orgData[i].id, ' ', parent);
                companyName = this.props.orgReducer.orgData[i].name;
            }
        }
        const Header = `Departments of ${companyName} company.`;

        const mas = this.props.deptReducer.deptData.filter((item) => {
                return item.parent === parent;
        });

        //console.log('mastoDash', mas);
        return (
            <div>
                <UDashboard
                    parentId={parent}
                    dataForDash={mas}
                    header={Header}
                    typeOfUnit={UnitTypes.DEPARTMENT}/>
            </div>
        );
    }
};

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        deptReducer: state.deptReducer,
        orgReducer: state.orgReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectDept = connect(mapStateToProps, mapDispatchToProps)(Departments);

export { connectDept as Departments };
