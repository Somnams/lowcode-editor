import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponentsStore } from "../../stores/components";

interface IProps {
    componentId: number;
    containerClassName: string;
    portalWrapperClassName: string;
}

const HoverMask = (props: IProps) => {
    const { componentId, containerClassName, portalWrapperClassName } = props;
    const { components } = useComponentsStore();
    const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0, labelTop: 0, labelLeft: 0 });

    const container = useMemo(() => {
        return document.querySelector(`.${containerClassName}`);
    }, [containerClassName]);

    const curComp = useMemo(() => {
        return getComponentById(componentId, components);
    }, [componentId]);

    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!;
    }, [portalWrapperClassName]);

    useEffect(() => {
        updatePosition();
    }, [componentId]);

    useEffect(() => {
        updatePosition();
    }, [components]);

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

    return createPortal(<div
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
    >
        <div style={{
            position: 'absolute',
            left: position.labelLeft,
            top: position.labelTop,
            fontSize: "14px",
            zIndex: 13,
            display: (!position.width || position.width < 10) ? 'none' : 'inline',
            transform: 'translate(-100%, -100%)'
        }}>
            <div style={{
                padding: '0 8px',
                backgroundColor: 'blue',
                borderRadius: 4,
                color: '#fff',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
            }}>
                {curComp?.desc}
            </div>
        </div>
    </div>, el)
};

export default HoverMask;