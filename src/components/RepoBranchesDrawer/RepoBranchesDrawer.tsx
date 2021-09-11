import React, { useEffect, useState } from 'react';

import { Drawer } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

import GitHubStore from '@/store/GitHubStore';
import { Branch } from '@/store/GitHubStore/types';

type DrawerURLParams = {
    id?: string;
};

const gitHubStore = new GitHubStore();

const RepoBranchesDrawer: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

    const history = useHistory();
    const { id } = useParams<DrawerURLParams>();

    const onDrawerClose = () => history.push('/repos');

    useEffect(() => {
        if (!id) {
            setBranches([]);
            return;
        }

        let mounted = true;

        (async () => {
            const response = await gitHubStore.getBranchesForRepo({
                id,
            });
            if (response.success && mounted) {
                setBranches(response.data);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [id]);

    if (!id) {
        return null;
    }

    return (
        <Drawer title="Ветки" placement="right" onClose={onDrawerClose} visible>
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
