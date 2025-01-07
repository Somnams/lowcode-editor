export enum ESettings {
    material = 1,
    outline = 2,
    source = 3
}

export const configCols = [
    {
        label: 'Material',
        value: ESettings.material
    }, {
        label: 'Outline',
        value: ESettings.outline
    }, {
        label: 'Source',
        value: ESettings.source
    },
];