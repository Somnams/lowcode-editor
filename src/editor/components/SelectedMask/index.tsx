import { useEffect, useMemo, useState } from "react";
import { getComponentById, useComponentsStore } from "../../stores/components";
import { createPortal } from "react-dom";
import { Dropdown, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface IProps {
    containerClassName: string;
    portalWrapperClassName: string;
    componentId: number;
}

const SelectedMask = (props: IProps) => {
    const { containerClassName, portalWrapperClassName, componentId } = props;

    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0
    });

    const { components, curComponentId, deleteComponent, setCurComponentId } = useComponentsStore();

    const container = useMemo(() => {
        return document.querySelector(`.${containerClassName}`);
    }, [containerClassName]);

    const curComp = useMemo(() => {
        return getComponentById(componentId, components);
    }, [componentId]);

    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!;
    }, [portalWrapperClassName]);

    const parentComps = useMemo(() => {
        const res = [];
        let comp = curComp;
        while (comp?.parentId) {
            comp = getComponentById(comp.parentId, components);
            res.push(comp);
        }
        return res;
    }, [curComp]);

    useEffect(() => {
        updatePosition();
    }, [componentId]);

    useEffect(() => {
        updatePosition();
    }, [components]);

    useEffect(() => {
        const resizeHandler = () => {
            updatePosition();
        };
        window.addEventListener('resize', resizeHandler);

        return () => {
            console.log('end');
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    const updatePosition = () => {
        if (!componentId || !container) return;

        const node = container.querySelector(`[data-component-id="${componentId}"]`);
        if (!node) return;

        const { top, left, width, height } = node.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();
        let labelLeft = left - containerLeft + width;
        let labelTop = top - containerTop + container.scrollTop;
        if (labelTop <= 0) {
            labelTop -= -20;
        }
        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollLeft,
            width,
            height,
            labelLeft,
            labelTop
        });
    };

    const handleDelete = () => {
        deleteComponent(curComponentId!);
        setCurComponentId(null);
    };

    return createPortal(<>
        <div
            style={{
                position: "absolute",
                left: position.left,
                top: position.top,
                width: position.width,
                height: position.height,
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                border: "1px dashed blue",
                pointerEvents: "none",
                zIndex: 12,
                borderRadius: 4,
                boxSizing: 'border-box'
            }}
        />
        <div style={{
            position: 'absolute',
            left: position.labelLeft,
            top: position.labelTop,
            fontSize: "14px",
            zIndex: 13,
            display: (!position.width || position.width < 10) ? 'none' : 'inline',
            transform: 'translate(-100%, -100%)'
        }}>
            <Space>
                <Dropdown
                    menu={{
                        items: parentComps.map(item => ({
                            key: item!.id,
                            label: item!.desc,
                        })),
                        onClick: ({ key }) => {
                            setCurComponentId(+key);
                        }
                    }}
                    disabled={parentComps.length === 0}
                >
                    <div
                        style={{
                            padding: '0 8px',
                            backgroundColor: 'blue',
                            borderRadius: 4,
                            color: '#fff',
                            cursor: "pointer",
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {curComp?.desc}
                    </div>
                </Dropdown>
                {curComponentId !== 1 && (
                    <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
                        <Popconfirm
                            title="sure remove ?"
                            okText={'ok'}
                            cancelText={'cancel'}
                            onConfirm={handleDelete}
                        >
                            <DeleteOutlined style={{ color: '#fff' }} />
                        </Popconfirm>
                    </div>
                )}
            </Space>
        </div></>, el)
}


export default SelectedMask;