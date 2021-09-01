import React from 'react';

import './Button.module.scss';

export type ButtonProps = {
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => {
    return (
        <button disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;