import { Tree } from "antd";
import { useComponentsStore } from "../../stores/components";

const Outline = () => {
    const { components, setCurComponentId } = useComponentsStore();

    return <Tree
        treeData={components as any}
        fieldNames={{ title: 'desc', key: 'id' }}
        showLine
        defaultExpandAll
        onSelect={([selectedKey]) => {
            setCurComponentId(selectedKey as number)
        }}
    />
};

export default Outline;
