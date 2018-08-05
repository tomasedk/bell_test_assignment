import * as React from 'react';
import { connect } from 'react-redux';
//import history from '../routes/history';
import { Link } from 'react-router-dom';
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

const NavigationBar: React.SFC<IStateProps> = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse container col-sm-8" id="navbarSupportedContent">
            <div className="container">
                <div className="row justify-content-between align-items-center ">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        {
                            props.loginReducer.loginStatus ?
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/orgs">Organisations</Link>
                                </li> : null
                        }
                    </ul>
                    <div className="col-sm-3 text-sm-right text-white">{props.loginReducer.userData.nickname || 'username'}</div>
                    {props.loginReducer.loginStatus ?
                        <img src={cat} alt="Test" className="rounded-circle" style={{ maxWidth: '40px', height: 'auto', backgroundColor: 'white' }} />
                        : <img src={unknown} alt="Test" className="rounded-circle" style={{ maxWidth: '40px', height: 'auto', backgroundColor: 'white' }} />
                    }
                </div>
            </div>
        </div>
    </nav>
)

function mapStateToProps(state: IStoreState): IStateProps {
    return {
        loginReducer: state.loginReducer
    };
}

const connectNavigationBar = connect(mapStateToProps)(NavigationBar);

export { connectNavigationBar as NavigationBar };
