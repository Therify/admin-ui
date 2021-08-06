import { MatchTypes } from '../types';

export const providerMatchesSearchTerm = (searchTerm: string, provider: MatchTypes.Provider) => {
    return (
        searchTerm === '' ||
        `${provider.firstName} ${provider.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const providerMatchesPractice = (selectedPractice: string, provider: MatchTypes.Provider) =>
    selectedPractice === 'all' || provider.nameOfPractice === selectedPractice;

export const providerMatchesGender = (selectedGender: string, provider: MatchTypes.Provider) =>
    selectedGender === 'any' || selectedGender === provider.gender;

export const providerMatchesRace = (selectedRace: string, provider: MatchTypes.Provider) =>
    selectedRace === 'any' || provider.race.includes(selectedRace);

export const providerMatchesInsurance = (selectedInsurance: string, provider: MatchTypes.Provider) =>
    selectedInsurance === 'any' || provider.acceptedInsurance.includes(selectedInsurance);

export const providerMatchesState = (selectedState: string, provider: MatchTypes.Provider) =>
    selectedState === 'any' || provider.licensedStates.includes(selectedState);

export const providerMatchesIssue = (selectedIssue: string, provider: MatchTypes.Provider) =>
    selectedIssue === 'any' || provider.specialties.includes(selectedIssue);
