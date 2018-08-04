import * as React from 'react';

//declare function require(path: string): any; //раскомментить с img

interface IPassedProps extends React.Props<any> {
    loginStatus: boolean;
    loading: boolean;
    username: string;
    login: any;
    logout: any;
    changeNick: any;
    changePass: any;
    toComp: any;
}

const LoginContainer: React.SFC<IPassedProps> = (props) => (
    <div className="container-fluid">
        <form className="border container col-sm-3" style={{ 'marginTop': '10%' }}>
            <div className="row text-center justify-content-center">
                {/* <img src="https://yt3.ggpht.com/-T_KlzqLKWLQ/AAAAAAAAAAI/AAAAAAAAAAA/1lOGspT3j5s/s240-c-k-no-mo-rj-c0xffffff/photo.jpg" /> */}
                {/* <img src={require('../Sources/cat2.png')} alt="Test" className="rounded-circle center-block" /> */}
                <h2>Authorization</h2>
            </div>
            <div className="row text-center justify-content-center">
                <div className="col-sm-11">
                    {
                        props.loading ?
                            <p>Авторизация...</p>
                            :
                            props.loginStatus ?
                                <div className="form-group">
                                    <h4>Login success, {props.username}!</h4>
                                    <div> {/*Если убрать этот блок, то будет баг, что pass будет заменяться на LOGOUT */}
                                        <div className="row text-center justify-content-between">
                                            <input className="btn btn-outline-warning" disabled={props.loading} type="button" value="LOGOUT" onClick={props.logout} />
                                            <input className="btn btn-outline-primary" disabled={props.loading} type="button" value="TO COMPANIES" onClick={props.toComp} />
                                        </div>
                                    </div>
                                </div> :
                                <div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="nickname" onChange={props.changeNick} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="password" onChange={props.changePass} />
                                    </div>
                                    <div className="form-group">
                                        <input className="btn btn-outline-primary w-100" disabled={props.loading} type="button" value="LOGIN" onClick={props.login} />
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </form>
    </div>
);

export default LoginContainer;
