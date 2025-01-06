import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";
import { Input, InputNumber, Select } from "antd";

export interface ComponentSetter {
    name: string;
    label: string;
    Comp: any;
    [key: string]: any;
}

export interface ComponentConfig {
    name: string;
    desc: string;
    defaultProps: Record<string, any>;
    component: any;
    setter?: ComponentSetter[];
    stylesSetter?: ComponentSetter[];
}

interface State {
    componentConfig: { [key: string]: Record<string, any> }
}

interface Action {
    registerComponent: (name: string, component: any) => void;
}

export const useComponentsConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Container: { name: "Container", desc: 'container', defaultProps: {}, component: Container },
        Button: {
            name: "Button", desc: 'button', defaultProps: { type: 'primary', text: 'primary' }, component: Button,
            setter: [
                {
                    name: 'type', label: 'Button Type',
                    Comp: Select,
                    props: {
                        options: [{ label: 'Primary', value: 'primary' }, { label: 'Default', value: 'default' }]
                    },
                },
                { name: 'text', label: 'Text', Comp: Input }
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: 'Width',
                    Comp: InputNumber,
                    props: {
                        min: 20,
                        step: 1
                    }
                }, {
                    name: 'height',
                    label: 'Height',
                    Comp: InputNumber,
                    props: {
                        min: 20,
                        step: 1
                    },
                }
            ]
        },
        Page: { name: 'Page', desc: 'root page', defaultProps: {}, component: Page }
    } as Record<string, ComponentConfig>,
    registerComponent: (name, componentConfig) => set((state) => {
        return { componentConfig: { ...state.componentConfig, [name]: componentConfig } };
    }),
}));