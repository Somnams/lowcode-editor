import { useMemo } from "react";
import { useComponentsConfigStore } from "../stores/component-config";
import MaterialItem from "./MaterialItem";

const Material = () => {
    const { componentConfig } = useComponentsConfigStore();
    const components = useMemo(() => {
        return Object.values(componentConfig);
    }, [componentConfig]);

    return <>{components.map(c => (
        <MaterialItem key={c.name} name={c.name} />
    ))}</>
}

export default Material;