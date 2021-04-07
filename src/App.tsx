import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { CustomRoute } from './components/CustomRoute/CustomRoute';

function App() {
    return (
        <Router>
            <Switch>
                <CustomRoute path="/login" exact={true} component={Login} />
                <CustomRoute path="/register" exact={true} component={Register} />
            </Switch>
        </Router>
    );
}

export default App;
