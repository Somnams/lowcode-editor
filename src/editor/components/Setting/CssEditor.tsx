import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

export interface EditorFile {
    name: string;
    value: string;
    language: string;
}

interface IProps {
    value: string;
    onChange?: EditorProps['onChange'];
    options?: editor.IStandaloneEditorConstructionOptions
}

const CSSEditor = (props: IProps) => {
    const { value, onChange, options } = props;

    // const handleEditorMount = (editor: editor.IStandaloneCodeEditor, monaco: any) => {
    //     editor.addCommand(monaco.keyMod.CtrlCmd | monaco.Keycode.KeyJ, () => {
    //         editor.getAction('editor.action.formatDocument')?.run();
    //     });
    // };

    return <MonacoEditor
        language='css'
        height='100%'
        path='component.css'
        // onMount={handleEditorMount}
        onChange={onChange}
        value={value}
        options={
            {
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6
                },
                ...options
            }
        }
    />
};

export default CSSEditor;