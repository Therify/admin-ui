export type Match = {
    user: User;
    matches: Ranking[];
};

export type User = {
    id: string;
    emailAddress: string;
    stateOfResidence: string;
    gender: string;
    genderPreference: string;
    race: string[];
    racePreference: string;
    issues: string[];
    insuranceProvider: string;
    languagePreference: string;
    createdAt: string;
    updatedAt: string;
};

export type Provider = {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    licensedStates: string[];
    acceptedInsurance: string[];
    yearsOfExperience: number;
    gender: string;
    race: string[];
    specialties: string[];
    theraputicPractices: string[];
    createdAt: string;
    updatedAt: string;
    rate: number;
    license?: string;
    websiteUrl?: string;
    nameOfPractice?: string;
};
export interface MatchPreferenceQualifier {
    preference: string | string[];
    isMet: boolean;
}

export type ProviderMatchRecord = {
    id: string;
    score: number;
    providerEmailAddress: string;
    userEmailAddress: string;
    criteria: Record<string, MatchPreferenceQualifier>;
};

export type Ranking = ProviderMatchRecord & {
    provider: Provider;
};

export enum RankingStatus {
    GOOD = 'good',
    WARNING = 'warning',
    INCOMPATIBLE = 'incompatible',
}
