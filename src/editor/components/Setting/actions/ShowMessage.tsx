import { Input, Select } from "antd";
import { EActions, ICommonActionsProps, TShowMessageConfig } from "./interface";
import { useComponentsStore } from "../../../stores/components";
import { useEffect, useState } from "react";

const ShowMessage = (props: ICommonActionsProps<TShowMessageConfig>) => {
    const { onChange, defaultValue, value: valueFromProps } = props;

    const [type, setType] = useState(defaultValue?.type || 'success');
    const [text, setText] = useState(defaultValue?.text || '');

    const { curComponentId } = useComponentsStore();

    const handleMessageTypeChange = (_type: TShowMessageConfig['type']) => {
        if (!curComponentId) return;
        setType(_type);
        onChange?.({ type: EActions.showTips, config: { type: _type, text } })
    };

    const handleMessageTextChange = (_text: string) => {
        if (!curComponentId) return;
        setText(_text);
        onChange?.({ type: EActions.showTips, config: { type, text: _text } });
    };

    useEffect(() => {
        setType(valueFromProps?.type || 'success');
        setText(valueFromProps?.text || '');
    }, [valueFromProps]);

    return <div className="mt-[10px]">
        <div className="flex items-center gap-[10px]">
            <div><b>TYPE: </b></div>
            <Select style={{ width: 500 }}
                options={[{ label: 'success', value: 'success' }, { label: "error", value: 'error' }]}
                onChange={(value) => { handleMessageTypeChange(value) }}
                value={type}
            />
        </div>
        <div className="flex items-center gap-[10px] mt-[10px]">
            <div><b>TEXT: </b></div>
            <Input
                style={{ width: 500 }}
                onChange={(e) => { handleMessageTextChange(e.target.value) }}
                value={text} />
        </div>
    </div>
};

export default ShowMessage;