'use client';

import { useEffect } from 'react';
import { useForm, useSelect } from '@refinedev/antd';
import { useTranslation } from '@refinedev/core';
import { Button, Form, Input, Select, Spin, Switch } from 'antd';

const { Item: FormItem } = Form;

export default function KhachMoi() {
  const { translate: t } = useTranslation();

  const switchOptions = [
    {
      label: t('cau-hinh/access-times.guests.switchOptions.enableAutoApproval'),
      value: 'enableAutoApproval',
    },
    {
      label: t('cau-hinh/access-times.guests.switchOptions.allowEditRecord'),
      value: 'allowEditRecord',
    },
    {
      label: t('cau-hinh/access-times.guests.switchOptions.allowGetUserTarget'),
      value: 'allowGetUserTarget',
    },
    {
      label: t('cau-hinh/access-times.guests.switchOptions.allowSelectDoorWhenCreateNew'),
      value: 'allowSelectDoorWhenCreateNew',
    },
    {
      label: t('cau-hinh/access-times.guests.switchOptions.allowDeleteRecord'),
      value: 'allowDeleteRecord',
    },
    {
      label: t('cau-hinh/access-times.guests.switchOptions.approvalStepNumber'),
      value: 'approvalStepNumber',
    },
  ];
  const { formProps, query, formLoading } = useForm({
    resource: 'settings/visit',
    action: 'edit',
    id: '',
  });

  useEffect(() => {
    if (query?.data?.data) return;

    formProps.form?.setFieldsValue({
      approvalStepNumber: query?.data?.data?.approvalStepNumber === 1,
    });
  }, [query?.data]);

  const { selectProps: accessGroupSelectProps } = useSelect({
    resource: 'access-groups',
    optionLabel: 'name',
    optionValue: 'id',
  });

  const handleSubmit = async (values: any) => {
    const settingsData = query?.data?.data || {};

    const data = {
      ...settingsData,
      groupDevices: JSON.parse(settingsData.groupDevices || '[]'),
      listFieldsEnable: JSON.parse(settingsData.listFieldsEnable || '{}'),
    };

    formProps.onFinish?.({
      ...data,
      ...values,
      approvalStepNumber: values.approvalStepNumber ? 1 : 0,
    });
  };

  return (
    <Spin spinning={formLoading}>
      <Form {...formProps} className='divide-y' layout='vertical' onFinish={handleSubmit}>
        <div className='px-4 py-4 text-base font-medium sm:px-6'>{t('cau-hinh/access-times.guests.title')}</div>

        <div className='p-4 sm:p-6'>
          <div className='mb-6 grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-2'>
            {switchOptions.map((option) => (
              <div key={option.value} className='flex items-start gap-3 py-1'>
                <FormItem name={option.value} valuePropName='checked' noStyle>
                  <Switch checkedChildren='ON' unCheckedChildren='OFF' className='mt-1 flex-shrink-0' />
                </FormItem>
                <span className='text-sm leading-relaxed sm:text-base'>{option.label}</span>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6'>
            <FormItem label={t('cau-hinh/access-times.guests.accessGroupLabel')} name='accessGroupId'>
              <Select
                {...accessGroupSelectProps}
                placeholder={t('cau-hinh/access-times.guests.accessGroupPlaceholder')}
              />
            </FormItem>

            <FormItem label={t('cau-hinh/access-times.guests.visitPurposeLabel')} name='listVisitPurpose'>
              <Input.TextArea
                placeholder={t('cau-hinh/access-times.guests.visitPurposePlaceholder')}
                rows={2}
                className='resize-none'
              />
            </FormItem>
          </div>
        </div>

        <div className='flex flex-col-reverse gap-3 px-4 py-4 sm:flex-row sm:justify-end sm:gap-4 sm:px-6'>
          <Button type='primary' htmlType='submit' className='w-full sm:w-auto'>
            {t('cau-hinh/access-times.guests.save')}
          </Button>
        </div>
      </Form>
    </Spin>
  );
}
