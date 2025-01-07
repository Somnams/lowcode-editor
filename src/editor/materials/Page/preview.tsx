import { CommonComponentProps } from "../../interface";

const PagePreview = ({ children, id, name, styles }: CommonComponentProps) => {

    return <div
        data-component-id={id}
        className="p-[20px]"
        style={{ ...styles }}>
        {children}
    </div>
};

export default PagePreview;