import React, { useState } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { Box, withStyles, useTheme, Button, CircularProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Select, SelectOption, TextSmall, Divider, Text, Header1 } from '../core/';

import {
    GENDER_OPTIONS,
    STATES,
    RACE_OPTIONS,
    ISSUE_OPTIONS,
    THERAPEUTIC_PRACTICES,
    INSURANCE_OPTIONS,
    MatchTypes,
    Gender,
} from '../../../types/';
import { ChipSelectBox } from './ChipSelectBox';
import {
    validateEmail,
    validateRequired,
    validateWebsiteUrl,
    isChangesToProvider,
    validateArrayNotEmpty,
    isFormError,
} from './validators';

interface ProviderDataFormProps {
    provider: Partial<MatchTypes.Provider>;
    title?: string;
    subtitle?: string;
    isSubmitting: boolean;
    onSubmit: (provider: Partial<MatchTypes.Provider>) => Promise<void>;
}
const getOptions = (values: string[]) => values.map((value) => ({ value, text: value }));
const genderOptions: SelectOption[] = getOptions([...GENDER_OPTIONS]);

export const ProviderDataForm = ({ provider, title, subtitle, isSubmitting, onSubmit }: ProviderDataFormProps) => {
    const { spacing, palette, shape } = useTheme();
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailAddress, setEmailAddress] = useState(provider.emailAddress ?? '');
    const [firstName, setfirstName] = useState(provider.firstName ?? '');
    const [lastName, setLastName] = useState(provider.lastName ?? '');
    const [websiteUrl, setWebsiteUrl] = useState(provider.websiteUrl ?? '');
    const [nameOfPractice, setNameOfPractice] = useState(provider.nameOfPractice ?? '');
    const [gender, setGender] = useState(provider.gender ?? 'Male');
    const [rate, setRate] = useState(`${provider.rate}` ?? '0');
    const [yearsOfExperience, setYearsOfExperience] = useState(`${provider.yearsOfExperience}` ?? 0);
    const [license, setLicense] = useState(provider.license);
    const [licensedStates, setLicensedStates] = useState(provider.licensedStates ?? []);
    const [acceptedInsurance, setAcceptedInsurance] = useState(provider.acceptedInsurance ?? []);
    const [race, setRace] = useState(provider.race ?? []);
    const [specialties, setSpecialties] = useState(provider.specialties ?? []);
    const [therapeuticPractices, setTherapeuticPractices] = useState(provider.therapeuticPractices ?? []);
    const checkFormValidity = (errors: FormikErrors<Partial<MatchTypes.Provider>>) => {
        setIsFormValid(
            !isFormError(
                ...Object.values(errors),
                validateArrayNotEmpty({ list: race }),
                validateArrayNotEmpty({ list: therapeuticPractices }),
                validateArrayNotEmpty({ list: specialties }),
                validateArrayNotEmpty({ list: acceptedInsurance }),
                validateArrayNotEmpty({ list: licensedStates }),
            ),
        );
    };

    return (
        <Formik
            initialValues={provider}
            onSubmit={async () => {
                if (isNaN(parseInt(rate)) || isNaN(parseInt(yearsOfExperience))) {
                    throw new Error(`${isNaN(parseInt(rate)) ? 'Rate' : 'Years of experience'} must be a number`);
                }
                onSubmit({
                    emailAddress,
                    firstName,
                    lastName,
                    websiteUrl,
                    nameOfPractice,
                    gender,
                    rate: parseInt(rate),
                    yearsOfExperience: parseInt(yearsOfExperience),
                    license,
                    licensedStates,
                    acceptedInsurance,
                    race,
                    specialties,
                    therapeuticPractices,
                });
            }}
        >
            {({ touched, errors }) => (
                <Form
                    style={{
                        position: 'relative',
                        padding: spacing(4, 4, 2),
                        marginBottom: spacing(2),
                        maxWidth: '880px',
                        width: '100%',
                        margin: 'auto',
                        background: palette.background.paper,
                        borderRadius: shape.borderRadius,
                    }}
                >
                    <Box marginBottom={3}>
                        {subtitle && <Text>{subtitle}</Text>}
                        {title && <Header1>{title}</Header1>}
                    </Box>
                    <Box
                        style={{
                            pointerEvents: isSubmitting ? 'none' : undefined,
                        }}
                    >
                        <FormSection>
                            <>
                                <Box style={{ display: 'flex', margin: 0 }}>
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        validate={() => validateRequired({ fieldName: 'First name', val: firstName })}
                                        name="firstName"
                                        type="text"
                                        label="First Name"
                                        value={firstName}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                            setfirstName(ev.target.value)
                                        }
                                        style={{ display: 'flex', flexGrow: 1 }}
                                    />
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        name="lastName"
                                        type="text"
                                        label="Last Name"
                                        value={lastName}
                                        validate={() => validateRequired({ fieldName: 'Last name', val: lastName })}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                            setLastName(ev.target.value)
                                        }
                                        style={{ display: 'flex', flexGrow: 1, marginLeft: spacing(2) }}
                                    />
                                </Box>
                                <Field
                                    variant="outlined"
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                    validate={() => validateEmail(emailAddress)}
                                    value={emailAddress}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        setEmailAddress(ev.target.value)
                                    }
                                />

                                <Field
                                    variant="outlined"
                                    component={TextField}
                                    name="websiteUrl"
                                    type="text"
                                    label="Website Url"
                                    value={websiteUrl ?? ''}
                                    validate={() => validateWebsiteUrl({ websiteUrl, isRequired: true })}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        setWebsiteUrl(ev.target.value)
                                    }
                                />
                                <Field
                                    variant="outlined"
                                    component={TextField}
                                    name="nameOfPractice"
                                    type="text"
                                    label="Name of Practice"
                                    value={nameOfPractice ?? ''}
                                    validate={() =>
                                        validateRequired({
                                            fieldName: 'Name of practice',
                                            val: nameOfPractice,
                                        })
                                    }
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                        setNameOfPractice(ev.target.value)
                                    }
                                />
                                <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                                    <Box marginRight={2}>
                                        <TextSmall>Gender</TextSmall>
                                        <Select
                                            name="gender"
                                            options={genderOptions}
                                            selectedValue={gender}
                                            onChange={(value) => {
                                                setGender(value as Gender);
                                                checkFormValidity(errors);
                                            }}
                                        />
                                    </Box>
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        name="yearsOfExperience"
                                        type="number"
                                        label="Years Of Experience"
                                        value={yearsOfExperience}
                                        validate={() =>
                                            validateRequired({
                                                fieldName: 'Years of experienece',
                                                val: yearsOfExperience,
                                            })
                                        }
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                            setYearsOfExperience(ev.target.value)
                                        }
                                        style={{ marginRight: spacing(2) }}
                                    />
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        name="rate"
                                        type="number"
                                        label="Rate"
                                        value={rate}
                                        validate={() => validateRequired({ fieldName: 'Rate', val: rate })}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setRate(ev.target.value)}
                                        style={{ marginRight: spacing(2) }}
                                    />
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        name="license"
                                        type="text"
                                        label="License"
                                        value={license}
                                        validate={() =>
                                            validateRequired({
                                                fieldName: 'License',
                                                val: license,
                                            })
                                        }
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                            setLicense(ev.target.value)
                                        }
                                    />
                                </Box>
                                <Divider margin={spacing(0, 0, 2, 0)} />
                            </>
                        </FormSection>
                        <Box marginBottom={2}>
                            <Text>Race</Text>
                            <ChipSelectBox
                                placeholder="Select race"
                                chips={race.sort()}
                                autoSelectList={[...RACE_OPTIONS]}
                                validate={() => validateArrayNotEmpty({ list: race, fieldName: 'Race' })}
                                onListChange={(race: string[]) => {
                                    setRace(race);
                                    checkFormValidity(errors);
                                }}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Licensed States</Text>
                            <ChipSelectBox
                                chips={licensedStates.sort()}
                                autoSelectList={[...STATES]}
                                placeholder="Select state"
                                validate={() =>
                                    validateArrayNotEmpty({ list: licensedStates, fieldName: 'Licensed States' })
                                }
                                onListChange={(states: string[]) => {
                                    setLicensedStates(states);
                                    checkFormValidity(errors);
                                }}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Accepted Insurance</Text>
                            <ChipSelectBox
                                placeholder="Select insurance"
                                chips={acceptedInsurance.sort()}
                                autoSelectList={[...INSURANCE_OPTIONS]}
                                validate={() =>
                                    validateArrayNotEmpty({
                                        list: acceptedInsurance,
                                        fieldName: 'Accepted Insurances',
                                    })
                                }
                                onListChange={(insurances: string[]) => {
                                    setAcceptedInsurance(insurances);
                                    checkFormValidity(errors);
                                }}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Specialties</Text>
                            <ChipSelectBox
                                placeholder="Select specialty"
                                chips={specialties.sort()}
                                autoSelectList={[...ISSUE_OPTIONS]}
                                validate={() => validateArrayNotEmpty({ list: specialties, fieldName: 'Specialties' })}
                                onListChange={(specialty: string[]) => {
                                    setSpecialties(specialty);
                                    checkFormValidity(errors);
                                }}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Theraputic Practices</Text>
                            <ChipSelectBox
                                placeholder="Select practice"
                                chips={therapeuticPractices.sort()}
                                autoSelectList={[...THERAPEUTIC_PRACTICES]}
                                validate={() => {
                                    checkFormValidity(errors);
                                    return validateArrayNotEmpty({
                                        list: therapeuticPractices,
                                        fieldName: 'Therapeutic Practices',
                                    });
                                }}
                                onListChange={(practices: string[]) => setTherapeuticPractices(practices)}
                            />
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                disabled={
                                    Object.keys(touched).length === 0 ||
                                    !isFormValid ||
                                    !isChangesToProvider(provider, {
                                        ...provider,
                                        emailAddress,
                                        firstName,
                                        lastName,
                                        websiteUrl,
                                        nameOfPractice,
                                        gender,
                                        rate,
                                        yearsOfExperience,
                                        license,
                                        licensedStates,
                                        acceptedInsurance,
                                        race,
                                        specialties,
                                        therapeuticPractices,
                                    })
                                }
                                color="primary"
                                variant="contained"
                                type="submit"
                                style={{ margin: spacing(4, 0), paddingLeft: spacing(4), paddingRight: spacing(4) }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                    {isSubmitting && <Loader />}
                </Form>
            )}
        </Formik>
    );
};

const Loader = () => (
    <Box
        height="100%"
        width="100%"
        position="absolute"
        zIndex={1000}
        display="flex"
        alignItems="center"
        justifyContent="center"
        top="0"
        left="0"
        style={{ background: 'rgba(255,255,255,.7)' }}
    >
        <CircularProgress color="primary" />
    </Box>
);

const FormSection = withStyles(({ spacing }) => ({
    root: {
        '& div': {
            marginBottom: spacing(2),
            display: 'block',
            boxSizing: 'border-box',
            '& input': {
                width: '100%',
            },
        },
    },
}))(Box);
