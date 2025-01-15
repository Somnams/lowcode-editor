import { Table as AntdTable } from 'antd';
import { CommonComponentProps } from '../../interface';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

const TablePreview = ({ url, children }: CommonComponentProps) => {
    const [data, setData] = useState<Array<Record<string, any>>>([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        if (url) {
            setLoading(true);
            const res = await fetch(url);
            const _data = await res.json();

            setData(Array.isArray(_data) ? _data : []);
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const cols = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            if (item?.props?.type === 'date') {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex,
                    render: (val: any) => val ? dayjs(val).format('YYYY-MM-DD') : null,
                }
            } else {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex
                }
            }
        });
    }, [children]);
    return <AntdTable
        columns={cols}
        dataSource={data}
        pagination={false}
        rowKey='id'
        loading={loading}

    />
};

export default TablePreview;