import React from 'react';
import { Box, useTheme } from '@material-ui/core';

export type DividerProps = {
    margin?: string;
    color?: string;
    width?: string;
};
export const Divider = ({ margin, color, width }: DividerProps) => {
    const theme = useTheme();
    return (
        <Box
            margin={margin ?? theme.spacing(2, 0)}
            width={width ?? '100%'}
            height="1px"
            style={{ background: color ?? '#BABABA' }}
        />
    );
};
