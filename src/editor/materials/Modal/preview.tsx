import { Modal } from "antd";
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from "react";
import { CommonComponentProps } from "../../interface";

export interface IMaterialModalRef {
    open: () => void;
    close: () => void;
}

const MaterialModalPreview: ForwardRefRenderFunction<IMaterialModalRef, Omit<CommonComponentProps, 'props'>> = (
    { children, title, onOk: onOkFromProps, onCancel: onCancelFromProps, styles }, ref
) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => {
        return {
            open: () => { setOpen(true) },
            close: () => { setOpen(false) }
        };
    }, [])
    return <Modal
        title={title}
        style={styles}
        open={open}
        destroyOnClose
        onCancel={() => {
            onCancelFromProps?.();
            setOpen(false);
        }}
        onOk={() => {
            onOkFromProps?.();
        }}
    >
        {children}
    </Modal>
};

export default forwardRef(MaterialModalPreview);
