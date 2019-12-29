import React, {useState} from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';


import { updateObject } from '../../utils/utlity';
import './UserRegister.scss';

const blockName = 'register-wrapper';

const UserRegister = (props) => {
    const [formState, setFormState] = useState(props.initialState);

    const formElemArray = [];
    for(let key in formState.registerForm) {
        formElemArray.push({
            id: key,
            elemConfig: formState.registerForm[key]
        });
    }

    const onChangeHandler = (event, key) => {
        const updateFormField = updateObject(formState.registerForm[key], {
            value: event.target.value
        });
        const updateForm = updateObject(formState.registerForm, {
            [key]: updateFormField
        });
        setFormState({registerForm: updateForm});
    }

    return (
        <div className={blockName}>
            <form onSubmit={(event) => props.handleSubmit(event, formState)}>
               {formElemArray.map(formElement => (
                   <Input
                   key={formElement.id}
                   elementType={formElement.elemConfig.elementType}
                   config={formElement.elemConfig.config}
                   handler={(event) => onChangeHandler(event, formElement.id)}/>
               ))}
               <Button name='Submit'/>
            </form>
        </div>
    );
};

export default UserRegister;
