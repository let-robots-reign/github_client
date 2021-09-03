import React from 'react';

import styles from './Avatar.module.scss';

export type AvatarProps = {
    src?: string;
    alt?: string;
    letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    if (src) {
        return (
            <div className={styles.avatar}>
                <img src={src} alt={alt} />
            </div>
        );
    }
    return <div className={`${styles.avatar} ${styles['avatar-letter']}`}>{letter}</div>;
};

export default Avatar;
