import { ChangeEvent, useEffect, useState } from 'react';
import { BaseKey, CrudFilters, useList } from '@refinedev/core';
import { TreeDataNode, TreeProps } from 'antd';
import { useDebounceCallback } from 'usehooks-ts';

// Clone the type of props (parameters) for useList
type UseTreeProps = Parameters<typeof useList>[0] & {};

export const useTree = ({ pagination, ...useListProps }: UseTreeProps) => {
  const [filters, setFilters] = useState<CrudFilters>([]);

  const [current, setCurrent] = useState(pagination?.current || 1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 20);

  useEffect(() => {
    const { current: newCurrent, pageSize: newPageSize } = pagination || {};

    if (newCurrent) {
      setCurrent(newCurrent);
    }
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  }, [pagination]);

  const query = useList({
    filters,
    pagination: {
      current,
      pageSize,
    },
    ...useListProps,
  });

  const [checkedKeys, setCheckedKeys] = useState<BaseKey[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<BaseKey[]>([]);

  /**
   * Handles the search input change with debouncing.
   */
  const handleSearch = useDebounceCallback((ev: ChangeEvent<HTMLInputElement> | string) => {
    setFilters([
      {
        field: 'search',
        operator: 'eq',
        value: typeof ev === 'string' ? ev : ev.target.value,
      },
    ]);
  }, 500);

  /**
   *  Handles the success of a delete operation.
   *
   *  - Update the current page if the deleted items were the last on the current page,
   *  - Update the selected row keys if row selection is enabled.
   * @param ids - Single ID or an array of IDs.
   * @param refresh - Whether to refresh the query after deletion.
   */
  const handleDeleteSuccess = (ids: BaseKey | BaseKey[], refresh = true) => {
    if (refresh) {
      query.refetch();
    }

    ids = typeof ids === 'string' || typeof ids === 'number' ? [ids] : ids;

    if (pagination && query.data?.data?.length === ids.length && current > 1) {
      setCurrent(current - 1);
    }

    const newCheckedKeys = checkedKeys.filter((key) => !(ids as BaseKey[]).includes(key));
    const newSelectedKeys = selectedKeys.filter((key) => !(ids as BaseKey[]).includes(key));

    setCheckedKeys(newCheckedKeys);
    setSelectedKeys(newSelectedKeys);
  };

  const treeProps = {
    treeData: (query?.data?.data as TreeDataNode[]) || [],
    checkable: true,
    blockNode: true,
    checkedKeys,
    onCheck: (keys) => {
      setCheckedKeys(keys as string[]);
      setSelectedKeys(keys as string[]);
    },
    selectedKeys,
    onSelect: (keys) => {
      setCheckedKeys(keys as string[]);
      setSelectedKeys(keys as string[]);
    },
  } satisfies TreeProps;

  return {
    treeProps,
    query,
    current,
    pageSize,
    checkedKeys,
    selectedKeys,
    handleSearch,
    handleDeleteSuccess,
    setCurrent,
    setPageSize,
  };
};
