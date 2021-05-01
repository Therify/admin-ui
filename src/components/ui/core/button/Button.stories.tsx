import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ButtonFill, ButtonOutline, SuccessButton as SuccessButtonUi } from './Button';

export const Button: Story = () => <ButtonFill>Click Me!</ButtonFill>;
export const OutlineButton: Story = () => <ButtonOutline>Click Me!</ButtonOutline>;
export const SuccessButton: Story = () => <SuccessButtonUi>Click Me!</SuccessButtonUi>;

export default {
    title: 'Core/Button',
} as Meta;
