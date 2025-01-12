import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../../interface';

const ButtonPreview = ({ type, text, styles, ...props }: Omit<CommonComponentProps, 'id'>) => {
    return <AntdButton type={type} style={styles} {...props}>{text}</AntdButton>
};

export default ButtonPreview;