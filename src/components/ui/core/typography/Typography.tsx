import { Typography, TypographyProps } from '@material-ui/core';
import React from 'react';
import { TherifyFontSizes } from '../theme/Therify/Typography';

export const Headline = (props: TypographyProps) => (
    <Typography variant="h1" gutterBottom {...props} style={{ fontSize: TherifyFontSizes.Xxl }}>
        {props.children}
    </Typography>
);
export const Header1 = (props: TypographyProps) => (
    <Typography variant="h1" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Header2 = (props: TypographyProps) => (
    <Typography variant="h2" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Header3 = (props: TypographyProps) => (
    <Typography variant="h3" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Header4 = (props: TypographyProps) => (
    <Typography variant="h4" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Header5 = (props: TypographyProps) => (
    <Typography variant="h5" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Header6 = (props: TypographyProps) => (
    <Typography variant="h6" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Subtitle1 = (props: TypographyProps) => (
    <Typography variant="subtitle1" gutterBottom>
        {props.children}
    </Typography>
);
export const Subtitle2 = (props: TypographyProps) => (
    <Typography variant="subtitle2" gutterBottom>
        {props.children}
    </Typography>
);
export const TextBold = (props: TypographyProps) => (
    <Typography variant="body1" gutterBottom {...props} style={{ fontWeight: 700, ...(props.style ?? {}) }}>
        {props.children}
    </Typography>
);
export const Text = (props: TypographyProps) => (
    <Typography variant="body1" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const TextSmall = (props: TypographyProps) => (
    <Typography variant="body2" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const ButtonText = (props: TypographyProps) => (
    <Typography variant="button" display="block" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Caption = (props: TypographyProps) => (
    <Typography variant="caption" display="block" gutterBottom {...props}>
        {props.children}
    </Typography>
);
export const Overline = (props: TypographyProps) => (
    <Typography variant="overline" display="block" gutterBottom {...props}>
        {props.children}
    </Typography>
);
