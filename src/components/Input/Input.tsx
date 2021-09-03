import React from 'react';

import './Input.module.scss';

export type InputProps = {
    value: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange, onKeyUp }) => {
    return <input type="text" placeholder={placeholder} value={value} onChange={onChange} onKeyUp={onKeyUp} />;
};

export default Input;
