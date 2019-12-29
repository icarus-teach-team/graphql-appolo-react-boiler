import React from 'react';
import sn from 'classnames';
import './Input.scss';

const blockName = 'input-wrapper';

const Input = (props) => {
    const { elementType, config, handler, value, label } = props;
    let inputElement = null;
    switch(elementType) {
        case 'input':
            inputElement = <input {...config} onChange={handler} value={value}/>;
            break;
        default:
            inputElement = <input {...config} onChange={handler} value={value}/>;
    }

    return (
        <div className={blockName}>
            <label className={sn(`${blockName}__label-elm`)}>{label}</label>
            <div className={sn(`${blockName}__input-elm`)}>{inputElement}</div>
        </div>
    );
};

export default Input;
