'use client';

import dynamic from 'next/dynamic';
import DeleteButton from '@components/ui/DeleteButton';
import { MultipleDeleteButton } from '@components/ui/MultipleDeleteButton';
import { $permissions } from '@constants/permmission';
import { useCustomTable } from '@hooks';
import { EditButton, List, useModalForm, useSelect } from '@refinedev/antd';
import { CanAccess, useCan, useTranslation } from '@refinedev/core';
import { Input, Select, Table, TableColumnsType } from 'antd';

import NhomQuyenTruyCapForm from './NhomQuyenTruyCapForm';

const Modal = dynamic(() => import('antd').then((mod) => mod.Modal), { ssr: false });

const { Search } = Input;

export default function Page() {
  const { translate: t } = useTranslation();

  const { data: canEdit } = useCan({
    resource: 'access-groups',
    action: 'edit',
    params: { authority: $permissions.EDIT_ACCESS_GROUP },
  });

  const { data: canDelete } = useCan({
    resource: 'access-groups',
    action: 'delete',
    params: { authority: $permissions.DELETE_ACCESS_GROUP },
  });

  const { data: canCreate } = useCan({
    resource: 'access-groups',
    action: 'create',
    params: { authority: $permissions.ADD_ACCESS_GROUP },
  });

  const hasActionPermission = canEdit?.can || canDelete?.can;

  const { selectProps: deviceSelectProps } = useSelect({
    resource: 'devices',
    optionLabel: 'doorName',
    optionValue: 'id',
    sorters: [
      {
        field: 'doorName',
        order: 'asc',
      },
    ],
    onSearch: (value) => [
      {
        field: 'search',
        operator: 'eq',
        value,
      },
    ],
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: 'users',
    optionLabel: 'firstName',
    optionValue: 'id',
    sorters: [
      {
        field: 'firstName',
        order: 'asc',
      },
    ],
    onSearch: (value) => [
      {
        field: 'search',
        operator: 'eq',
        value,
      },
    ],
  });

  const { tableProps, selectedRowKeys, handleSearch, handleDeleteSuccess, setFilters } = useCustomTable({
    resource: 'access-groups',
  });

  const columns: TableColumnsType = [
    {
      dataIndex: 'name',
      title: t('bao-cao/access-groups.accessGroups.columns.name'),
      width: 200,
    },
    {
      title: t('bao-cao/access-groups.accessGroups.columns.totalUsers'),
      dataIndex: 'totalUsers',
      render: (value) => {
        return <span className='text-primary'>{value}</span>;
      },
    },
    {
      title: t('bao-cao/access-groups.accessGroups.columns.totalDoors'),
      dataIndex: 'totalDoors',
      render: (value) => {
        return <span className='text-primary'>{value}</span>;
      },
    },
    ...(hasActionPermission
      ? [
          {
            title: t('bao-cao/access-groups.accessGroups.columns.actions'),
            dataIndex: 'thaoTac',
            render: (_: any, record: any) => (
              <div className='flex gap-1'>
                <EditButton
                  resource='access-groups'
                  accessControl={{ hideIfUnauthorized: true }}
                  recordItemId={record.id}
                  icon={null}
                  color='primary'
                  variant='text'
                  size='small'
                >
                  {t('buttons.edit')}
                </EditButton>
                <DeleteButton
                  resource='access-groups'
                  accessControl={{ hideIfUnauthorized: true }}
                  color='primary'
                  variant='text'
                  size='small'
                  icon={null}
                  recordItemId={record.id}
                  onSuccess={() => handleDeleteSuccess(record.id)}
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  const { formProps, modalProps, show } = useModalForm({
    resource: 'access-groups',
    action: 'create',
  });

  return (
    <List
      resource='access-groups'
      title={t('bao-cao/access-groups.accessGroups.title')}
      canCreate={canCreate?.can}
      createButtonProps={{ onClick: () => show(), children: t('bao-cao/access-groups.accessGroups.create.button') }}
    >
      <div className='flex flex-wrap gap-2.5'>
        <Search
          placeholder={t('bao-cao/access-groups.accessGroups.placeholders.search')}
          className='w-[264px]'
          onChange={handleSearch}
        />

          <Select
            allowClear
            {...deviceSelectProps}
            placeholder={t('bao-cao/access-groups.accessGroups.placeholders.door')}
            className='w-[210px]'
            mode='multiple'
            onChange={(value) => setFilters([{ field: 'doorIds', operator: 'in', value }])}
          />

          <Select
            allowClear
            {...userSelectProps}
            placeholder={t('bao-cao/access-groups.accessGroups.placeholders.user')}
            className='w-[210px]'
            mode='multiple'
            onChange={(value) => setFilters([{ field: 'userIds', operator: 'in', value }])}
          />

        {selectedRowKeys.length > 0 && canDelete?.can && (
          <MultipleDeleteButton
            resource='access-groups'
            ids={selectedRowKeys}
            onSuccess={() => handleDeleteSuccess(selectedRowKeys)}
            className='ml-auto'
          />
        )}
      </div>

      <Table {...tableProps} columns={columns} className='mt-4' scroll={{ x: 'max-content', y: '66vh' }} />

      <Modal {...modalProps} width={500}>
        <NhomQuyenTruyCapForm id='nhom-quyen-truy-cap-form' {...formProps} />
      </Modal>
    </List>
  );
}
