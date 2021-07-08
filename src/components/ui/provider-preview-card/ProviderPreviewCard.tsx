import React, { useEffect, useState } from 'react';
import { Box, Card, IconButton, Link, Theme, useTheme, withStyles } from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    CheckCircle,
    Close,
} from '@material-ui/icons';
import { TextSmall, Header6, TextBold } from '../core';
import { MatchTypes } from '../../../types';
import { Divider } from '../core/divider/Divider.stories';
import { getProviderDataErrors } from '../provider-data-form/validators';

type ProviderPreviewCardProps = {
    providerData: MatchTypes.ProviderData;
    onEdit: () => void;
    onDelete: () => void;
};

export const ProviderPreviewCard = ({ providerData, onEdit, onDelete }: ProviderPreviewCardProps) => {
    const theme = useTheme();
    const [fieldErrors, setFieldErrors] = useState(getProviderDataErrors(providerData));
    const {
        firstName,
        lastName,
        nameOfPractice,
        emailAddress,
        websiteUrl,
        yearsOfExperience,
        rate,
        license,
        gender,
        licensedStates,
        acceptedInsurance,
        race,
        specialties,
        therapeuticPractices,
    } = providerData;

    useEffect(() => {
        setFieldErrors(getProviderDataErrors(providerData));
    }, [
        firstName,
        lastName,
        nameOfPractice,
        emailAddress,
        websiteUrl,
        yearsOfExperience,
        rate,
        license,
        gender,
        JSON.stringify(licensedStates),
        JSON.stringify(acceptedInsurance),
        JSON.stringify(race),
        JSON.stringify(specialties),
        JSON.stringify(therapeuticPractices),
    ]);

    return (
        <ProviderCard style={{ margin: theme.spacing(2), padding: theme.spacing(2), width: '300px' }}>
            <EditDrawer display="flex" flexDirection="column" alignItems="flex-end">
                <Box display="flex">
                    {getProviderDataStatusIcon(providerData, theme)}
                    <IconButton>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>

                <IconButton onClick={onEdit} className="edit-icon" style={{ marginRight: theme.spacing(0.5) }}>
                    <EditIcon style={{ fontSize: theme.spacing(2) }} />
                </IconButton>
                <IconButton onClick={onDelete} className="edit-icon" style={{ marginRight: theme.spacing(0.5) }}>
                    <DeleteIcon style={{ fontSize: theme.spacing(2) }} />
                </IconButton>
            </EditDrawer>
            {fieldErrors.nameOfPractice ? (
                <ErrorText>{fieldErrors.nameOfPractice}</ErrorText>
            ) : (
                <TextSmall style={{ marginRight: theme.spacing(6) }}>{nameOfPractice}</TextSmall>
            )}
            {fieldErrors.firstName || fieldErrors.lastName ? (
                <TextBold style={{ color: theme.palette.error.main }}>
                    {fieldErrors.firstName ?? fieldErrors.lastName}
                </TextBold>
            ) : (
                <Header6>{`${firstName} ${lastName}`}</Header6>
            )}
            {fieldErrors.emailAddress ? (
                <ErrorText>{fieldErrors.emailAddress}</ErrorText>
            ) : (
                <TextSmall>{emailAddress}</TextSmall>
            )}
            {fieldErrors.websiteUrl ? (
                <ErrorText>{fieldErrors.websiteUrl}</ErrorText>
            ) : (
                <Link color="secondary" href={websiteUrl} target="_blank">
                    {websiteUrl}
                </Link>
            )}
            <Divider />
            <TextSmall>
                <b>Gender:</b>{' '}
                {fieldErrors.gender ? <span className="therify-field-error">{fieldErrors.gender}</span> : gender}
            </TextSmall>
            <Box display="flex" justifyContent="space-between">
                <TextSmall style={{ marginRight: theme.spacing(1) }}>
                    <b>YOE:</b>{' '}
                    {fieldErrors.yearsOfExperience ? (
                        <span className="therify-field-error">{fieldErrors.yearsOfExperience}</span>
                    ) : (
                        yearsOfExperience
                    )}
                </TextSmall>
                <TextSmall style={{ marginRight: theme.spacing(1) }}>
                    <b>Rate:</b> $
                    {fieldErrors.rate ? <span className="therify-field-error">{fieldErrors.rate}</span> : rate}
                </TextSmall>
                <TextSmall>
                    <b>License:</b>{' '}
                    {fieldErrors.license ? <span className="therify-field-error">{fieldErrors.license}</span> : license}
                </TextSmall>
            </Box>
            <TextSmall>
                <b>Race:</b>{' '}
                {fieldErrors.race ? <span className="therify-field-error">{fieldErrors.race}</span> : race.join(', ')}
            </TextSmall>
            <TextSmall>
                <b>States:</b>{' '}
                {fieldErrors.licensedStates ? (
                    <span className="therify-field-error">{fieldErrors.licensedStates}</span>
                ) : (
                    licensedStates.join(', ')
                )}
            </TextSmall>
            <TextSmall>
                <b>Insurance:</b>{' '}
                {fieldErrors.acceptedInsurance ? (
                    <span className="therify-field-error">{fieldErrors.acceptedInsurance}</span>
                ) : (
                    acceptedInsurance.join(', ')
                )}
            </TextSmall>
            <TextSmall>
                <b>Specialties:</b>{' '}
                {fieldErrors.specialties ? (
                    <span className="therify-field-error">{fieldErrors.specialties}</span>
                ) : (
                    specialties.join(', ')
                )}
            </TextSmall>
            <TextSmall>
                <b>Practices:</b>{' '}
                {fieldErrors.therapeuticPractices ? (
                    <span className="therify-field-error">{fieldErrors.therapeuticPractices}</span>
                ) : (
                    therapeuticPractices.join(', ')
                )}
            </TextSmall>
        </ProviderCard>
    );
};

const getProviderDataStatusIcon = (provider: MatchTypes.ProviderData, theme: Theme) => {
    const isValid = Object.values(getProviderDataErrors(provider)).every((val) => val === undefined);
    return isValid ? (
        <CheckCircle
            htmlColor={theme.palette.success.main}
            style={{ marginTop: theme.spacing(1.5), fontSize: theme.spacing(2.5) }}
        />
    ) : (
        <Close
            htmlColor={theme.palette.error.main}
            style={{ marginTop: theme.spacing(1.5), fontSize: theme.spacing(2.5) }}
        />
    );
};

const ProviderCard = withStyles(({ palette }) => ({
    root: {
        position: 'relative',
        '& b': {
            fontWeight: 500,
            color: palette.text.secondary,
        },
        '& .therify-field-error': {
            color: palette.error.main,
        },
    },
}))(Card);
const EditDrawer = withStyles(({ palette }) => ({
    root: {
        position: 'absolute',
        top: 0,
        right: 0,
        background: palette.background.paper,
        '&:hover': {
            '& .edit-icon': {
                display: 'block',
            },
        },
        '& .edit-icon': {
            display: 'none',
            '&:hover': {
                color: palette.primary.main,
            },
        },
    },
}))(Box);
const ErrorText = withStyles(({ palette }) => ({
    root: {
        color: palette.error.main,
    },
}))(TextSmall);
