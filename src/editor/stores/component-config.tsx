import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";
import { Input, InputNumber, Select } from "antd";
import ButtonPreview from "../materials/Button/preview";
import ContainerPreview from "../materials/Container/preview";
import PagePreview from "../materials/Page/preview";
import MaterialModal from "../materials/Modal";
import MaterialModalPreview from '../materials/Modal/preview';

export interface ComponentSetter {
    name: string;
    label: string;
    Comp: any;
    [key: string]: any;
}

export interface IComponentEvent {
    name: string;
    label: string;
}

export interface IComponentMethod extends Pick<IComponentEvent, 'name' | 'label'> { }

export interface ComponentConfig {
    name: string;
    desc: string;
    defaultProps: Record<string, any>;
    component: any;
    preview: any;
    events?: IComponentEvent[];
    methods?: IComponentMethod[];
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
        Container: { name: "Container", desc: 'container', defaultProps: {}, component: Container, preview: ContainerPreview },
        Button: {
            name: "Button", desc: 'button', defaultProps: { type: 'primary', text: 'primary' },
            component: Button,
            preview: ButtonPreview,
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
            ],
            events: [
                {
                    name: 'onClick',
                    label: 'click'
                },
                {
                    name: 'onDoubleClick',
                    label: 'double click'
                }
            ]
        },
        Page: { name: 'Page', desc: 'root page', defaultProps: {}, component: Page, preview: PagePreview },
        Modal: {
            name: 'Modal',
            desc: 'modal',
            defaultProps: { title: 'modal title' },
            setter: [
                { name: 'title', label: 'Title', Comp: Input }
            ],
            stylesSetter: [],
            events: [
                { name: 'onOk', label: 'ok event' },
                { name: 'onCancel', label: 'cancel event' }
            ],
            methods: [
                { name: 'open', label: 'open modal' },
                { name: 'close', label: 'close modal' }
            ],
            preview: MaterialModalPreview,
            component: MaterialModal
        }
    } as Record<string, ComponentConfig>,
    registerComponent: (name, componentConfig) => set((state) => {
        return { componentConfig: { ...state.componentConfig, [name]: componentConfig } };
    }),
}));