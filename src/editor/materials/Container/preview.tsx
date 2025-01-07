import { CommonComponentProps } from "../../interface";

const ContainerPreview = ({ children, id, styles }: CommonComponentProps) => {

    return <div
        style={styles}
        className="p-[20px]"
    >
        {children}
    </div>
};

export default ContainerPreview;