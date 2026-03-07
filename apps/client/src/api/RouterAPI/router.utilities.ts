import { Access } from '@api/RouterAPI/router.types';
import { Status } from '@types';
import clientUserStore from '@store/clientUserStore';

export const isRouteAccessible = (access: Access): boolean => {
  const clientUser = clientUserStore.getState();

  const accessCheck: Record<Access, () => boolean> = {
    [Access.PUBLIC]: () => true,
    [Access.UNAUTHORIZED]: () => clientUser.status === Status.UNAUTHORIZED,
    [Access.AUTHORIZED]: () => clientUser.status === Status.AUTHORIZED,
  };

  return accessCheck[access]();
};
