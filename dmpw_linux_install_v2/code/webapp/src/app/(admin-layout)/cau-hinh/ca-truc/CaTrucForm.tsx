'use client';

import { useTranslation } from '@refinedev/core';
import { Form, FormProps, Input, TimePicker } from 'antd';

const FormItem = Form.Item;

export default function CaTrucForm(formProps: Omit<FormProps, 'children'>) {
  const { translate: t } = useTranslation();
  const handleSubmit = (values: any) => {
    const payload = {
      name: values.name,
      startTime: values.startTime.format('HH:mm'),
      endTime: values.endTime.format('HH:mm'),
    };

    formProps.onFinish?.(payload);
  };

  return (
    <Form {...formProps} layout='vertical' onFinish={handleSubmit}>
      <FormItem
        label={t('cau-hinh/ca-truc.form.shift.fields.name')}
        name='name'
        rules={[
          { required: true, whitespace: true, message: t('cau-hinh/ca-truc.form.shift.validation.nameRequired') },
        ]}
      >
        <Input placeholder={t('cau-hinh/ca-truc.form.shift.placeholders.name')} />
      </FormItem>

      <div className='grid grid-cols-2 gap-6'>
        <FormItem
          label={t('cau-hinh/ca-truc.form.shift.fields.startTime')}
          name='startTime'
          rules={[{ required: true, message: t('cau-hinh/ca-truc.form.shift.validation.startTimeRequired') }]}
        >
          <TimePicker format='HH:mm' className='w-full' />
        </FormItem>

        <FormItem
          label={t('cau-hinh/ca-truc.form.shift.fields.endTime')}
          name='endTime'
          dependencies={['startTime']}
          rules={[
            { required: true, message: t('cau-hinh/ca-truc.form.shift.validation.endTimeRequired') },
            {
              validator: (_, value) => {
                if (value.isBefore(formProps.form?.getFieldValue('startTime'))) {
                  return Promise.reject(new Error(t('cau-hinh/ca-truc.form.shift.validation.endTimeAfterStart')));
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <TimePicker format='HH:mm' className='w-full' />
        </FormItem>
      </div>
    </Form>
  );
}
