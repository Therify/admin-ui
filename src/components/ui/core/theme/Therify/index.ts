import { createMuiTheme } from '@material-ui/core';
import { therifyglobals } from './Globals';
import { therifyPalette } from './Pallete';
import { therifyShape } from './Shape';
import { therifyTypography } from './Typography';

export const therifyTheme = createMuiTheme({
    palette: therifyPalette,
    typography: therifyTypography,
    overrides: therifyglobals,
    props: {
        MuiSelect: {
            color: 'secondary',
        },
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    shape: therifyShape,
});
