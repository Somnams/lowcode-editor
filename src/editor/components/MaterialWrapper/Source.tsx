import MonacoEditor, { } from '@monaco-editor/react'
import { useComponentsStore } from "../../stores/components";

const Source = () => {
    const { components } = useComponentsStore();

    return <MonacoEditor
        height={'100%'}
        path='components.json'
        language='json'
        value={JSON.stringify(components, null, 2)}
        options={
            {
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false
                },
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6
                }
            }
        }
    />
};

export default Source;