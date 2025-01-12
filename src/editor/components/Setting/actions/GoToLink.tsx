import { useState } from "react";
import { useComponentsStore } from "../../../stores/components";
import { EActions, ICommonActionsProps, TGoToLinkConfig } from "./interface";
import TextArea from "antd/es/input/TextArea";

const GoToLink = (props: ICommonActionsProps<TGoToLinkConfig>) => {
    const { defaultValue, onChange } = props;

    const [value, setValue] = useState(defaultValue?.url);

    const { curComponentId } = useComponentsStore();

    const handleUrlChange = (val: string) => {
        if (!curComponentId) return;
        setValue(val);
        onChange?.({ type: EActions.goToLink, config: { url: val } });
    };

    return <div className="mt-[10px]">
        <div className="flex  gap-[10px]">
            <div><b>LINK: </b></div>
            <TextArea
                style={{ height: 200, width: 500, border: '1px solid #000' }}
                onChange={(e) => { handleUrlChange(e.target.value) }}
                value={value}
            />
        </div>
    </div>
};

export default GoToLink;