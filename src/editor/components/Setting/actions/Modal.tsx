import { Modal, Segmented } from "antd";
import { EActions, ICommonConfig, TCustomEventsConfig, TGoToLinkConfig, TSettingActionsConfig, TShowMessageConfig } from "./interface";
import GoToLink from "./GoToLink";
import ShowMessage from "./ShowMessage";
import { useEffect, useMemo, useState } from "react";
import CustomEvents from "./CustomEvent";

interface IProps {
    visible: boolean;
    handleOk: (config: ICommonConfig<TSettingActionsConfig>) => void;
    handleCancel: () => void;
    action?: ICommonConfig<TSettingActionsConfig>
}

export const actionCols = [
    { label: 'open link', value: EActions.goToLink, Comp: GoToLink },
    { label: 'message', value: EActions.showTips, Comp: ShowMessage },
    { label: 'custom event', value: EActions.customEvents, Comp: CustomEvents },
];

const ActionModal = (props: IProps) => {
    const { visible, handleCancel, handleOk, action } = props;

    const [key, setKey] = useState(EActions.goToLink);
    const [config, setConfig] = useState<ICommonConfig<TGoToLinkConfig | TShowMessageConfig | TCustomEventsConfig>>();

    const Comp = useMemo(() => {
        const comp = actionCols.find(a => a.value === key);
        return comp!.Comp;
    }, [key]);

    useEffect(() => {
        if (action?.type) {
            setKey(action.type);
        }
    }, [action]);

    return <Modal
        open={visible}
        title="Events Configuration"
        width={800}
        okText={action ? 'Modify' : 'Add'}
        cancelText="Cancel"
        onOk={() => handleOk(config!)}
        onCancel={handleCancel}
    >
        <Segmented options={actionCols} onChange={setKey} block value={key} />
        <Comp value={(action?.config || {}) as any} onChange={(c) => setConfig(c)} />
    </Modal>
};

export default ActionModal;
