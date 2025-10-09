'use client';

import React from 'react';
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useGetIdentity, useInvalidate, useTranslation } from '@refinedev/core';
import { useLogout } from '@refinedev/core';
import { Avatar, Dropdown, Layout as AntdLayout, MenuProps, message } from 'antd';
import clsx from 'clsx';

import { setUserLocale } from '@i18n';
import { useRouter } from "next/navigation";
import { TSaveAuthUser } from '@types';

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
  const { data: user } = useGetIdentity<TSaveAuthUser>();
  const { changeLocale, getLocale, translate: t } = useTranslation();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const invalidate = useInvalidate();

  const onChangeLanguage: MenuProps['onClick'] = async ({ key }) => {
    changeLocale(key);
    await setUserLocale(key as string);

    // Invalidate all queries to refresh the data after changing the language
    invalidate({ invalidates: ['all'] });
  };

  const items: MenuProps['items'] = [
    {
      label: 'English',
      key: 'en',
      icon: <Avatar className='mr-1' src='/images/flags/en.svg' alt='English' size={20} />,
    },
    {
      label: 'Tiếng Việt',
      key: 'vi',
      icon: <Avatar className='mr-1' src='/images/flags/vi.svg' alt='Tiếng Việt' size={20} />,
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: t('auth.menu.profile'),
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: t('auth.menu.logout'),
      icon: <LogoutOutlined />,
    },
  ];

  const onChangeUserProfile: MenuProps['onClick'] = async (info) => {
    if (info.key === 'logout') {
      logout();
      message.success(t('auth.logout.success'));
    } else if (info.key === 'profile') {
      router.push('/profile');
    }
  };

  return (
    <AntdLayout.Header
      className={clsx('flex items-center justify-end gap-6 bg-white px-6 py-3', { 'sticky top-0 z-[1]': sticky })}
    >
      {user && (
        <>
          <Dropdown menu={{ items: userMenuItems, onClick: onChangeUserProfile }}>
            <a onClick={(e) => e.preventDefault()}>
              <div className='flex cursor-pointer items-center gap-2 text-black'>
                {user?.avatar ? (
                  <Avatar src={user?.avatar} alt={user?.username} size={24} />
                ) : (
                  <Avatar icon={<UserOutlined />} size={24} />
                )}
                {<div className='font-bold'>{user?.username}</div>}
              </div>
            </a>
          </Dropdown>
        </>
      )}

      <Dropdown menu={{ items, onClick: onChangeLanguage }}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar src={`/images/flags/${getLocale()}.svg`} alt='avatar' size={24} />
        </a>
      </Dropdown>
    </AntdLayout.Header>
  );
};
