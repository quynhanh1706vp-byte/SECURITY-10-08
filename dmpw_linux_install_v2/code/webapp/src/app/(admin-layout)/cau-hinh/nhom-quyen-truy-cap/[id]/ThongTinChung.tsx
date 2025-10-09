import { useParams } from 'next/navigation';
import { SaveButton, useForm } from '@refinedev/antd';
import { Form, Input, Spin, Switch } from 'antd';
import { useTranslation } from '@refinedev/core';

export default function ThongTinChung() {
  const { translate: t } = useTranslation();
  const params = useParams();
  const { id } = params as { id: string };

  const { formProps, formLoading, saveButtonProps } = useForm({
    resource: 'access-groups',
    action: 'edit',
    id,
  });

  return (
    <Spin spinning={formLoading}>
      <Form {...formProps} layout='vertical'>
        <div className='grid grid-cols-2 gap-6'>
          <Form.Item
            label={t('bao-cao/access-groups.accessGroups.form.label.name')}
            name='name'
            rules={[{ required: true, whitespace: true, message: t('bao-cao/access-groups.accessGroups.form.validation.nameRequired') }]}
          >
            <Input placeholder={t('bao-cao/access-groups.accessGroups.form.placeholder.name')} />
          </Form.Item>

          <div className='flex items-center gap-6'>
            <Form.Item name='isDefault' valuePropName='checked' noStyle>
              <Switch checkedChildren='ON' unCheckedChildren='OFF' />
            </Form.Item>
            {t('bao-cao/access-groups.accessGroups.form.label.isDefault')}
          </div>
        </div>

        <div className='-mx-6 flex justify-end border-t p-4'>
          <SaveButton {...saveButtonProps} />
        </div>
      </Form>
    </Spin>
  );
}
