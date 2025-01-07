import React, { ReactNode } from "react";
import { Component, useComponentsStore } from "../../stores/components";
import { ComponentConfig, useComponentsConfigStore } from "../../stores/component-config";

const Preview = () => {
    const { components } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    const renderComponents = (components: Component[]): ReactNode => {
        console.log(components);

        return components?.map(c => {
            const config = componentConfig?.[c.name] as ComponentConfig;
            if (!config.preview) return null;

            return React.createElement(config.preview, {
                key: c.id,
                id: c.id,
                name: c.name,
                styles: c.styles,
                ...config.defaultProps,
                ...c.props
            }, renderComponents(c.children || []))
        });
    };

    return <div>
        {renderComponents(components)}
    </div>
};

export default Preview;