import React from 'react';

export type AvatarProps = {
    src?: string;
    alt?: string;
    letter?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    return <img src={src} alt={alt} />;
};

export default Avatar;
