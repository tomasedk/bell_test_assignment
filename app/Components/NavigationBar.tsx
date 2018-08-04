import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
//import history from '../routes/history';
import { Link } from 'react-router-dom';
import { Actions, IDispatchProps } from '../Actions/Actions';
import { IStoreState } from '../HelpingFolder/Interfaces';

declare function require(path: string): any;
const cat = require('../Sources/cat.png');
const unknown = require('../Sources/unknown.png');

interface IStateProps {
    loginReducer: {
        loginStatus: boolean;
        userData: { nickname: string, password: string };
    }
}

type TProps = IDispatchProps & IStateProps;

class NavigationBar extends React.Component<TProps, {}> {

    constructor(props: any, context: any) {
        super(props, context);
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse container col-sm-8" id="navbarSupportedContent">
                    <div className="container">
                        <div className="row justify-content-between align-items-center ">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/">Home</Link>
                                </li>
                                {
                                    this.props.loginReducer.loginStatus ?
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/orgs">Organisations</Link>
                                        </li> : null
                                }

                            </ul>
                            <div className="col-sm-3 text-sm-right text-white">{this.props.loginReducer.userData.nickname || 'username'}</div>
                            {this.props.loginReducer.loginStatus ?
                                <img src={cat} alt="Test" className="rounded-circle" style={{ maxWidth: '40px', height: 'auto', backgroundColor: 'white' }} />
                                : <img src={unknown} alt="Test" className="rounded-circle" style={{ maxWidth: '40px', height: 'auto', backgroundColor: 'white' }} />
                            }
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        loginReducer: state.loginReducer
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectNavigationBar = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

export { connectNavigationBar as NavigationBar };
