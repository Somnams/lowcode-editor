import React, { ReactNode, useRef } from "react";
import { Component, useComponentsStore } from "../../stores/components";
import { ComponentConfig, IComponentEvent, useComponentsConfigStore } from "../../stores/component-config";
import { message } from "antd";
import { EActions, ICommonConfig, TCompMethodsConfig, TCustomEventsConfig, TGoToLinkConfig, TSettingActionsConfig, TShowMessageConfig } from "../Setting/actions/interface";

const Preview = () => {
    const compRefs = useRef<Record<string, any>>({});
    const { components } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    const handleEvent = (component: Component) => {
        const props: Record<string, any> = {};

        componentConfig?.[component.name]?.events?.forEach((event: IComponentEvent) => {
            const eventConfig = component.props[event.name];
            if (eventConfig) {
                props[event.name] = (...args: any[]) => {
                    eventConfig?.actions?.forEach((action: ICommonConfig<TSettingActionsConfig>) => {
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
                            case EActions.customEvents:
                                const { code } = config as TCustomEventsConfig;
                                const func = new Function('context', 'args', code);
                                func({
                                    name: component.name,
                                    props: component.props,
                                    showMessage(content: string) {
                                        message.success(content);
                                    }
                                }, args);
                                return;
                            case EActions.compMethods:
                                const { componentId, method } = config as TCompMethodsConfig;
                                const comp = compRefs.current[componentId];
                                if (comp) {
                                    comp[method]?.(...args);
                                }
                                return;
                            default:
                                break;
                        }
                    });
                };
            }
        });

        console.log(props);

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
                ref: (ref: Record<string, any>) => { compRefs.current[c.id] = ref },
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