import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Alert as AlertUi, AlertTypes } from './Alert';

type AlertArgs = { message: string };
export const AlertInfo: Story<AlertArgs> = (args) => (
    <AlertUi
        type={AlertTypes.Info}
        positionY="top"
        positionX="left"
        message={args.message}
        autoHideDurationInMs={null}
    />
);
export const AlertSuccess: Story<AlertArgs> = (args) => (
    <AlertUi
        type={AlertTypes.Success}
        positionY="top"
        positionX="left"
        message={args.message}
        autoHideDurationInMs={null}
    />
);
export const AlertWarning: Story<AlertArgs> = (args) => (
    <AlertUi
        type={AlertTypes.Warning}
        positionY="top"
        positionX="left"
        message={args.message}
        autoHideDurationInMs={null}
    />
);
export const AlertError: Story<AlertArgs> = (args) => (
    <AlertUi
        type={AlertTypes.Error}
        positionY="top"
        positionX="left"
        message={args.message}
        autoHideDurationInMs={null}
    />
);
export const AlertAutoDismiss: Story<AlertArgs> = (args) => (
    <AlertUi type={AlertTypes.Error} positionY="top" positionX="left" message={args.message} />
);

export default {
    title: 'Ui/Alert',
    argTypes: {
        message: { control: 'text' },
    },
} as Meta;

[AlertInfo, AlertError, AlertWarning, AlertSuccess, AlertAutoDismiss].forEach((el) => {
    el.bind({});
    el.args = {
        message: 'The quick brown fox jumps over the lazy dog',
    };
});
