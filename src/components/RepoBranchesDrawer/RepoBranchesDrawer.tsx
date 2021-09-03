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
    if (selectedRepo === null || !visible) {
        return null;
    }
    return (
        <Drawer title={selectedRepo.title} placement="right" onClose={onClose} visible={visible}>
            <h3>{selectedRepo.title}</h3>
            <p>{selectedRepo.url}</p>
        </Drawer>
    );
};

export default RepoBranchesDrawer;
