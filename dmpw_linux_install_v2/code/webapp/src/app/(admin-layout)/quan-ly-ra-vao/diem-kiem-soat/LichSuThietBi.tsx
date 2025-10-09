'use client';

import { useCustomTable } from '@hooks';
import { useTranslation } from '@refinedev/core';
import { Table, TableColumnsType, Tooltip } from 'antd';

const getColumns = (t: any): TableColumnsType => [
  {
    title: t('quan-ly-ra-vao/diem-kiem-soat.history.columns.time'),
    dataIndex: 'eventTime',
    width: 170,
  },
  {
    title: t('quan-ly-ra-vao/diem-kiem-soat.history.columns.eventType'),
    dataIndex: 'eventType',
    width: 120,
  },
  {
    title: t('quan-ly-ra-vao/diem-kiem-soat.history.columns.operator'),
    dataIndex: 'operator',
    ellipsis: { showTitle: false },
    width: 200,
  },
  {
    title: t('quan-ly-ra-vao/diem-kiem-soat.history.columns.eventDetails'),
    dataIndex: 'eventDetails',
    ellipsis: { showTitle: false },
    render: (text: string) => (
      <Tooltip 
        placement='topLeft' 
        title={<div dangerouslySetInnerHTML={{ __html: text }} />}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: text }} 
          style={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        />
      </Tooltip>
    ),
  },
];

type LichSuThietBiProps = {
  id?: number | string;
  isCamera?: boolean;
};

export default function LichSuThietBi({ id, isCamera }: LichSuThietBiProps) {
  const { translate: t } = useTranslation();
  const columns = getColumns(t);
  const { tableProps } = useCustomTable({
    resource: `devices/${id}/history`,
    queryOptions: {
      enabled: !!id && !isCamera,
    },
  });

  const { tableProps: cameraTableProps } = useCustomTable({
    resource: `cameras/${id}/history`,
    queryOptions: {
      enabled: !!id && isCamera === true,
    },
  });

  return (
    <div>
      <Table
        {...(isCamera ? cameraTableProps : tableProps)}
        columns={columns}
        rowSelection={undefined}
        scroll={{ y: '50vh' }}
        rowKey={(record) => record.id || record.eventTime}
      />
    </div>
  );
}
