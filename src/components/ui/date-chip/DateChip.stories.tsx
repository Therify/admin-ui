import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { subBusinessDays } from 'date-fns';
import { DateChip as DateChipUi, DateChipProps } from './DateChip';

export const ReceivedDateChip: Story<DateChipProps> = () => <DateChipUi type="received" date={new Date().getTime()} />;

export const DueDateChip: Story<DateChipProps> = () => <DateChipUi type="due" date={new Date().getTime()} />;

export const DueTodayDateChip: Story<DateChipProps> = () => (
    <DateChipUi type="due" date={subBusinessDays(new Date().getTime(), 2)} />
);

export default {
    title: 'Ui/DateChip',
} as Meta;
