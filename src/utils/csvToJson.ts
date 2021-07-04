import csv from 'csvtojson';
import { MatchTypes } from '../types';

export const parseJsonAsProvider = (jsonProvider: Record<string, string>): MatchTypes.ProviderData => {
    const arrayKeys = ['licensedStates', 'acceptedInsurance', 'race', 'specialties', 'therapeuticPractices'];
    const numberKeys = ['yearsOfExperience', 'rate'];
    const stringKeys = ['emailAddress', 'firstName', 'lastName', 'license', 'websiteUrl', 'nameOfPractice', 'gender'];
    return Object.fromEntries(
        Object.entries(jsonProvider)
            .filter(([key]) => [...arrayKeys, ...numberKeys, ...stringKeys].includes(key))
            .map(([key, val]) => {
                if (arrayKeys.includes(key)) {
                    return [
                        key,
                        val
                            .split(',')
                            .map((v) => v.trim())
                            .filter(Boolean),
                    ];
                } else if (numberKeys.includes(key)) {
                    return [key, Number(val)];
                }
                return [key, val];
            }),
    );
};

export const convertCsvToProviders = async (csvString: string): Promise<MatchTypes.ProviderData[]> => {
    const results = await csv().fromString(csvString);
    return results.map(parseJsonAsProvider);
};
