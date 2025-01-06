import { useDrop } from "react-dnd";
import { useComponentsConfigStore } from "../stores/component-config";
import { useComponentsStore } from "../stores/components";

const useMaterialDrop = (accept: string[], id: number) => {
    const { addComponent } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    const [{ canDrop }, drop] = useDrop(() => ({
        accept,
        drop: (item: { type: string }, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return;
            }
            const config = componentConfig[item.type];

            addComponent({
                id: new Date().getTime(),
                name: item.type,
                desc: config.desc,
                props: config.defaultProps,
            }, id);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
};

export default useMaterialDrop;