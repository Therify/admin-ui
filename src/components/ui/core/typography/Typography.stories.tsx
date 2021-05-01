import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
    Headline as HeadlineUi,
    Header1 as Header1Ui,
    Header2 as Header2Ui,
    Header3 as Header3Ui,
    TextBold as TextBoldUi,
    Text as TextUi,
    TextSmall as TextSmallUi,
} from './Typography';

type TypographyArgs = { text: string };
export const Headline: Story<TypographyArgs> = (args) => <HeadlineUi>{args.text}</HeadlineUi>;
export const Title1: Story<TypographyArgs> = (args) => <Header1Ui>{args.text}</Header1Ui>;
export const Title2: Story<TypographyArgs> = (args) => <Header2Ui>{args.text}</Header2Ui>;
export const Title3: Story<TypographyArgs> = (args) => <Header3Ui>{args.text}</Header3Ui>;
export const TextStrong: Story<TypographyArgs> = (args) => <TextBoldUi>{args.text}</TextBoldUi>;
export const Text: Story<TypographyArgs> = (args) => <TextUi>{args.text}</TextUi>;
export const TextSmall: Story<TypographyArgs> = (args) => <TextSmallUi>{args.text}</TextSmallUi>;

export default {
    title: 'Core/Typography',
    argTypes: {
        text: { control: 'text' },
    },
} as Meta;

[Headline, Title1, Title2, Title3, TextStrong, Text, TextSmall].map((el) => {
    el.bind({});
    return (el.args = {
        text: 'The quick brown fox jumps over the lazy dog',
    });
});
