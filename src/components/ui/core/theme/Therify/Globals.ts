import { Overrides } from '@material-ui/core/styles/overrides';
import { TherifyBrandColors } from './Pallete';

export const therifyglobals: Overrides = {
    MuiCssBaseline: {
        '@global': {
            html: {
                WebkitFontSmoothing: 'auto',
                boxSizing: 'border-box',
            },
            body: {
                color: TherifyBrandColors.Black,
            },
        },
    },
};
