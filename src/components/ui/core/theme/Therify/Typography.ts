import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export enum TherifyFontSizes {
    Xxl = '4Rem',
    Xl = '2.5rem',
    Lg = '2rem',
    Md = '1.5rem',
    Base = '1rem',
    Sm = '.875rem',
}

// Poppins is Sofia Pro alternate
export const therifyTypography: TypographyOptions = {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
        fontSize: TherifyFontSizes.Xl,
        fontWeight: 700,
        marginBotttom: TherifyFontSizes.Xl,
    },
    h2: {
        fontSize: TherifyFontSizes.Lg,
        fontWeight: 700,
        marginBotttom: TherifyFontSizes.Xl,
    },
    h3: {
        fontSize: TherifyFontSizes.Md,
        fontWeight: 700,
        marginBotttom: TherifyFontSizes.Lg,
    },
    body1: {
        fontSize: TherifyFontSizes.Base,
        fontWeight: 400,
    },
    body2: {
        fontSize: TherifyFontSizes.Sm,
        fontWeight: 300,
    },
};
