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
