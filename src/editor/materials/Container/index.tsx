import { CommonComponentProps, EMaterialAction, IMaterialAction } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterialDrop";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

const Container = ({ children, id, styles, name }: CommonComponentProps) => {
    const { canDrop, drop } = useMaterialDrop(['Button', 'Container', 'Modal', 'Table', 'Form'], id);
    const divRef = useRef<HTMLDivElement>(null);

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: EMaterialAction.move,
            id
        } as IMaterialAction
    });

    useEffect(() => {
        drop(divRef);
        drag(divRef);
    }, []);

    return <div
        ref={divRef}
        data-component-id={id}
        style={styles}
        className={`min-h-[100px] p-[20px]  ${canDrop ? 'border-[2px] border-blue' : 'border-[1px] border-[#000]'} `}>
        {children}
    </div>
};

export default Container;