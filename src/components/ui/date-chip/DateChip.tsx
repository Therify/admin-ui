import React from 'react';
import { CallReceived, Schedule, PriorityHigh } from '@material-ui/icons';
import { Chip, useTheme } from '@material-ui/core';
import { format, addBusinessDays, isToday, isAfter } from 'date-fns';

const ICON_FONT_SIZE = '14px';

export interface DateChipProps {
    date: number | Date;
    type: 'received' | 'due';
}

const getIcon = (dateType: 'received' | 'due', isDueToday: boolean) => {
    if (isDueToday) {
        return <PriorityHigh data-test-id="priority-high-icon" style={{ fontSize: ICON_FONT_SIZE }} />;
    }
    switch (dateType) {
        case 'received':
            return <CallReceived style={{ fontSize: ICON_FONT_SIZE }} />;
        default:
            return <Schedule style={{ fontSize: ICON_FONT_SIZE }} />;
    }
};
export const DateChip = ({ type, date }: DateChipProps) => {
    const displayDate = type === 'due' ? addBusinessDays(date, 2) : date;
    const isDueToday = type === 'due' && (isToday(displayDate) || isAfter(new Date(), displayDate));
    const { spacing, palette } = useTheme();
    return (
        <Chip
            title={type === 'due' ? 'Due Date' : 'Received date'}
            icon={getIcon(type, isDueToday)}
            label={format(displayDate, 'MM/dd')}
            color={type === 'due' ? 'primary' : undefined}
            style={{ marginRight: spacing(1), backgroundColor: isDueToday ? palette.error.main : undefined }}
        />
    );
};
