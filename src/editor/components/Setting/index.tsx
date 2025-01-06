import { Segmented } from "antd";
import { ESetting, settingCols } from "./config";
import { useState } from "react";
import ComponentAttr from "./CompAttr";
import ComponentEvent from "./CompEvent";
import ComponentStyle from "./CompStyle";
import { useComponentsStore } from "../../stores/components";

const Setting = () => {
    const [key, setKey] = useState(ESetting.attribution);

    const { curComponentId, curComponent } = useComponentsStore();

    return <div> {(curComponentId || curComponent) ? <>
        <Segmented block defaultValue={key} onChange={setKey} options={settingCols} />
        <div className="pt-[20px]">
            {key === ESetting.attribution && <ComponentAttr />}
            {key === ESetting.event && <ComponentEvent />}
            {key === ESetting.style && <ComponentStyle />}
        </div>
    </> : <></>}
    </div>
};

export default Setting;