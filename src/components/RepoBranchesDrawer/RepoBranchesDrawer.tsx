import React, { useEffect, useState } from 'react';

import { Drawer } from 'antd';

import GitHubStore from '@/store/GitHubStore';
import { RepoItem } from '@/store/GitHubStore/types';

type DrawerOnCloseEvent = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type RepoBranchesDrawerProps = {
    selectedRepo: RepoItem | null;
    visible: boolean;
    onClose: (e: DrawerOnCloseEvent) => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ selectedRepo, visible, onClose }) => {
    const [branches, setBranches] = useState<string[]>([]);

    useEffect(() => {
        if (selectedRepo === null) {
            setBranches([]);
            return;
        }

        let mounted = true;
        const gitHubStore = new GitHubStore();
        gitHubStore
            .getBranchesForRepo({
                owner: selectedRepo.owner.login,
                repoName: selectedRepo.title,
            })
            .then((response) => {
                if (response.success && mounted) {
                    const branches = response.data.map((item: any) => item.name);
                    setBranches(branches);
                }
            });

        return () => {
            mounted = false;
        };
    }, [selectedRepo]);

    if (selectedRepo === null || !visible) {
        return null;
    }

    return (
        <Drawer title={`Ветки ${selectedRepo.title}`} placement="right" onClose={onClose} visible={visible}>
            {branches.map((branch) => {
                return (
                    <h3 key={branch}>
                        <strong>{branch}</strong>
                    </h3>
                );
            })}
        </Drawer>
    );
};

export default RepoBranchesDrawer;
