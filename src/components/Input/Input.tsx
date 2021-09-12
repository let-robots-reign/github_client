import React from 'react';

import styles from './Input.module.scss';

export type InputProps = {
    value: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange, onKeyUp }) => {
    return (
        <input
            className={styles.input}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
        />
    );
};

export default React.memo(Input);
