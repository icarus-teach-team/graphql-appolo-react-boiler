import React, {useEffect} from 'react';
import gql from 'graphql-tag';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { useQuery, useMutation } from '@apollo/react-hooks';

import * as authAction from '../store/actions/authActions';

import UserLogin from '../components/UserLogin/UserLogin';

const UserLoginContainer = (props) => {
    let initialState = {
        loginForm: {
            email: {
                elementType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                label: 'Email',
            },
            password: {
                elementType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: 'Password',
            }
        }
    };

    const LOGIN_USER = gql `
        mutation LoginUser($email: String!, $password: String!) {
            login(data: {email: $email, password: $password}) {
            user {
                email,
                password
            },
            token
            }
        }
    `;

    const [loginUser, {error, data}] = useMutation(LOGIN_USER);

    useEffect(() => {
        if(data && data.login) {
            const token = data.login.token
            console.log(token)
            if (token) {
                window.sessionStorage.setItem("token", token);
                props.history.replace('/');
                props.setAuth(true);
            }
        }
    }, [data]);

    const handleSubmit = (event, formState) => {
        console.log(formState.loginForm);
        const email = formState.loginForm.email.value;
        const password = formState.loginForm.password.value;

        loginUser({variables: {email, password}});
        event.preventDefault();
    }

    return (
        <UserLogin initialState={initialState} handleSubmit={(event, formState) => handleSubmit(event, formState)}/>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuth: (payload) => dispatch(authAction.setAuthenticate(payload))
    };
;}

export default connect(null, mapDispatchToProps)(withRouter(UserLoginContainer));