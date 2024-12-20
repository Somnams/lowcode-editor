import React, { useEffect } from "react";
import { useComponentsConfigStore } from "../stores/component-config";
import { useComponentsStore, Component } from "../stores/components";

const EditArea = () => {
    const { components, addComponent } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();
    // useEffect(() => {
    //     addComponent({
    //         id: 111,
    //         name: 'Container',
    //         props: {},
    //         children: []
    //     });
    // }, []);

    const renderComponents = (components: Component[]): React.ReactNode => {
        return components.map((c: Component) => {
            const config = componentConfig?.[c.name];
            if (!config?.component) return null;

            return React.createElement(config.component, {
                key: c.id,
                ...config.defaultProps,
                ...c.props
            }, renderComponents(c.children || []));
        })
    };

    return <div className="h-[100%]">
        {renderComponents(components)}
        {/* <pre>
            {JSON.stringify(components, null, 2)}
        </pre> */}
    </div>
};

export default EditArea;