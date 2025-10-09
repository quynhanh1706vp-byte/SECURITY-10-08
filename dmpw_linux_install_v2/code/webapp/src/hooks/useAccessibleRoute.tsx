import { checkAuthority, hasRoleFullAccess } from '@providers/auth-provider/auth-provider.client';
import { useResource } from '@refinedev/core';
import { useMemo } from 'react';

export const useAccessibleResource = () => {
  const { resources } = useResource();

  return useMemo(() => {
    for (const resource of resources) {
      if (hasRoleFullAccess()) {
        return resource;
      }
      
      if (resource.meta && checkAuthority(resource.meta.authority?.list).can) {
        return resource;
      }
    }
  }, [resources]);
};
