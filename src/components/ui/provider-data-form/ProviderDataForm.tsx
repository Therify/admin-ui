import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, withStyles, useTheme, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Select, SelectOption, TextSmall, Divider, Text, Header1 } from '../core/';

import {
    GENDER_OPTIONS,
    STATES,
    RACE_OPTIONS,
    ISSUE_OPTIONS,
    THERAPEUTIC_PRACTICES,
    YEARS_OF_EXPERIENCE_OPTIONS,
    INSURANCE_OPTIONS,
    MatchTypes,
    Gender,
    YearsOfExperience,
} from '../../../types/';
import { ChipSelectBox } from './ChipSelectBox';

interface ProviderDataFormProps {
    provider: MatchTypes.Provider;
    isSubmitting: boolean;
    onSubmit: (provider: MatchTypes.Provider) => Promise<void>;
}
const getOptions = (values: string[]) => values.map((value) => ({ value, text: value }));
const genderOptions: SelectOption[] = getOptions([...GENDER_OPTIONS]);
const yearsOfExperienceOptions: SelectOption[] = getOptions([...YEARS_OF_EXPERIENCE_OPTIONS]);

export const ProviderDataForm = ({ provider, isSubmitting, onSubmit }: ProviderDataFormProps) => {
    const { spacing, palette, shape } = useTheme();
    const [emailAddress, setEmailAddress] = useState(provider.emailAddress);
    const [firstName, setfirstName] = useState(provider.firstName);
    const [lastName, setLastName] = useState(provider.lastName);
    const [websiteUrl, setWebsiteUrl] = useState(provider.websiteUrl);
    const [nameOfPractice, setNameOfPractice] = useState(provider.nameOfPractice);
    const [gender, setGender] = useState(provider.gender);
    const [rate, setRate] = useState(provider.rate);
    const [yearsOfExperience, setYearsOfExperience] = useState(provider.yearsOfExperience);
    const [license, setLicense] = useState(provider.license);

    const [licensedStates, setLicensedStates] = useState(provider.licensedStates);
    const [acceptedInsurance, setAcceptedInsurance] = useState(provider.acceptedInsurance);
    const [race, setRace] = useState(provider.race);
    const [specialties, setSpecialties] = useState(provider.specialties);
    const [theraputicPractices, setTheraputicPractices] = useState(provider.theraputicPractices);
    const validateWebsiteUrl = () => {
        let url;
        if (!websiteUrl) return undefined;
        try {
            url = new URL(websiteUrl);
        } catch (_) {
            return 'Invalid url';
        }
        return url.protocol === 'http:' || url.protocol === 'https:' ? undefined : 'Invalid url';
    };
    const validateEmail = () => {
        console.log({ emailAddress });
        if (!emailAddress) return 'Email required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress)) {
            return 'Invalid email address';
        }
        return undefined;
    };
    return (
        <Formik
            initialValues={provider}
            onSubmit={async () => {
                try {
                    await onSubmit({
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
                        theraputicPractices,
                    });
                } catch (e) {
                    console.log(e);
                }
            }}
        >
            {() => (
                <Form
                    style={{
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
                        <Text>{provider.nameOfPractice}</Text>
                        <Header1>{`${provider.firstName} ${provider.lastName}`}</Header1>
                    </Box>
                    <Box style={{ opacity: isSubmitting ? 0.5 : 1, pointerEvents: isSubmitting ? 'none' : undefined }}>
                        <FormSection>
                            <>
                                <Box style={{ display: 'flex', margin: 0 }}>
                                    <Field
                                        variant="outlined"
                                        component={TextField}
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
                                    validate={validateEmail}
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
                                    validate={validateWebsiteUrl}
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
                                            onChange={(value) => setGender(value as Gender)}
                                        />
                                    </Box>
                                    <Box marginRight={2}>
                                        <TextSmall>Years of Experience</TextSmall>
                                        <Select
                                            name="yearsOfExperience"
                                            options={yearsOfExperienceOptions}
                                            selectedValue={yearsOfExperience}
                                            onChange={(value) => setYearsOfExperience(value as YearsOfExperience)}
                                        />
                                    </Box>
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        name="rate"
                                        type="number"
                                        label="Rate"
                                        value={rate}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                            setRate(parseInt(ev.target.value))
                                        }
                                        style={{ marginRight: spacing(2) }}
                                    />
                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        name="license"
                                        type="text"
                                        label="License"
                                        value={license}
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
                                onListChange={(race: string[]) => setRace(race)}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Licensed States</Text>
                            <ChipSelectBox
                                chips={licensedStates.sort()}
                                autoSelectList={[...STATES]}
                                placeholder="Select state"
                                onListChange={(states: string[]) => setLicensedStates(states)}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Accepted Insurance</Text>
                            <ChipSelectBox
                                placeholder="Select insurance"
                                chips={acceptedInsurance.sort()}
                                autoSelectList={[...INSURANCE_OPTIONS]}
                                onListChange={(insurances: string[]) => setAcceptedInsurance(insurances)}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Specialties</Text>
                            <ChipSelectBox
                                placeholder="Select specialty"
                                chips={specialties.sort()}
                                autoSelectList={[...ISSUE_OPTIONS]}
                                onListChange={(specialty: string[]) => setSpecialties(specialty)}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <Text>Theraputic Practices</Text>
                            <ChipSelectBox
                                placeholder="Select practice"
                                chips={theraputicPractices.sort()}
                                autoSelectList={[...THERAPEUTIC_PRACTICES]}
                                onListChange={(practices: string[]) => setTheraputicPractices(practices)}
                            />
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                style={{ margin: spacing(4, 0), paddingLeft: spacing(4), paddingRight: spacing(4) }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

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
