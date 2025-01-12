import { CSSProperties } from 'react';
import { create } from 'zustand';
import { CommonComponentProps } from '../interface';

type _Omit<T, K extends keyof T> = { [P in keyof T as Exclude<P, K>]: T[P] }
export enum EMode {
    edit,
    preview
}

export interface Component extends _Omit<CommonComponentProps, 'children'> {
    desc: string;
    props: any;
    children?: Component[];
    parentId?: number;
}

interface State {
    mode: EMode,
    components: Component[];
    curComponent: Component | null;
    curComponentId?: number | null;
}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (componentId: number) => void;
    updateComponentProps: (componentId: number, props: any) => void;
    setCurComponentId: (componentId: number | null) => void;
    updateComponentStyles: (componentId: number, styles: CSSProperties, replace?: boolean) => void;
    setMode: (mode: EMode) => void;
}

export const useComponentsStore = create<State & Action>(((set, get) => ({
    components: [{
        id: 1,
        name: 'Page',
        props: {},
        desc: 'root page',
    }],
    mode: EMode.edit,
    curComponent: null,
    curComponentId: null,
    setCurComponentId: (componentId) => set((state) => ({
        curComponentId: componentId,
        curComponent: getComponentById(componentId, state.components)
    })),
    addComponent: (component, parentId) => set((state) => {
        if (parentId) {
            const pComp = getComponentById(parentId, state.components);
            if (pComp) {
                if (Array.isArray(pComp.children)) {
                    pComp.children.push(component);
                } else {
                    pComp.children = [component];
                }
            }
            component.parentId = parentId;
            return { components: [...state.components] };
        }
        return { components: [...state.components, component] };
    }),
    deleteComponent: (componentId) => {
        if (!componentId) return;

        const comp = getComponentById(componentId, get().components);
        if (comp?.parentId) {
            const pComp = getComponentById(comp.parentId, get().components);
            if (pComp) {
                pComp.children = pComp.children?.filter(c => c.id !== componentId);
                set({ components: [...get().components] });
            }
        }
    },
    updateComponentProps: (componentId, props) => set((state) => {
        const comp = getComponentById(componentId, state.components);
        if (comp) {
            comp.props = { ...comp.props, ...props };
        }
        return { components: [...state.components] };
    }),
    updateComponentStyles: (componentId, styles, replace) => set((state) => {
        const comp = getComponentById(componentId, state.components);
        if (comp) {
            comp.styles = replace ? { ...styles } : { ...comp.styles, ...styles };
            return { components: [...state.components] };
        }
        return { components: [...state.components] };
    }),
    setMode: (mode) => set({ mode })
})))

export function getComponentById(id: number | null, components: Component[]): Component | null {
    if (!id) return null;

    for (const comp of components) {
        if (comp.id === id) return comp;
        if (Array.isArray(comp.children) && comp.children.length > 0) {
            const res = getComponentById(id, comp.children);
            if (res) return res;
        }
    }
    return null;
}