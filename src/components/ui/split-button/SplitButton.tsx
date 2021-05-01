import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useTheme } from '@material-ui/core';

export type SplitButtonOption = {
    value: string;
    text: string;
    isDisabled?: boolean;
};
export type SplitButtonProps = {
    onClick: (option: SplitButtonOption) => void;
    options: SplitButtonOption[];
};
export const SplitButton = ({ options, onClick }: SplitButtonProps) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const successButtonStyles = {
        background: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        fontSize: theme.spacing(1.75),
    };
    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" data-testid="splitbutton">
                <Button
                    onClick={() => onClick(options[selectedIndex])}
                    style={successButtonStyles}
                    data-testid="splitbutton-btn"
                >
                    {options[selectedIndex]?.text ?? 'Select an option'}
                </Button>
                <Button
                    style={successButtonStyles}
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    data-testid="splitbutton-options-btn"
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                data-testid="splitbutton-options"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option.value}
                                            disabled={option.isDisabled}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option.text}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};
