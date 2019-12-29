import React, {useState} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import sn from 'classnames';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { updateObject } from '../../utils/utlity';

import './UserLogin.scss';

const blockName = 'login-wrapper';

const UserLogin = (props) => {
    const [formState, setFormState] = useState(props.initialState);

    const formElemArray = [];
    for(let key in formState.loginForm) {
        formElemArray.push({
            id: key,
            elemConfig: formState.loginForm[key]
        });
    }

    const onChangeHandler = (event, key) => {
        const updateFormField = updateObject(formState.loginForm[key], {
            value: event.target.value
        });
        const updateForm = updateObject(formState.loginForm, {
            [key]: updateFormField
        });
        setFormState({loginForm: updateForm});
    }

    const registerRedirect = (event) => {
        event.preventDefault();
        props.history.replace('/register');
        
    }

    return (
        <div className={blockName}>
            <form>
               {formElemArray.map(formElement => (
                   <Input
                   key={formElement.id}
                   elementType={formElement.elemConfig.elementType}
                   config={formElement.elemConfig.config}
                   handler={(event) => onChangeHandler(event, formElement.id)}/>
               ))}
               <div className={`${blockName}__button`}>
                    <Button handler={(event) => props.handleSubmit(event, formState)} name='Login' />
                    <Button handler={(event) => registerRedirect(event)} name='Register' />
               </div>
            </form>
        </div>
    );
};


export default withRouter(UserLogin);
