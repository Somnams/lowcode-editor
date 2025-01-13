import { Select, TreeSelect } from "antd";
import { EActions, ICommonActionsProps, TCompMethodsConfig } from "./interface";
import { Component, getComponentById, useComponentsStore } from "../../../stores/components";
import { IComponentMethod, useComponentsConfigStore } from "../../../stores/component-config";
import { useEffect, useState } from "react";

const CompMethods = (props: ICommonActionsProps<TCompMethodsConfig>) => {
    const { value, onChange } = props;
    const { components, curComponentId } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    const [curId, setCurId] = useState<number>();
    const [curMethod, setCurMethod] = useState<string>();
    const [selectedComp, setSelectedComp] = useState<Component | null>();

    useEffect(() => {
        if (value) {
            setCurId(value.componentId);
            setCurMethod(value.method);
            setSelectedComp(getComponentById(value.componentId, components));
        }
    }, [value]);

    const handleCompChange = (val: number) => {
        if (!curComponentId) return;

        setCurId(val);
        setSelectedComp(getComponentById(val, components));
    };

    const handleCompMethodChange = (val: string) => {
        if (!curComponentId || !selectedComp) return;

        setCurMethod(val);
        onChange?.({ type: EActions.compMethods, config: { componentId: selectedComp.id, method: val } });
    };

    return <div className="mt-[40px]">
        <div className="flex items-center gap-[10px]">
            <div><b>Component</b></div>
            <div>
                <TreeSelect
                    style={{ width: 500 }}
                    treeData={components}
                    fieldNames={{ label: 'name', value: 'id' }}
                    value={curId}
                    onChange={handleCompChange}
                />
            </div>
        </div>
        {
            componentConfig[selectedComp?.name || ''] && <div className="flex items-center gap-[10px] mt-[20px]">
                <div>
                    <b>Method     </b>
                </div>
                <div>
                    <Select
                        style={{ width: 500 }}
                        options={componentConfig[selectedComp?.name || ''].methods?.map((m: IComponentMethod) => (
                            { label: m.label, value: m.name }
                        ))}
                        value={curMethod}
                        onChange={handleCompMethodChange}
                    />
                </div>
            </div>
        }
    </div>
};

export default CompMethods;