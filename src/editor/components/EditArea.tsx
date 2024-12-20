import React, { MouseEventHandler, useEffect, useState } from "react";
import { useComponentsConfigStore } from "../stores/component-config";
import { useComponentsStore, Component } from "../stores/components";
import HoverMask from "./HoverMask";

const EditArea = () => {
    const { components, addComponent } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();
    const [hoverComponentId, setHoverComponentId] = useState<number>();

    const handleMouseOver: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();
        for (let i = 0; i < path.length; i++) {
            const ele = path[i] as HTMLElement;
            const componentId = ele.dataset.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return;
            }
        }
    };

    const renderComponents = (components: Component[]): React.ReactNode => {
        return components.map((c: Component) => {
            const config = componentConfig?.[c.name];
            if (!config?.component) return null;

            return React.createElement(config.component, {
                key: c.id,
                id: c.id,
                name: c.name,
                ...config.defaultProps,
                ...c.props
            }, renderComponents(c.children || []));
        })
    };

    return <div className="h-[100%] edit-area" onMouseOver={handleMouseOver} onMouseLeave={() => { setHoverComponentId(undefined) }}>
        {renderComponents(components)}
        {hoverComponentId &&
            <HoverMask
                portalWrapperClassName="portal-wrapper"
                containerClassName="edit-area"
                componentId={hoverComponentId}
            />
        }
        <div className="portal-wrapper"></div>
    </div>
};

export default EditArea;