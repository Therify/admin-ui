import { darken } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export enum TherifyBrandColors {
    Orange = '#E3AD72',
    Purple = '#6279B8',
    Black = '#363636',
    DarkGray = '#303030',
    White = '#FFFFFF',
    Offwhite = '#F5F5F5',
    Success = '#3DDC97',
    SuccessLight = '#ECFBF5',
    WarningLight = '#F9EEE1',
    Error = '#DB3A34',
    ErrorLight = '#FBEBEB',
}

export const therifyPalette: PaletteOptions = {
    primary: {
        main: TherifyBrandColors.Orange,
        dark: darken(TherifyBrandColors.Orange, 0.05),
        contrastText: TherifyBrandColors.White,
    },
    secondary: {
        main: TherifyBrandColors.Purple,
        contrastText: TherifyBrandColors.White,
    },
    text: {
        primary: TherifyBrandColors.Black,
    },
    success: {
        light: TherifyBrandColors.SuccessLight,
        main: TherifyBrandColors.Success,
        contrastText: TherifyBrandColors.White,
    },
    warning: {
        light: TherifyBrandColors.WarningLight,
        main: TherifyBrandColors.Orange,
    },
    error: {
        light: TherifyBrandColors.ErrorLight,
        main: TherifyBrandColors.Error,
    },
    background: {
        default: TherifyBrandColors.Offwhite,
        paper: TherifyBrandColors.White,
    },
};
