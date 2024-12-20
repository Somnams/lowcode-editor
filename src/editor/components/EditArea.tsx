import React, { useEffect } from "react";
import { useComponentsConfigStore } from "../stores/component-config";
import { useComponentsStore, Component } from "../stores/components";

const EditArea = () => {
    const { components, addComponent } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

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

    return <div className="h-[100%]">
        {renderComponents(components)}
    </div>
};

export default EditArea;