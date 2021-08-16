import React from 'react';
import { CallReceived, Schedule } from '@material-ui/icons';
import { Chip } from '@material-ui/core';
import { format, addBusinessDays } from 'date-fns';

const ICON_FONT_SIZE = '14px';

export interface DateChipProps {
    date: number | Date | string;
    type: 'received' | 'due';
}

const getIcon = (dateType: 'received' | 'due') => {
    switch (dateType) {
        case 'received':
            return <CallReceived style={{ fontSize: ICON_FONT_SIZE }} />;
        default:
            return <Schedule style={{ fontSize: ICON_FONT_SIZE }} />;
    }
};
export const DateChip = ({ type, date }: DateChipProps) => {
    const displayDate = type === 'due' ? addBusinessDays(new Date(date), 2) : new Date(date);
    return (
        <Chip
            title={type === 'due' ? 'Due Date' : 'Received date'}
            icon={getIcon(type)}
            label={format(displayDate, 'MM/dd')}
            color={type === 'due' ? 'primary' : undefined}
        />
    );
};
