import { Form } from "antd";
import { useComponentsStore } from "../../stores/components";
import { ComponentSetter, useComponentsConfigStore } from "../../stores/component-config";
import { CSSProperties, useEffect, useState } from "react";
import CSSEditor from "./CssEditor";
import { debounce, includes } from "lodash-es";
import StyleToObject from "style-to-object";

const ComponentStyle = () => {
    const [form] = Form.useForm();
    const [defaultCss, setDefaultCss] = useState(`.comp{\n\n}`);
    const { curComponent, curComponentId, updateComponentStyles } = useComponentsStore();
    const { componentConfig } = useComponentsConfigStore();

    useEffect(() => {
        form.resetFields();

        const data = form.getFieldsValue();
        const props = Object.assign({}, data, curComponent?.styles);
        form.setFieldsValue(props);

        setDefaultCss(toCss(curComponent?.styles!));
    }, [curComponent]);

    const handleValueChange = (changedValues: CSSProperties) => {
        if (curComponentId) {
            updateComponentStyles(curComponentId, changedValues);
        }
    };

    const handleEditorChange = debounce((value) => {
        let css: any = {};
        try {
            const cssStr = value.replace(/\/\*.*\*\//g, '').replace(/(\.?[^{]+{)/, '').replace('}', '');
            StyleToObject(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
            });
            curComponentId && updateComponentStyles(curComponentId, css, true);
        } catch (error) {

        }
    }, 800);

    const toCss = (cssObj: Record<string, any>) => {
        let str = `.comp{\n`;
        for (let key in cssObj) {
            const v = cssObj[key] as string;
            if (!v) continue;
            if (['width', 'height'].includes(key) && !v.endsWith('px')) {
                str += `\t${key}: ${v}px;\n`;
            }
            str += `\t${key}: ${v};\n`;
        }
        str += '}';
        return str;
    };

    if (!curComponent) return <></>;

    return <Form form={form} onValuesChange={handleValueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        {
            componentConfig[curComponent.name]?.stylesSetter?.map((setter: ComponentSetter) => (
                <Form.Item key={setter.name} label={setter.label} name={setter.name}>
                    <setter.Comp {...setter.props} />
                </Form.Item>
            ))
        }
        <div className="h-[200px] border-[1px] border-[#ccc] pt-[20px]">
            <CSSEditor value={defaultCss} onChange={handleEditorChange} />
        </div>
    </Form>
};

export default ComponentStyle;