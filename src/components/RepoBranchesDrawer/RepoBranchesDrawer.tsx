import React from 'react';

import { Drawer } from 'antd';

import { RepoItem } from '@/store/GitHubStore/types';

type DrawerOnCloseEvent = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type RepoBranchesDrawerProps = {
    selectedRepo: RepoItem | null;
    visible: boolean;
    onClose: (e: DrawerOnCloseEvent) => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ selectedRepo, visible, onClose }) => {
    return (
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    );
};

export default RepoBranchesDrawer;
