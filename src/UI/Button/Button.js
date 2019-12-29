import React from 'react';
import sn from 'classnames';
import './Button.scss';

const blockName = 'input-wrapper';

const Button = (props) => {
    const {name, handler} = props;
    return <button className={blockName} onClick={handler}>{name}</button>;
};

export default Button;
