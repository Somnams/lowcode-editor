import { Button as AntdButton } from 'antd';
import { CommonComponentProps, EMaterialAction, IMaterialAction } from '../../interface';
import { useDrag } from 'react-dnd';

const Button = ({ id, type, text, styles }: CommonComponentProps) => {
    const [_, drag] = useDrag({
        type: 'Button',
        item: {
            type: 'Button',
            dragType: EMaterialAction.move,
            id
        } as IMaterialAction
    });

    return <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>{text}</AntdButton>
};

export default Button;