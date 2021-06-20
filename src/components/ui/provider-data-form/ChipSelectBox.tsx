import React from 'react';
import { Box, withStyles, IconButton, Button, TextField } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import { useTheme } from '@material-ui/core';
import { TextSmall } from '../core';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';

interface ChipSelectBoxProps {
    onListChange: (item: string[]) => void;
    chips: string[];
    autoSelectList: string[];
    placeholder?: string;
}

export const ChipSelectBox = ({ chips, onListChange, autoSelectList, placeholder }: ChipSelectBoxProps) => {
    const { palette, spacing } = useTheme();
    const [isInputOpened, setIsInputOpened] = useState(false);
    const addItem = (item: string | null) => {
        if (item === null || chips.includes(item)) return;
        onListChange([...chips, item]);
    };
    const removeItem = (item: string | null) => {
        if (item === null) return;
        onListChange(chips.filter((chip) => item !== chip));
    };
    return (
        <Box display="flex" flexWrap="wrap">
            {isInputOpened && (
                <Box display="flex">
                    <Autocomplete
                        data-testid="chip-select"
                        options={autoSelectList}
                        renderInput={(params) => <TextField {...params} label={placeholder} />}
                        style={{ minWidth: '200px' }}
                        onChange={(_, value) => addItem(value)}
                    />
                    <Button onClick={() => setIsInputOpened(false)}>
                        <Close />
                    </Button>
                </Box>
            )}
            {chips.map((chip) => (
                <Chip key={chip}>
                    <TextSmall>{chip}</TextSmall>
                    <IconButton
                        component="span"
                        aria-label="Remove item"
                        style={{ color: palette.primary.contrastText }}
                        onClick={() => removeItem(chip)}
                    >
                        <Close color="inherit" style={{ fontSize: spacing(2) }} />
                    </IconButton>
                </Chip>
            ))}
            {!isInputOpened && (
                <Button onClick={() => setIsInputOpened(true)}>
                    <Add />
                </Button>
            )}
        </Box>
    );
};

const Chip = withStyles(({ palette, spacing, shape }) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginRight: spacing(2),
        marginBottom: spacing(2),
        background: palette.secondary.main,
        padding: spacing(0.25, 0.25, 0.25, 1),
        borderRadius: shape.borderRadius,
        color: palette.secondary.contrastText,
    },
}))(Box);
