import { CommonComponentProps } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterialDrop";

const Container = ({ children, id, styles }: CommonComponentProps) => {
    const { canDrop, drop } = useMaterialDrop(['Button', 'Container', 'Modal'], id);

    return <div
        ref={drop}
        data-component-id={id}
        style={styles}
        className={`min-h-[100px] p-[20px]  ${canDrop ? 'border-[2px] border-blue' : 'border-[1px] border-[#000]'} `}>
        {children}
    </div>
};

export default Container;