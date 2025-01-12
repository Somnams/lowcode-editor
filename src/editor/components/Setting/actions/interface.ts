export enum EActions {
    goToLink,
    showTips,
    custom
}
export type TShowMessageConfig = { type: 'success' | 'error', text: string };
export type TGoToLinkConfig = { url: string };

export type ICommonConfig<T> = { type: EActions, config: T }

export interface ICommonActionsProps<T> {
    defaultValue?: T;
    onChange?: (params: ICommonConfig<T>) => void;
}