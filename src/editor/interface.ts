import { CSSProperties, PropsWithChildren } from 'react';

export interface CommonComponentProps extends PropsWithChildren {
    id: number,
    name: string,
    styles?: CSSProperties;
    [key: string]: any
}

export enum EMaterialAction {
    move,
    add
};

export interface IMaterialAction {
    type: string;
    dragType: EMaterialAction,
    id: number
}