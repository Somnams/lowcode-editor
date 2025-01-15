import { useDrop } from "react-dnd";
import { useComponentsConfigStore } from "../stores/component-config";
import { getComponentById, useComponentsStore } from "../stores/components";
import { EMaterialAction, IMaterialAction } from "../interface";

const useMaterialDrop = (accept: string[], id: number) => {
    const { addComponent, components, deleteComponent } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    const [{ canDrop }, drop] = useDrop(() => ({
        accept,
        drop: (item: IMaterialAction, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return;
            }
            if (item.dragType === EMaterialAction.move) {
                const comp = getComponentById(item.id, components)!;
                deleteComponent(item.id);
                addComponent(comp, id);
            } else {
                const config = componentConfig[item.type];

                addComponent({
                    id: new Date().getTime(),
                    name: item.type,
                    desc: config.desc,
                    props: config.defaultProps,
                }, id);
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
};

export default useMaterialDrop;