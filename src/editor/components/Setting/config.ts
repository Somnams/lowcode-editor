export enum ESetting {
    attribution = 1,
    style = 2,
    event = 3
};

export const settingCols = [
    {
        label: 'Attributions',
        value: ESetting.attribution,
    }, {
        label: 'Styles',
        value: ESetting.style
    }, {
        label: 'Events',
        value: ESetting.event
    }
];
