import deepEqual from 'deep-equal';
import { MatchTypes } from '../../../types';
export const isChangesToProvider = (original: Record<string, unknown>, current: Record<string, unknown>) => {
    return !deepEqual(original, current);
};
export const isFormError = (...args: (string | undefined)[]) => args.some((val) => val !== undefined);

export const validateRequired = ({ val, fieldName }: { val?: string | number; fieldName?: string }) => {
    let isValid = true;
    if (val === undefined) isValid = false;
    if (val === '') isValid = false;
    if (typeof val === 'number' && isNaN(val)) return `${fieldName ?? 'Field'} is not a number`;
    return isValid ? undefined : `${fieldName ?? 'Field'} is required`;
};

export const validateArrayNotEmpty = ({ list, fieldName }: { list: any[]; fieldName?: string }) =>
    list?.length > 0 ? undefined : `${fieldName ?? 'Field'} cannot be empty`;

export const validateWebsiteUrl = ({ websiteUrl, isRequired }: { websiteUrl: string; isRequired?: boolean }) => {
    let url;
    if (!websiteUrl) return isRequired ? 'Website is required' : undefined;
    try {
        url = new URL(websiteUrl);
    } catch (_) {
        return 'Invalid url';
    }
    return url.protocol === 'http:' || url.protocol === 'https:' ? undefined : 'Invalid url';
};

export const validateEmail = (emailAddress?: string) => {
    if (!emailAddress) return 'Email required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress)) {
        return 'Invalid email address';
    }
    return undefined;
};

export const getProviderDataErrors = (provider: MatchTypes.ProviderData) => ({
    firstName: validateRequired({ val: provider.firstName, fieldName: 'First name' }),
    lastName: validateRequired({ val: provider.lastName, fieldName: 'Last name' }),
    nameOfPractice: validateRequired({ val: provider.nameOfPractice, fieldName: 'Name of practice' }),
    emailAddress: validateEmail(provider.emailAddress),
    websiteUrl: validateWebsiteUrl({ websiteUrl: provider.websiteUrl, isRequired: true }),
    yearsOfExperience: validateRequired({ val: provider.yearsOfExperience, fieldName: 'Years of experience' }),
    rate: validateRequired({ val: provider.rate, fieldName: 'Rate' }),
    license: validateRequired({ val: provider.license, fieldName: 'License' }),
    gender: validateRequired({ val: provider.gender, fieldName: 'Gender' }),
    licensedStates: validateArrayNotEmpty({ list: provider.licensedStates, fieldName: 'Licensed states' }),
    acceptedInsurance: validateArrayNotEmpty({ list: provider.acceptedInsurance, fieldName: 'Accepted insurance' }),
    race: validateArrayNotEmpty({ list: provider.race, fieldName: 'Race' }),
    specialties: validateArrayNotEmpty({ list: provider.specialties, fieldName: 'Specialties' }),
    therapeuticPractices: validateArrayNotEmpty({
        list: provider.therapeuticPractices,
        fieldName: 'Therapeutic practices',
    }),
});
