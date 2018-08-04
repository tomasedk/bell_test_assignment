import * as React from 'react';
//import history from '../routes/history';
import { Link } from 'react-router-dom';
declare function require(path: string): any;

class NavigationBar extends React.Component<{}, {}> {

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
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/orgs">Organisations</Link>
                                </li>
                            </ul>
                            <div className="col-sm-3 text-sm-right text-white">Username</div>
                            <img src={require('../Sources/cat.png')} alt="Test" className="rounded-circle" style={{maxWidth: '40px', height: 'auto', backgroundColor: 'white'}}/>
                        </div>
                    </div></div>
            </nav>
        );
    }
}

export default NavigationBar;
