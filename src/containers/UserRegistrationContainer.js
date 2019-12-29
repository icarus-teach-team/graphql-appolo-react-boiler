import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import UserRegister from '../components/UserRegister/UserRegister';

const UserRegisterContainer = (props) => {
    let initialState = {
        registerForm: {
            name: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'User Name'
                },
                value: '',
                label: 'User Name',
            },
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

    const CREATE_USER = gql `
        mutation CreateUser($name: String!, $email: String!, $password: String!) {
            createUser(data: {name: $name, email: $email, password: $password}) {
            user {
                name,
                email,
                password
            },
            token
            }
        }
    `;

    const [createUser, {error, data}] = useMutation(CREATE_USER);

    useEffect(() => {
        console.log(data)
        try {
            if (data && data.createUser) {
                props.history.push('/');
            }
        } catch(err) {
            alert(err.message);
        }
    }, [data]);

    const handleSubmit = (event, formState) => {
        console.log(formState.registerForm);
        const name = formState.registerForm.name.value;
        const email = formState.registerForm.email.value;
        const password = formState.registerForm.password.value;

        createUser({variables: {name, email, password}});
        event.preventDefault();
    }

    return (
        <UserRegister initialState={initialState} handleSubmit={(event, formState) => handleSubmit(event, formState)}/>
    )

}


export default withRouter(UserRegisterContainer);