import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';

import { Companies } from '../Components/Companies'
import { Departments } from '../Components/Departments';
import { Employees } from '../Components/Employees';
import { Login } from '../Components/LoginForm';
import { NavigationBar } from '../Containers/NavigationBar';
import NotFound from '../Containers/NotFound';

const AppRouter: any = () => (
    <Router history={history}>
        <div>
            <NavigationBar />
            <Switch>
                <Route path="/" component={Login} exact={true} />
                <Route path="/orgs" component={Companies} />
                <Route path="/department/:id" component={Departments} />
                <Route path="/employee/:id" component={Employees} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
