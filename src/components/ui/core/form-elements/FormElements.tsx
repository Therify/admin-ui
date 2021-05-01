import React from 'react';
import {
    Checkbox as MuiCheckbox,
    CheckboxProps,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    TextField,
    useTheme,
    InputBaseComponentProps,
} from '@material-ui/core';

export const Checkbox = (props: CheckboxProps) => (
    <MuiCheckbox color="primary" {...props} style={{ padding: 0, ...(props.style ?? {}) }} />
);

export type SelectProps = {
    name?: string;
    id?: string;
    label?: string;
    options: SelectOption[];
    selectedValue: string;
    useNameInDisplay?: boolean;
    onChange: (selectedValue: string) => void;
};
export type SelectOption = {
    value: string;
    text: string;
    key?: string;
    ariaLabel?: string;
};
export const Select = ({ id, name, options, selectedValue, onChange, label }: SelectProps) => {
    const theme = useTheme();
    return (
        <FormControl variant="outlined" style={{ padding: 0 }}>
            {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
            <MuiSelect
                native
                value={selectedValue}
                inputProps={{
                    name,
                    id,
                    style: {
                        padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(1)}px`,
                    },
                }}
                onChange={(ev) => onChange(ev.target.value as string)}
                style={{
                    padding: theme.spacing(0.5),
                }}
            >
                {options.map(({ text, ariaLabel, key, value }) => (
                    <option aria-label={ariaLabel ?? text} key={key ?? value} value={value}>
                        {text}
                    </option>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export const Input = (props: { label: string } & InputBaseComponentProps) => {
    const theme = useTheme();
    return (
        <TextField
            variant="outlined"
            inputProps={{
                ...props,
                style: {
                    padding: theme.spacing(0.75, 1),
                    ...props.style,
                },
            }}
        />
    );
};
