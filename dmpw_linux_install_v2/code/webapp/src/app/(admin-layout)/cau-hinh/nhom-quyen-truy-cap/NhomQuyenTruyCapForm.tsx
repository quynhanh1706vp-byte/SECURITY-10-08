'use client';

import { useTranslation } from '@refinedev/core';
import { Form, FormProps, Input, Switch } from 'antd';

const FormItem = Form.Item;

const NhomQuyenTruyCapForm = (formProps: Omit<FormProps, 'children'>) => {
  const { translate: t } = useTranslation();
  return (
    <Form {...formProps} layout='vertical'>
      <FormItem
        label={t('bao-cao/access-groups.accessGroups.form.label.name')}
        name='name'
        rules={[{ required: true, whitespace: true, message: t('bao-cao/access-groups.accessGroups.form.validation.isDefault') }]}
      >
        <Input placeholder={t('bao-cao/access-groups.accessGroups.form.placeholder.name')} />
      </FormItem>

      <div className='flex items-center gap-6'>
        <FormItem name='isDefault' valuePropName='checked' noStyle initialValue={false}>
          <Switch
            checkedChildren={t('bao-cao/access-groups.accessGroups.form.switch.on')}
            unCheckedChildren={t('bao-cao/access-groups.accessGroups.form.switch.off')}
          />
        </FormItem>
       {t('bao-cao/access-groups.accessGroups.form.label.isDefault')}
      </div>
    </Form>
  );
};

export default NhomQuyenTruyCapForm;
