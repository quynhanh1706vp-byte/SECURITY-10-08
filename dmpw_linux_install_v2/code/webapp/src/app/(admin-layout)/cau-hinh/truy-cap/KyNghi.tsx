'use client';

import DeleteButton from '@components/ui/DeleteButton';
import Modal from '@components/ui/Modal';
import { MultipleDeleteButton } from '@components/ui/MultipleDeleteButton';
import { useCustomTable } from '@hooks';
import { CreateButton, EditButton, useModalForm } from '@refinedev/antd';
import { useTranslation } from '@refinedev/core';
import { THoliday } from '@types';
import { Input, Spin, Table } from 'antd';

import KyNghiForm from './KyNghiForm';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const { Search } = Input;
const { Column } = Table;

type DataType = THoliday;

export default function KyNghi() {
  const { translate: t } = useTranslation();

  const { tableProps, selectedRowKeys, handleSearch, handleDeleteSuccess } = useCustomTable<DataType>({
    resource: 'holidays',
  });

  const {
    modalProps: createModalProps,
    formProps: createFromProps,
    show: createModalShow,
  } = useModalForm<DataType>({
    resource: 'holidays',
    action: 'create',
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
    formLoading: editFormLoading,
  } = useModalForm<DataType>({
    resource: 'holidays',
    action: 'edit',
  });

  const initialValues = useMemo(() => {
    if (!editFormProps.initialValues) return;

    return {
      ...editFormProps.initialValues,
      date: [
        dayjs(editFormProps.initialValues.startDate, 'DD.MM.YYYY'),
        dayjs(editFormProps.initialValues.endDate, 'DD.MM.YYYY'),
      ],
    };
  }, [editFormProps.initialValues]);

  return (
    <div>
      <div className='flex justify-between gap-4'>
        <div className='w-[320px]'>
          <Search placeholder={t('cau-hinh/access-times.accessTimes.searchPlaceholder')} onChange={handleSearch} />
        </div>

        <div className='flex gap-4'>
          {selectedRowKeys.length > 0 && (
            <MultipleDeleteButton
              resource='holidays'
              ids={selectedRowKeys}
              onSuccess={() => handleDeleteSuccess(selectedRowKeys)}
            />
          )}

          <CreateButton
            resource='holidays'
            type='primary'
            icon={null}
            onClick={() => {
              createModalShow();
            }}
          >
            {t('cau-hinh/access-times.holidays.create')}
          </CreateButton>
        </div>
      </div>

      <Table<DataType> {...tableProps} className='mt-2.5' scroll={{ y: '66vh' }}>
        <Column dataIndex='name' title={t('cau-hinh/access-times.holidays.name')} width={200} />
        <Column dataIndex='holidayType' title={t('cau-hinh/access-times.holidays.type')} width={150} />
        <Column
          dataIndex='startDate'
          title={t('cau-hinh/access-times.holidays.startDate')}
          render={(value) => dayjs(value, 'DD.MM.YYYY').format('DD/MM/YYYY')}
          width={150}
        />
        <Column
          dataIndex='endDate'
          title={t('cau-hinh/access-times.holidays.endDate')}
          render={(value) => dayjs(value, 'DD.MM.YYYY').format('DD/MM/YYYY')}
          width={150}
        />
        <Column dataIndex='recursiveDisp' title={t('cau-hinh/access-times.holidays.recursion')} width={100} />
        <Column
          dataIndex='remarks'
          title={t('cau-hinh/access-times.holidays.remarks')}
          width={200}
          render={(value) => <div className='line-clamp-3 overflow-hidden text-ellipsis'>{value}</div>}
        />
        <Column<DataType>
          dataIndex='action'
          title={t('common.action')}
          render={(_, record) => (
            <div className='flex gap-1'>
              <EditButton
                resource='holidays'
                icon={null}
                color='primary'
                variant='text'
                size='small'
                onClick={() => {
                  editModalShow(record.id);
                }}
              >
                {t('buttons.edit')}
              </EditButton>

              <DeleteButton
                color='primary'
                variant='text'
                size='small'
                icon={null}
                resource='holidays'
                recordItemId={record.id}
                onSuccess={() => handleDeleteSuccess(record.id)}
              />
            </div>
          )}
        />
      </Table>

      <Modal {...createModalProps} width={836}>
        <KyNghiForm {...createFromProps} formActionType='create' />
      </Modal>

      <Modal {...editModalProps} width={836}>
        <Spin spinning={editFormLoading}>
          <KyNghiForm {...editFormProps} formActionType='edit' initialValues={initialValues} />
        </Spin>
      </Modal>
    </div>
  );
}
