import MonacoEditor from '@monaco-editor/react'
import { useEffect, useState } from 'react';
import { EActions, ICommonActionsProps, TCustomEventsConfig } from './interface';
import { useComponentsStore } from '../../../stores/components';

const CustomEvents = (props: ICommonActionsProps<TCustomEventsConfig>) => {
    const { defaultValue, onChange, value: valueFromProps } = props;
    const { curComponentId } = useComponentsStore();

    const [value, setValue] = useState(defaultValue?.code);

    const handleCodeChange = (val?: string) => {
        if (!curComponentId) return;

        setValue(val);
        onChange?.({ type: EActions.customEvents, config: { code: val! } })
    };

    useEffect(() => {
        setValue(valueFromProps?.code);
    }, [valueFromProps]);

    return <div className='mt-[40px]'>
        <div className='flex items-start gap-[20px]'>
            <div><b>Custom JS Events</b></div>
            <div>
                <MonacoEditor
                    width="600px"
                    height="400px"
                    path='action.js'
                    language='javascript'
                    onChange={handleCodeChange}
                    value={value}
                    options={
                        {
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            minimap: { enabled: false },
                            scrollbar: {
                                verticalScrollbarSize: 6,
                                horizontalScrollbarSize: 6
                            }
                        }
                    }
                />
            </div>
        </div>
    </div>
};

export default CustomEvents;