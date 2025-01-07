import { useMemo } from "react";
import { useComponentsConfigStore } from "../../stores/component-config";
import MaterialItem from "../MaterialItem";

const Material = () => {
    const { componentConfig } = useComponentsConfigStore();
    const components = useMemo(() => {
        return Object.values(componentConfig).filter(c => c.name !== 'Page');
    }, [componentConfig]);

    return <>{components.map(c => (
        <MaterialItem key={c.name} name={c.name} desc={c.desc} />
    ))}</>
}

export default Material;