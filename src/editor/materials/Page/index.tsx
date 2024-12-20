import { message } from "antd";
import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";

const Page = ({ children }: PropsWithChildren) => {

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: ['Button', 'Container'],
        drop: (item: { type: string }) => {
            message.success(item.type);
        },
        collect: (monitor) => {
            return { canDrop: monitor.canDrop() }
        },
    }));
    return <div ref={drop} className="p-[20px] h-[100%] box-border" style={{ border: canDrop ? '2px blue solid' : 'none' }}>{children}</div>
};

export default Page;