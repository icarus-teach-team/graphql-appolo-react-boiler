import React, {lazy, Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


const UserRegisterContainer = lazy(() => import('./containers/UserRegistrationContainer'));
const UserLoginContainer = lazy(() => import('./containers/UserLoginContainer'));
const UserProfile = lazy(() => import('./components/UserProfile/UserProfile.js'));

const App = (props) => {
    let route = (
        <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/" component={UserLoginContainer} />
                <Route path="/register" component={UserRegisterContainer} />
                <Route exact path="/profile" component={UserProfile} />
        </Suspense>
    )

    if (window.sessionStorage.getItem("token")) {
        route = (
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/" component={UserProfile} />
                <Route path="/register" component={UserRegisterContainer} />
                <Route exact path="/login" component={UserLoginContainer} />
            </Suspense>
        )
    }
    return route;
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    };
}

export default connect(mapStateToProps)(App);
