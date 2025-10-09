'use client';

import { useCustom, useTranslation } from '@refinedev/core';
import { IEventLogReportInit } from '@types';
import { Checkbox, Col, Form, FormProps, Input, InputNumber, Row, Select } from 'antd';

const { Option } = Select;

export default function CameraForm(formProps: FormProps) {
  const { translate: t } = useTranslation();

  const { data: eventLogInit } = useCustom<IEventLogReportInit>({
    url: 'event-logs/report/init',
    method: 'get',
  });

  const { data: camerasInit } = useCustom({
    url: 'cameras/init',
    method: 'get',
  });

  const cameraTypes = camerasInit?.data?.types;

  return (
    <Form {...formProps} layout='vertical'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={t('cameras.form.labels.cameraType')}
            name='type'
            rules={[{ required: true, message: t('cameras.form.validation.cameraTypeRequired') }]}
          >
            <Select
              placeholder={t('cameras.form.placeholders.selectCameraType')}
              options={cameraTypes}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('cameras.form.labels.cameraName')}
            name='name'
            rules={[{ required: true, whitespace: true, message: t('cameras.form.validation.cameraNameRequired') }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={t('cameras.form.labels.cameraId')}
            name='cameraId'
            rules={[{ required: true, whitespace: true, message: t('cameras.form.validation.cameraIdRequired') }]}
          >
            <Input placeholder={t('cameras.form.placeholders.enterCameraId')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('cameras.form.labels.direction')} name='roleReader' initialValue={0}>
            <Select placeholder={t('cameras.form.placeholders.selectDirection')}>
              <Option value={0}>{t('cameras.form.labels.directionIn')}</Option>
              <Option value={1}>{t('cameras.form.labels.directionOut')}</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={t('cameras.form.labels.videoLength')}
            name='videoLength'
            rules={[{ required: true, message: t('cameras.form.validation.videoLengthRequired') }]}
            initialValue={10}
          >
            <InputNumber className='w-full' min={1} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('cameras.form.labels.accessPoint')} name='icuId'>
            <Select
              options={eventLogInit?.data?.doorList}
              fieldNames={{ label: 'name', value: 'id' }}
              optionFilterProp='name'
              placeholder={t('cameras.form.placeholders.selectAccessPoint')}
            />
          </Form.Item>
        </Col>

        <div className='flex justify-between gap-4'>
          <Form.Item name='saveEventUnknownFace' valuePropName='checked' noStyle initialValue={true}>
            <Checkbox className='ml-1'>{t('cameras.form.labels.saveEventUnknownFace')}</Checkbox>
          </Form.Item>

          {/* <Col span={12}>
            <Form.Item name='saveLog' valuePropName='checked' noStyle>
              <Checkbox className='ml-1' defaultChecked>
                Lưu lại nhật ký trạng thái camera
              </Checkbox>
            </Form.Item>
          </Col> */}

          <Form.Item name='checkEventFromWebHook' valuePropName='checked' noStyle initialValue={true}>
            <Checkbox className='ml-1'>{t('cameras.form.labels.checkEventFromWebHook')}</Checkbox>
          </Form.Item>
        </div>
      </Row>
    </Form>
  );
}
