'use client';

import { useSelectInfinite } from '@hooks';
import { useOne, useTranslate } from '@refinedev/core';
import { IFormVisit, IUser } from '@types';
import { Form, FormProps, Input, Select } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const { Item: FormItem } = Form;

type PhuongTienFormProps = FormProps & {
  objectType?: 'user' | 'visitor';
};

export default function PhuongTienForm({ objectType = 'user', ...formProps }: PhuongTienFormProps) {
  const t = useTranslate();

  const isEdit = !!formProps.initialValues?.id;

  const userId = formProps.initialValues?.userId;
  const visitId = formProps.initialValues?.visitId;

  const { selectProps: userSelectProps } = useSelectInfinite<IUser>({
    resource: 'users',
    optionLabel: 'firstName',
    optionValue: 'id',
    queryOptions: {
      enabled: !isEdit && objectType === 'user' && !visitId,
    },
  });

  const { selectProps: visitorSelectProps } = useSelectInfinite({
    resource: 'visits',
    optionLabel: 'visitorName',
    optionValue: 'id',
    queryOptions: {
      enabled: !isEdit && objectType === 'visitor' && !userId,
    },
    filters: [
      {
        field: 'startDateFrom',
        operator: 'eq',
        value: dayjs().startOf('day').format('DD.MM.YYYY HH:mm:ss'),
      },
    ],
  });

  const { data: visitData, isLoading: isLoadingVisitData } = useOne<IFormVisit | IUser>({
    resource: objectType === 'user' ? 'users' : 'visits',
    id: objectType === 'user' ? userId : visitId,
    queryOptions: {
      enabled: !!(objectType === 'user' ? userId : visitId),
      placeholderData: undefined,
    },
  });
  console.log('🚀 ~ PhuongTienForm ~ visitData:', visitData);

  return (
    <Form {...formProps} layout='vertical'>
      <div className='grid grid-cols-2 gap-4'>
        <FormItem label={t('vehicles.form.vehicleType')} name='vehicleType' initialValue={0}>
          <Select
            options={[
              {
                label: t('vehicles.vehicleType.car'),
                value: 0,
              },
              {
                label: t('vehicles.vehicleType.motorbike'),
                value: 1,
              },
            ]}
          />
        </FormItem>

        <FormItem
          label={t('vehicles.form.model')}
          name='model'
          rules={[{ required: true, whitespace: true, message: t('vehicles.validation.modelRequired') }]}
        >
          <Input placeholder={t('vehicles.placeholder.model')} />
        </FormItem>
        <FormItem
          label={t('vehicles.form.plateNumber')}
          name='plateNumber'
          rules={[
            {
              required: true,
              whitespace: true,
              message: t('vehicles.validation.plateNumberRequired'),
            },
          ]}
        >
          <Input placeholder={t('vehicles.placeholder.plateNumber')} />
        </FormItem>

        <FormItem
          label={t('vehicles.form.color')}
          name='color'
          rules={[{ required: true, whitespace: true, message: t('vehicles.validation.colorRequired') }]}
        >
          <Input placeholder={t('vehicles.placeholder.color')} />
        </FormItem>

        <FormItem
          label={objectType === 'user' ? t('vehicles.form.user') : t('vehicles.form.visitor')}
          name={objectType === 'user' ? 'userId' : 'visitId'}
          rules={[
            {
              required: true,
              message:
                objectType === 'user'
                  ? t('vehicles.validation.userRequired')
                  : t('vehicles.validation.visitorRequired'),
            },
          ]}
        >
          <Select
            {...(objectType === 'user' ? userSelectProps : visitorSelectProps)}
            options={
              visitData
                ? [
                    {
                      label:
                        objectType === 'user'
                          ? (visitData.data as IUser).firstName
                          : (visitData.data as IFormVisit).visitorName,
                      value: objectType === 'user' ? userId : visitId,
                    },
                  ]
                : objectType === 'user'
                  ? userSelectProps.options
                  : visitorSelectProps.options
            }
            placeholder={
              objectType === 'user' ? t('vehicles.placeholder.selectUser') : t('vehicles.placeholder.selectVisitor')
            }
            disabled={!!visitData}
          />
        </FormItem>
      </div>
    </Form>
  );
}
