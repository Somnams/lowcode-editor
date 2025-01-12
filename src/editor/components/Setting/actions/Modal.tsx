import { Modal, Segmented } from "antd";
import { EActions, ICommonConfig, TGoToLinkConfig, TShowMessageConfig } from "./interface";
import GoToLink from "./GoToLink";
import ShowMessage from "./ShowMessage";
import { useMemo, useState } from "react";
import CustomEvents from "./CustomEvent";

interface IProps {
    visible: boolean;
    handleOk: (config: ICommonConfig<TGoToLinkConfig | TShowMessageConfig>) => void;
    handleCancel: () => void;
}

export const actionCols = [
    { label: 'open link', value: EActions.goToLink, Comp: GoToLink },
    { label: 'message', value: EActions.showTips, Comp: ShowMessage },
    { label: 'custom event', value: EActions.custom, Comp: CustomEvents },
];

const ActionModal = (props: IProps) => {
    const { visible, handleCancel, handleOk } = props;

    const [key, setKey] = useState(EActions.goToLink);
    const [config, setConfig] = useState<ICommonConfig<TGoToLinkConfig | TShowMessageConfig>>();

    const Comp = useMemo(() => {
        const comp = actionCols.find(a => a.value === key);
        return comp!.Comp;
    }, [key]);

    return <Modal
        open={visible}
        title="Events Configuration"
        width={800}
        okText="Add"
        cancelText="Cancel"
        onOk={() => handleOk(config!)}
        onCancel={handleCancel}
    >
        <Segmented options={actionCols} onChange={setKey} block value={key} />
        <Comp onChange={(c) => setConfig(c)} />
    </Modal>
};

export default ActionModal;
