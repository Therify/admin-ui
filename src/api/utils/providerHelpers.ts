import { MatchTypes } from '../../types';
const sortByLastName = (providers: MatchTypes.Provider[]) =>
    providers.sort((a, b) => (a.lastName?.toLowerCase() > b.lastName?.toLowerCase() ? 1 : -1));

export const sortByNameOfPractice = (providers: MatchTypes.Provider[]) => {
    const providersByNameOfPractice = providers.reduce<Record<string, MatchTypes.Provider[]>>(
        (providersByNameOfPractice, provider) => {
            if (provider.nameOfPractice === undefined) {
                providersByNameOfPractice['No Practice Name'] = sortByLastName([
                    ...(providersByNameOfPractice['No Practice Name'] ?? []),
                    provider,
                ]);
            } else {
                providersByNameOfPractice[provider.nameOfPractice] = sortByLastName([
                    ...(providersByNameOfPractice[provider.nameOfPractice] ?? []),
                    provider,
                ]);
            }
            return providersByNameOfPractice;
        },
        {},
    );
    const sortedPractices = Object.keys(providersByNameOfPractice).sort();
    return sortedPractices.reduce<MatchTypes.Provider[]>((providers, practiceName) => {
        return [...providers, ...providersByNameOfPractice[practiceName]];
    }, []);
};

export const ensureProviderArrayTypes = (provider: MatchTypes.Provider): MatchTypes.Provider => {
    const {
        licensedStates = [],
        acceptedInsurance = [],
        race = [],
        specialties = [],
        therapeuticPractices = [],
    } = provider;
    if (
        !Array.isArray(licensedStates) ||
        !Array.isArray(acceptedInsurance) ||
        !Array.isArray(race) ||
        !Array.isArray(specialties) ||
        !Array.isArray(therapeuticPractices)
    ) {
        console.log({ ProviderWithoutArray: provider });
    }
    return {
        ...provider,
        licensedStates: Array.isArray(licensedStates) ? licensedStates : Object.values(licensedStates),
        acceptedInsurance: Array.isArray(acceptedInsurance) ? acceptedInsurance : Object.values(acceptedInsurance),
        race: Array.isArray(race) ? race : Object.values(race),
        specialties: Array.isArray(specialties) ? specialties : Object.values(specialties),
        therapeuticPractices: Array.isArray(therapeuticPractices)
            ? therapeuticPractices
            : Object.values(therapeuticPractices),
    };
};
