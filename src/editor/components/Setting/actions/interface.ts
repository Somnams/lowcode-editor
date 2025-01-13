export enum EActions {
    goToLink,
    showTips,
    compMethods,
    customEvents
}
export type TGoToLinkConfig = { url: string };
export type TCustomEventsConfig = { code: string };
export type TCompMethodsConfig = { componentId: number, method: string };
export type TShowMessageConfig = { type: 'success' | 'error', text: string };


export type TSettingActionsConfig = TGoToLinkConfig | TShowMessageConfig | TCustomEventsConfig | TCompMethodsConfig;

export type ICommonConfig<T> = { type: EActions, config: T }

export interface ICommonActionsProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (params: ICommonConfig<T>) => void;
}