import { Box } from '@material-ui/core';
import React from 'react';
import { Select, SelectOption } from '../../ui';

export type SelectConfig = {
    options: SelectOption[];
    id: string;
    name: string;
    selectedValue: string;
    useNameInDisplay?: boolean;
    label?: string;
    onChange: (selectedValue: string) => void;
};
export type SelectGroupProps = {
    configs: SelectConfig[];
};
export const SelectGroup = ({ configs }: SelectGroupProps) => {
    return (
        <Box>
            {configs.map(({ id, options, name, onChange, selectedValue }, i) => (
                <Box id={id} key={id} display="inline-block" marginRight={i === configs.length - 1 ? 0 : 0.5}>
                    <Select name={name} options={options} selectedValue={selectedValue} onChange={onChange} />
                </Box>
            ))}
        </Box>
    );
};
