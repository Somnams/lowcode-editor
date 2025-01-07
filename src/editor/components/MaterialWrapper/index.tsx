import { Segmented } from "antd";
import { configCols, ESettings } from "./config";
import { useState } from "react";
import Outline from "./Outline";
import Source from "./Source";
import Material from "./Material";

const MaterialWrapper = () => {
    const [key, setKey] = useState(ESettings.material);

    return <div>
        <Segmented options={configCols} onChange={setKey} block value={key} />
        <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
            {key === ESettings.material && <Material />}
            {key === ESettings.outline && <Outline />}
            {key === ESettings.source && <Source />}
        </div>
    </div>
};

export default MaterialWrapper