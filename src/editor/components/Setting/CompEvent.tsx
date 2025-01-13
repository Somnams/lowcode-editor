import { Button, Collapse } from "antd";
import { useComponentsStore } from "../../stores/components";
import { IComponentEvent, useComponentsConfigStore } from "../../stores/component-config";
import { useMemo, useState } from "react";
import ActionModal from "./actions/Modal";
import { EActions, ICommonConfig, TGoToLinkConfig, TSettingActionsConfig, TShowMessageConfig } from "./actions/interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ComponentEvent = () => {
    const { componentConfig } = useComponentsConfigStore();
    const { curComponent, updateComponentProps, curComponentId } = useComponentsStore();

    const [actionsModalVisible, setActionsModalVisible] = useState(false);
    const [curEvent, setCurEvent] = useState<IComponentEvent>();
    const [curAction, setCurAction] = useState<ICommonConfig<TSettingActionsConfig>>();
    const [curActionIndex, setCurActionIndex] = useState<number>();

    if (!curComponent) return <></>;

    const handleDeleteAction = (event: IComponentEvent, index: number) => {
        if (!curComponentId) return;

        const actions = curComponent.props[event.name]?.actions;

        actions.splice(index, 1);

        updateComponentProps(curComponentId, {
            [event.name]: { actions }
        })
    };

    const handleEditAction = (event: IComponentEvent, config: ICommonConfig<TSettingActionsConfig>, index: number) => {
        if (!curComponentId) return;

        setCurEvent(event);
        setCurAction(config);
        setCurActionIndex(index);
        setActionsModalVisible(true);
    };

    const defaultActiveKey = useMemo(() => {
        return componentConfig?.[curComponent.name]?.events?.map((i: any) => i.name)
    }, [componentConfig, curComponent]);

    const items = (componentConfig?.[curComponent.name]?.events || []).map((event: IComponentEvent) => ({
        key: event.name,
        label: <div className="flex justify-between leading-[30px]">
            {event.label}
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    setCurEvent(event);
                    setActionsModalVisible(true);
                }}
            >
                Add Events
            </Button>
        </div>,
        children: <div>
            {
                (curComponent.props?.[event.name]?.actions || []).map((c: any, index: number) => (
                    <div key={index}>
                        {
                            c.type === EActions.goToLink && <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                                <div className="text-[blue]">OPEN LINK</div>
                                <div>{(c as ICommonConfig<TGoToLinkConfig>).config.url}</div>
                                <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                    onClick={() => handleEditAction(event, c, index)}
                                >
                                    <EditOutlined />
                                </div>
                                <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                    onClick={() => handleDeleteAction(event, index)}
                                >
                                    <DeleteOutlined />
                                </div>
                            </div>
                        }
                        {
                            c.type === EActions.showTips && <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                                <div className="text-[blue]">SHOW MESSAGE</div>
                                <div>{(c as ICommonConfig<TShowMessageConfig>).config.type}</div>
                                <div>{(c as ICommonConfig<TShowMessageConfig>).config.text}</div>
                                <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                    onClick={() => handleEditAction(event, c, index)}
                                >
                                    <EditOutlined />
                                </div>
                                <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                    onClick={() => handleDeleteAction(event, index)}
                                >
                                    <DeleteOutlined />
                                </div>
                            </div>
                        }
                        {
                            c.type === EActions.customEvents && <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                                <div className="text-[blue]">CUSTOM JS EVENTS</div>
                                <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                    onClick={() => handleEditAction(event, c, index)}
                                >
                                    <EditOutlined />
                                </div>
                                <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                    onClick={() => handleDeleteAction(event, index)}
                                >
                                    <DeleteOutlined />
                                </div>
                            </div>
                        }
                        {
                            c.type === EActions.compMethods && <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                                <div className="text-[blue]">COMP METHODS</div>
                                <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                    onClick={() => handleEditAction(event, c, index)}
                                >
                                    <EditOutlined />
                                </div>
                                <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                    onClick={() => handleDeleteAction(event, index)}
                                >
                                    <DeleteOutlined />
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    }));

    const handleModalOk = (config: ICommonConfig<TSettingActionsConfig>) => {
        if (!config || !curEvent || !curComponent) return;

        if (curAction) {
            updateComponentProps(curComponent.id, {
                [curEvent.name]: {
                    actions: curComponent.props[curEvent.name]?.actions?.map((a: any, index: number) => {
                        return index === curActionIndex ? config : a;
                    })
                }
            });
        } else {
            updateComponentProps(curComponent.id, {
                [curEvent.name]: {
                    actions: [
                        ...(curComponent.props[curEvent.name]?.actions || []),
                        config
                    ]
                }
            });
        }
        setCurAction(undefined);
        setActionsModalVisible(false);
    };

    return <div className="px-[10px]">
        <Collapse className="mb-[10px]" items={items} defaultActiveKey={defaultActiveKey} />
        <ActionModal
            action={curAction}
            visible={actionsModalVisible}
            handleOk={handleModalOk}
            handleCancel={() => setActionsModalVisible(false)}
        />
    </div>
};

export default ComponentEvent;