import { Form, Input } from "antd";
import { useComponentsStore } from "../../stores/components";
import { ComponentConfig, ComponentSetter, useComponentsConfigStore } from "../../stores/component-config";
import { useEffect } from "react";

const ComponentAttr = () => {
    const [form] = Form.useForm();
    const { curComponent, curComponentId, updateComponent } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    useEffect(() => {
        const data = form.getFieldsValue();
        const props = Object.assign({}, data, curComponent?.props);
        form.setFieldsValue(props);
    }, [curComponent]);

    const handleValueChange = (changedValues: ComponentConfig) => {
        if (curComponentId) {
            updateComponent(curComponentId, changedValues);
        }
    };

    if (!curComponent) return <></>;

    return <Form form={form} onValuesChange={handleValueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        {
            [
                { label: 'Comp Id', value: curComponent.id },
                { label: 'Comp Name', value: curComponent.name },
                { label: 'Comp Desc', value: curComponent.desc }
            ].map(c => (
                <Form.Item label={c.label} key={c.value}>
                    <Input value={c.value} disabled />
                </Form.Item>
            ))
        }
        {
            componentConfig[curComponent.name]?.setter?.map((setter: ComponentSetter) => (
                <Form.Item label={setter.label} name={setter.name} key={setter.name}>
                    <setter.Comp {...setter.props} />
                </Form.Item>
            ))
        }
    </Form>
};

export default ComponentAttr;