import { useComponentsStore } from "../stores/components";

const Settings = () => {
    const { components } = useComponentsStore();

    return <pre>{JSON.stringify(components, null, 2)}</pre>
};

export default Settings;