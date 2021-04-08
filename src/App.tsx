import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { CustomRoute } from './components/CustomRoute/CustomRoute';
import { UserRoles } from './interfaces/User';
import { OwnerNavigator } from './Navigators/OwnerNavigator';

function App() {
    return (
        <Router>
            <Switch>
                <CustomRoute role={[]} path="/login" exact={true} component={Login} />
                <CustomRoute role={[]} path="/register" exact={true} component={Register} />
                <CustomRoute role={[UserRoles.OWNER]} path="/" exact={true} component={OwnerNavigator} />
            </Switch>
        </Router>
    );
}

export default App;
