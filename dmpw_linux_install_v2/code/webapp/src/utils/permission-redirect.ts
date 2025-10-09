import { $permissions } from '@constants/permmission';
import { hasRoleFullAccess } from '@providers/auth-provider/auth-provider.client';

// Map các resource với route và permissions của chúng (matching refine.tsx resources order)
const resourceRoutes = [
  {
    path: '/dashboard',
    permissions: [$permissions.VIEW_DASHBOARD],
  },
  {
    path: '/giam-sat',
    permissions: [$permissions.VIEW_MONITORING, $permissions.VIEW_DEVICE_MONITORING],
  },
  {
    path: '/quan-ly-ra-vao/don-vi',
    permissions: [$permissions.VIEW_BUILDING],
  },
  {
    path: '/quan-ly-ra-vao/diem-kiem-soat',
    permissions: [$permissions.VIEW_DEVICE_SETTING],
  },
  {
    path: '/quan-ly-ra-vao/thiet-bi',
    permissions: [$permissions.VIEW_DEVICE_READER],
  },
  {
    path: '/doi-tuong-ra-vao/nhan-vien',
    permissions: [$permissions.VIEW_USER],
  },
  {
    path: '/doi-tuong-ra-vao/khach-moi',
    permissions: [$permissions.VIEW_VISIT],
  },
  {
    path: '/doi-tuong-ra-vao/phuong-tien',
    permissions: [$permissions.VIEW_VEHICLE],
  },
  {
    path: '/cau-hinh/nhom-quyen-truy-cap',
    permissions: [$permissions.VIEW_ACCESS_GROUP],
  },
  {
    path: '/cau-hinh/truy-cap',
    permissions: [$permissions.VIEW_ACCESS_TIME, $permissions.VIEW_HOLIDAY, $permissions.EDIT_VISIT_SETTING],
  },
  {
    path: '/cau-hinh/phong-ban',
    permissions: [$permissions.VIEW_DEPARTMENT],
  },
  {
    path: '/cau-hinh/ca-truc',
    permissions: [$permissions.VIEW_ACCESS_SCHEDULE],
  },
  {
    path: '/cau-hinh/bao-mat',
    permissions: [$permissions.VIEW_SETTING],
  },
  {
    path: '/tai-khoan/nguoi-dung',
    permissions: [], // No specific permission required
  },
  {
    path: '/tai-khoan/quyen-truy-cap',
    permissions: [], // No specific permission required
  },
  {
    path: '/bao-cao/bao-cao-truy-cap',
    permissions: [$permissions.VIEW_REPORT],
  },
  {
    path: '/bao-cao/bao-cao-khach-moi',
    permissions: [$permissions.VIEW_VISIT_REPORT],
  },
  {
    path: '/bao-cao/bao-cao-phuong-tien',
    permissions: [$permissions.VIEW_REPORT],
  },
  {
    path: '/bao-cao/bao-cao-log',
    permissions: [$permissions.VIEW_SYSTEM_LOG],
  },
];

/**
 * Get the first accessible route for a user based on their permissions
 * @param userPermissions Array of permission strings that user has
 * @param isFullAccess Whether user has full access (Primary Manager)
 * @returns The path to redirect to, default is '/403' if no permissions
 */
export const getFirstAccessibleRoute = (userPermissions: string[], isFullAccess: boolean = false): string => {
  if (hasRoleFullAccess()) {
    return '/dashboard';
  }
  if (isFullAccess) return '/dashboard';
  if (!userPermissions?.length) return '/403';

  // Find first route with matching permissions
  const accessibleRoute = resourceRoutes.find((route) => {
    if (!route.permissions.length) return false;

    return route.permissions.some((permission) => {
      // Direct match or wildcard match (module:*)
      if (userPermissions.includes(permission)) return true;

      const [module] = permission.split('.');
      return module && userPermissions.includes(`${module}:*`);
    });
  });

  return accessibleRoute?.path || '/403';
};
