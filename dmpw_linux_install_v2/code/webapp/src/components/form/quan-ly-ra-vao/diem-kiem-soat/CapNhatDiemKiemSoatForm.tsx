'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { useTree } from '@hooks';
import { getValueFromEvent, useForm } from '@refinedev/antd';
import { file2Base64, useTranslation } from '@refinedev/core';
import { Button, Col, Form, Input, InputNumber, Row, Select, Spin, Switch, TreeSelect, Upload } from 'antd';

import { IDevice, IDeviceFormValues } from '@/types';

const FormItem = Form.Item<IDeviceFormValues>;

export default function CapNhatDiemKiemSoatForm() {
  const { id } = useParams<{ id: string }>();
  const { translate: t } = useTranslation();

  const {
    query: { data: treeData, isFetching },
    handleSearch: handleSearchBuilding,
  } = useTree({
    resource: 'buildings/get-building-tree',
  });

  const { formProps, query, mutation } = useForm<IDevice>({
    resource: 'devices',
    action: 'edit',
    id,
  });

  const device = query?.data?.data;

  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (device?.image) {
      setImageUrl(device.image);
    }
  }, [device?.image]);

  const operationType = Form.useWatch<IDeviceFormValues['operationType']>('operationType', formProps.form);
  const uploadImage = Form.useWatch<IDeviceFormValues['uploadImage']>('uploadImage', formProps.form);

  useEffect(() => {
    if (uploadImage?.[0]) {
      file2Base64(uploadImage[0]).then((base64String) => {
        setImageUrl(base64String);
      });
    }
  }, [uploadImage]);

  const handleSubmit = async (values: IDeviceFormValues) => {
    const { uploadImage } = values;

    const file = uploadImage?.[0];
    let base64String = undefined;

    if (file?.originFileObj) {
      base64String = await file2Base64(file);
    }

    formProps.onFinish?.({
      ...values,
      image: base64String,
      companyId: device?.companyId || 0,
    });
  };

  return (
    <Spin spinning={query?.isLoading}>
      <Form
        {...formProps}
        layout='vertical'
        className='flex flex-col gap-2'
        onFinish={(values) => handleSubmit(values as IDeviceFormValues)}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <FormItem
              label={t('devices.form.labels.deviceImage')}
              name='uploadImage'
              valuePropName='fileList'
              getValueFromEvent={getValueFromEvent}
              className='mb-0'
            >
              <Upload
                listType='picture-card'
                beforeUpload={() => false}
                showUploadList={false}
                maxCount={1}
                className='[&_.ant-upload]:aspect-square [&_.ant-upload]:h-full [&_.ant-upload]:w-full'
              >
                {imageUrl ? (
                  <Image src={imageUrl} alt='image' width={200} height={200} className='h-full w-full object-cover' />
                ) : (
                  <div>
                    <PlusOutlined className='mb-2 text-[14px]' />
                    <div className='text-center text-[#00000073]'>
                      {t('devices.form.placeholders.uploadDeviceImage')}
                    </div>
                  </div>
                )}
              </Upload>
            </FormItem>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <FormItem
                  label={t('devices.form.labels.deviceName')}
                  name='doorName'
                  rules={[
                    { required: true, whitespace: true, message: t('devices.form.validation.deviceNameRequired') },
                  ]}
                >
                  <Input placeholder={t('devices.form.placeholders.enterDeviceName')} />
                </FormItem>
              </Col>

              <Col xs={24} sm={12}>
                <FormItem label={t('devices.form.labels.unit')} name='buildingId'>
                  <TreeSelect
                    treeData={treeData?.data || []}
                    fieldNames={{ label: 'name', value: 'id' }}
                    placeholder={t('devices.form.placeholders.selectUnit')}
                    allowClear
                    showSearch
                    onSearch={handleSearchBuilding}
                    filterTreeNode={false}
                    styles={{
                      popup: { root: { maxHeight: 400, overflow: 'auto' } },
                    }}
                    treeDefaultExpandAll
                    loading={isFetching}
                    className='min-w-[210px]'
                  />
                </FormItem>
              </Col>

              <Col xs={24} sm={12}>
                <FormItem
                  label={t('devices.form.labels.operationMode')}
                  name='operationType'
                  rules={[{ required: true, message: t('devices.form.validation.operationModeRequired') }]}
                >
                  <Select
                    options={device?.operationTypeItems || []}
                    fieldNames={{ label: 'name', value: 'id' }}
                    disabled
                  />
                </FormItem>
              </Col>

              <Col xs={24} sm={12}>
                <FormItem
                  label={t('devices.form.labels.controlTimeframe')}
                  name='activeTimezoneId'
                  rules={[
                    {
                      required: true,
                      message: t('devices.form.validation.controlTimeframeRequired'),
                    },
                  ]}
                >
                  <Select options={device?.activeTimezoneItems || []} fieldNames={{ label: 'name', value: 'id' }} />
                </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                <FormItem
                  label={t('devices.form.labels.checkMode')}
                  name='verifyMode'
                  rules={[{ required: true, message: t('devices.form.validation.checkModeRequired') }]}
                >
                  <Select options={device?.verifyModeItems || []} fieldNames={{ label: 'name', value: 'id' }} />
                </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                <FormItem label={t('devices.form.labels.dependentDevices')} name='dependentDoors'>
                  <Select
                    placeholder={t('devices.form.placeholders.selectDependentDevices')}
                    options={device?.dependentDoorsIds || []}
                    fieldNames={{ label: 'name', value: 'id' }}
                    mode='multiple'
                    optionFilterProp='name'
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <h3 className='border-b py-4 text-base font-medium text-gray-800'>{t('devices.form.labels.mainDeviceInfo')}</h3>

        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.ipAddress')} name='ipAddress'>
              <Input disabled />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.macAddress')} name='macAddress'>
              <Input disabled />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.serverIp')} name='serverIp'>
              <Input disabled />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.serverPort')} name='serverPort'>
              <Input disabled />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.deviceAddress')} name='deviceAddress'>
              <Input disabled />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.deviceType')} name='deviceType'>
              <Select
                options={device?.deviceTypeItems || []}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch
                optionFilterProp='name'
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.passback')} name='passback'>
              <Select
                options={device?.passbackItems || []}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch
                optionFilterProp='name'
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.sensorType')} name='sensorType'>
              <Select
                options={device?.sensorTypeItems || []}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch
                optionFilterProp='name'
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.bioStationMode')} name='bioStationMode'>
              <Select
                options={device?.bioStationModeItems || []}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch
                optionFilterProp='name'
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.lockOpenDuration')} name='lockOpenDuration'>
              <InputNumber
                min={1}
                max={254}
                className='w-full'
                placeholder={t('devices.form.placeholders.lockOpenDuration')}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.maxOpenDuration')} name='maxOpenDuration'>
              <InputNumber
                min={1}
                max={254}
                className='w-full'
                placeholder={t('devices.form.placeholders.maxOpenDuration')}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.sensorDuration')} name='sensorDuration'>
              <InputNumber
                min={1}
                max={254}
                className='w-full'
                placeholder={t('devices.form.placeholders.sensorDuration')}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem
              label={t('devices.form.labels.mprCount')}
              name='mprCount'
              rules={[{ required: true, message: t('devices.form.validation.mprCountRequired') }]}
            >
              <InputNumber min={1} max={10} className='w-full' placeholder={t('devices.form.placeholders.mprCount')} />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={t('devices.form.labels.mprInterval')} name='mprInterval'>
              <InputNumber className='w-full' placeholder={t('devices.form.placeholders.mprInterval')} />
            </FormItem>
          </Col>
        </Row>

        {/* Các switch */}
        <Row gutter={16} className='mt-4'>
          <Col xs={12} sm={8} md={4}>
            <FormItem label={t('devices.form.labels.deviceBuzzer')} name='deviceBuzzer' valuePropName='checked'>
              <Switch checkedChildren='ON' unCheckedChildren='OFF' />
            </FormItem>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <FormItem label={t('devices.form.labels.alarm')} name='alarm' valuePropName='checked'>
              <Switch checkedChildren='ON' unCheckedChildren='OFF' />
            </FormItem>
          </Col>
          <Col xs={12} sm={8} md={5}>
            <FormItem label={t('devices.form.labels.useAlarmRelay')} name='useAlarmRelay' valuePropName='checked'>
              <Switch checkedChildren='ON' unCheckedChildren='OFF' />
            </FormItem>
          </Col>
          <Col xs={12} sm={8} md={5}>
            <FormItem label={t('devices.form.labels.closeReverseLock')} name='closeReverseLock' valuePropName='checked'>
              <Switch checkedChildren='ON' unCheckedChildren='OFF' />
            </FormItem>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <FormItem label={t('devices.form.labels.useCardReader')} name='useCardReader' valuePropName='checked'>
              <Switch checkedChildren='ON' unCheckedChildren='OFF' />
            </FormItem>
          </Col>
        </Row>

        {/* Nút hành động */}
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link href='/quan-ly-ra-vao/diem-kiem-soat'>
            <Button variant='outlined' color='primary'>
              {t('buttons.cancel')}
            </Button>
          </Link>

          <Button type='primary' htmlType='submit' loading={mutation.isLoading}>
            {t('buttons.save')}
          </Button>
        </div>
      </Form>
    </Spin>
  );
}
