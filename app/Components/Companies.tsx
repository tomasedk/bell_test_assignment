import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { Link } from 'react-router-dom';

import { UDashboard } from './UDashboard';

import { Actions, IDispatchProps } from '../Actions/Actions';
import { UnitTypes } from '../HelpingFolder/Consts';
import { IOrganistion, IStoreState } from '../HelpingFolder/Interfaces';

interface IStateProps {
    loginReducer: {
        userData: { nickname: string, password: string };
    };
    orgReducer: {
        orgData: Array<IOrganistion>;
    };
}

type TProps = IDispatchProps & IStateProps;

class Companies extends React.Component<TProps, {}> {

    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        const Header = `Hello, ${this.props.loginReducer.userData.nickname || 'username'}!`;
        return (
            <div>
                <UDashboard
                    dataForDash={this.props.orgReducer.orgData}
                    header={Header}
                    typeOfUnit={UnitTypes.ORGANISATION} />
            </div>
        );
    }
};

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        loginReducer: state.loginReducer,
        orgReducer: state.orgReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectComp = connect(mapStateToProps, mapDispatchToProps)(Companies);

export { connectComp as Companies };
