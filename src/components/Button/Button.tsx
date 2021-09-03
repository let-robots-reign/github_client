import React from 'react';

import styles from './Button.module.scss';

export type ButtonProps = {
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => {
    return (
        <button className={styles.button} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
