import { CommonComponentProps } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterialDrop";

const Page = ({ children, id, name }: CommonComponentProps) => {
    const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id);

    return <div ref={drop} className="p-[20px] h-[100%] box-border" style={{ border: canDrop ? '2px blue solid' : 'none' }}>{children}</div>
};

export default Page;