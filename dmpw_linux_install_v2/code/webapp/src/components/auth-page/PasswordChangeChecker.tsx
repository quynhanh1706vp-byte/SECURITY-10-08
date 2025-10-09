'use client';

import { FC, useEffect, useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { PasswordChangeForm } from './PasswordChangeModal';
import Cookies from 'js-cookie';
import { AUTH_KEY } from '@constants/constant';

interface UserIdentity {
  passwordChangeRequired?: boolean;
  username?: string;
  passwordChangeMessage?: string;
  [key: string]: any;
}

export const PasswordChangeChecker: FC = () => {
  const { data: identity } = useGetIdentity<UserIdentity>();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    // Check if password change is required
    if (identity?.passwordChangeRequired === true) {
      setShowPasswordChange(true);
    }
  }, [identity]);

  const handlePasswordChangeSuccess = () => {
    // Update the auth cookie to set passwordChangeRequired to false
    const authData = Cookies.get(AUTH_KEY);
    if (authData) {
      const user = JSON.parse(authData);
      user.passwordChangeRequired = false;
      user.passwordChangeMessage = '';
      Cookies.set(AUTH_KEY, JSON.stringify(user), { expires: 30, path: '/' });
    }
    
    setShowPasswordChange(false);
    // Reload to refresh the identity
    window.location.reload();
  };

  if (!showPasswordChange) {
    return null;
  }

  return (
    <PasswordChangeForm
      passwordChangeMessage={identity?.passwordChangeMessage}
      onSuccess={handlePasswordChangeSuccess}
    />
  );
};
