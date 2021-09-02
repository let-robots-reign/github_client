import React from 'react';

import './Input.module.scss';

export type InputProps = {
    value: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
    return <input type="text" placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;
