import React, { useEffect, useState } from 'react';

import { Drawer } from 'antd';

import GitHubStore from '@/store/GitHubStore';
import { Branch, RepoItem } from '@/store/GitHubStore/types';

type DrawerOnCloseEvent = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type RepoBranchesDrawerProps = {
    selectedRepo: RepoItem | null;
    onClose: (e: DrawerOnCloseEvent) => void;
};

const gitHubStore = new GitHubStore();

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ selectedRepo, onClose }) => {
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        if (!selectedRepo) {
            setBranches([]);
            return;
        }

        let mounted = true;

        (async () => {
            const response = await gitHubStore.getBranchesForRepo({
                owner: selectedRepo.owner.login,
                repoName: selectedRepo.name,
            });
            if (response.success && mounted) {
                setBranches(response.data);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [selectedRepo]);

    if (selectedRepo === null) {
        return null;
    }

    return (
        <Drawer title={`Ветки ${selectedRepo.name}`} placement="right" onClose={onClose} visible>
            {branches.map((branch) => {
                return (
                    <h3 key={branch.name}>
                        <strong>{branch.name}</strong>
                    </h3>
                );
            })}
        </Drawer>
    );
};

export default RepoBranchesDrawer;
