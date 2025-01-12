import React, { ReactNode } from "react";
import { Component, useComponentsStore } from "../../stores/components";
import { ComponentConfig, IComponentEvent, useComponentsConfigStore } from "../../stores/component-config";
import { message } from "antd";
import { EActions, ICommonConfig, TGoToLinkConfig, TShowMessageConfig } from "../Setting/actions/interface";

const Preview = () => {
    const { components } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    const handleEvent = (component: Component) => {
        const props: Record<string, any> = {};

        componentConfig?.[component.name]?.events?.forEach((event: IComponentEvent) => {
            const eventConfig = component.props[event.name];
            if (eventConfig) {
                props[event.name] = () => {
                    eventConfig?.actions?.forEach((action: ICommonConfig<TShowMessageConfig | TGoToLinkConfig>) => {
                        const { type, config } = action;
                        switch (type) {
                            case EActions.goToLink:
                                const { url } = config as TGoToLinkConfig;
                                if (url) {
                                    window.location.href = url;
                                }
                                return;
                            case EActions.showTips:
                                const { text, type } = config as TShowMessageConfig;
                                if (type === 'success') {
                                    message.success(text);
                                } else if (type === 'error') {
                                    message.error(text);
                                }
                                return;
                            default:
                                break;
                        }
                    });
                };
            }
        });

        return props;
    };

    const renderComponents = (components: Component[]): ReactNode => {
        return components?.map(c => {
            const config = componentConfig?.[c.name] as ComponentConfig;
            if (!config.preview) return null;

            return React.createElement(config.preview, {
                key: c.id,
                id: c.id,
                name: c.name,
                styles: c.styles,
                ...config.defaultProps,
                ...c.props,
                ...handleEvent(c)
            }, renderComponents(c.children || []))
        });
    };

    return <div>
        {renderComponents(components)}
    </div>
};

export default Preview;