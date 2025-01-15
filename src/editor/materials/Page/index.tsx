import { CommonComponentProps } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterialDrop";

const Page = ({ children, id, styles }: CommonComponentProps) => {
    const { canDrop, drop } = useMaterialDrop(['Button', 'Container', 'Modal', 'Table'], id);

    return <div
        ref={drop}
        data-component-id={id}
        className="p-[20px] h-[100%] box-border"
        style={{ ...styles, border: canDrop ? '2px blue solid' : 'none' }}>
        {children}
    </div>
};

export default Page;