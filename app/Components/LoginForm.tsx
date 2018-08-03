import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import history from '../routes/history';
//import history from '../routes/history';

import { Actions, IDispatchProps } from '../Actions/Actions';
import LoginContainer from '../Containers/LoginContainer';
import { IStoreState } from '../HelpingFolder/Interfaces';

interface IStateProps {
    loginReducer: {
        loginStatus: boolean;
        loading: boolean;
        userData: { nickname: string, password: string };
    }
}

type TProps = IDispatchProps & IStateProps;

class Login extends React.Component<TProps, { nickname: string, pass: string }> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            nickname: '',
            pass: '',
        };
    }

    handleLogin = () => {
        const { actions } = this.props;
        actions.onLogin(this.state.nickname, this.state.pass);
    };

    handleLogout = () => {
        const { actions } = this.props;
        actions.onLogout();
    };

    //*обработка ввода логина и пароля
    onChangeNickname = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ nickname: event.currentTarget.value });
    }

    onChangePass = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ pass: event.currentTarget.value });
    }

    toCompanies = () => {
        history.push('/orgs');
    }

    render() {
        const { loginStatus, loading, userData } = this.props.loginReducer;
        return (
            <div>
                <LoginContainer loginStatus={loginStatus}
                    loading={loading}
                    username={userData.nickname}
                    login={this.handleLogin}
                    logout={this.handleLogout}
                    changeNick={this.onChangeNickname}
                    changePass={this.onChangePass}
                    toComp={this.toCompanies}
                />
            </div>
        );
    }
};

//непонятно, зачем state: IStoreState нужно
function mapStateToProps(state: IStoreState): IStateProps {
    return {
        loginReducer: state.loginReducer
        // loginStatus: state.loginStatus,
        // loading: state.loading,
        // userData: state.userData,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
    return {
        actions: new Actions(dispatch)
    };
}

const connectLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export { connectLogin as Login };
