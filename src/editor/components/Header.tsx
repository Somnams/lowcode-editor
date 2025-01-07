import { Button, Space } from "antd";
import { EMode, useComponentsStore } from "../stores/components";

const Header = () => {
    const { mode, setMode, setCurComponentId } = useComponentsStore();

    return <div className="w-[100%] h-[100%]">
        <div className="h-[50px] flex justify-between items-center px-[20px]">
            <div>Lower Editor</div>
            <Space>
                {
                    mode === EMode.edit && <Button type="primary" onClick={() => {
                        setMode(EMode.preview);
                        setCurComponentId(null);
                    }}>PREVIEW</Button>
                }
                {
                    mode === EMode.preview && <Button type="primary" onClick={() => {
                        setMode(EMode.edit);
                    }}>EDIT</Button>
                }
            </Space>
        </div>
    </div>
};

export default Header;