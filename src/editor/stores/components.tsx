import {create} from 'zustand';

export interface Component {
    id: number;
    name: string;
    props: any;
    children?: Component[];
    parentId?: number;
}

interface State {
    components: Component[];
}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (componentId: number) => void;
    updateComponent: (componentId: number, props: any) => void;
}

export const useComponentsStore = create<State & Action>(((set, get) => ({
    components: [{
        id: 1,
        name: 'Page',
        props: {},
        desc: 'Root Page'
    }],
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
            return {components: [...state.components]};
        }
        return {components: [...state.components, component]};
    }),
    deleteComponent: (componentId) => {
        if (!componentId) return;

        const comp = getComponentById(componentId, get().components);
        if (comp?.parentId) {
            const pComp = getComponentById(comp.parentId, get().components);
            if (pComp) {
                pComp.children = pComp.children?.filter(c => c.id !== componentId);
                set({components: [...get().components]});
            }
        }
    },
    updateComponent: (componentId, props) => set((state) => {
        const comp = getComponentById(componentId, state.components);
        if (comp) {
            comp.props = {...comp.props, ...props};
        }
        return { components:[...state.components]};
    })
})))

export function getComponentById(id: number, components: Component[]): Component | null {
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