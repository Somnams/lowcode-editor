import { Table as AntdTable } from 'antd';
import { CommonComponentProps, EMaterialAction, IMaterialAction } from '../../interface';
import useMaterialDrop from '../../hooks/useMaterialDrop';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDrag } from 'react-dnd';

const Table = ({ id, name, children, styles }: CommonComponentProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const { canDrop, drop } = useMaterialDrop(['TableColumn'], id);
    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: EMaterialAction.move,
            id
        } as IMaterialAction
    });

    useEffect(() => {
        drop(divRef);
        drag(divRef);
    }, []);

    const cols = useMemo(() => {
        return React.Children.map(children, (item: any) => (
            {
                title: <div className='m-[-16px] p-[16px]' data-component-id={item.props?.id}>{item.props?.title}</div>,
                dataIndex: item.props?.dataIndex,
                key: item
            }
        ))
    }, [children]);

    return <div
        className={`w-[100%] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        ref={divRef}
        data-component-id={id}
        style={styles}
    >
        <AntdTable
            columns={cols}
            dataSource={[]}
            pagination={false}
        />
    </div>
};

export default Table;