'use client';

import { env } from 'next-runtime-env';
import { axiosInstance, saveAuthUser } from '@providers/data-provider/utils';
import type { AuthProvider, CanReturnType } from '@refinedev/core';
import Cookies from 'js-cookie';

import { ACCOUNT_TYPE_SUPPER_ADMIN, AUTH_KEY, AUTH_PERMISSION_KEY } from '@constants/constant';
import { $permissions } from '@constants/permmission';

export const hasRoleFullAccess = (): boolean => {
  const auth = Cookies.get(AUTH_KEY);
  if (!auth) return false;

  try {
    const user = JSON.parse(auth);
    return user?.accountType == ACCOUNT_TYPE_SUPPER_ADMIN;
  } catch {
    return false;
  }
};

export const getPermissions = () => {
  // Check if running on client side
  if (typeof window === 'undefined') {
    return [];
  }
  
  const permissionKey = Cookies.get(AUTH_PERMISSION_KEY);
  if (permissionKey) {
    try {
      const permissions = JSON.parse(permissionKey);
      const resultPerms: string[] = [];
      
      for (const module in permissions) {
        const modulePerms = permissions[module];
        
        // Check if user has all permissions for this module
        const allPermissions = Object.keys(modulePerms).length > 0 && 
                              Object.values(modulePerms).every(val => val);
        
        // Add wildcard if user has all permissions
        if (allPermissions) {
          resultPerms.push(`${module}:*`);
        }
        
        // Add individual permissions
        for (const action in modulePerms) {
          if (modulePerms[action]) {
            resultPerms.push(`${module}.${action}`);
          }
        }
      }

      return resultPerms;
    } catch (error) {
      console.error('Error parsing permissions:', error);
    }
  }

  return [];
};
/**
 * Check authority of current user
 * @param authority
 * @returns
 */
export const checkAuthority = (authority?: string | string[]): CanReturnType => {
  if (typeof authority === 'string' && authority === $permissions.BYPASS_PERMISSION) {
    return { can: true };
  }

  const authorities = getPermissions(); // quyền hiện tại của user
  if (!authority) {
    return { can: false, reason: 'Unauthorized' };
  }

  const checkList = Array.isArray(authority) ? authority : [authority];
  for (const check of checkList) {
    if (check === '*') {
      return { can: true };
    }

    if (authorities.includes(check)) {
      return { can: true };
    }

    // Wildcard match: user có deviceMonitoring:* sẽ match với deviceMonitoring.viewDeviceMonitoring
    const [checkModule] = check.split('.');
    if (checkModule && authorities.includes(`${checkModule}:*`)) {
      return { can: true };
    }
  }

  return { can: false, reason: 'Unauthorized' };
};

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    try {
      const loginResponse = await axiosInstance.post(
        '/login',
        {
          username,
          password,
          enableRemoveOldSession: false,
        },
        {
          baseURL: env('NEXT_PUBLIC_API_ENDPOINT'),
        },
      );

      saveAuthUser(loginResponse.data);
      return {
        success: true,
        redirectTo: '/',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: error?.message || 'Invalid username or password',
        },
      };
    }
  },
  logout: async () => {
    Cookies.remove(AUTH_KEY, { path: '/' });
    if (typeof window !== 'undefined') {
      Cookies.remove(AUTH_PERMISSION_KEY, { path: '/' });
    }
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const auth = Cookies.get(AUTH_KEY);
    if (auth) {
      try {
        const user = JSON.parse(auth);
        // Nếu cần đổi mật khẩu, redirect về login để xử lý
        if (user.passwordChangeRequired === true) {
          return {
            authenticated: false,
            logout: false,
            redirectTo: '/login',
          };
        }
        return {
          authenticated: true,
        };
      } catch {
        return {
          authenticated: true,
        };
      }
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => getPermissions(),
  getIdentity: async () => {
    const auth = Cookies.get(AUTH_KEY);
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
