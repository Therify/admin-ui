import { CompanyIds } from './company';
import { Gender } from './types';
export type Match = {
    created: number;
    user: User;
    matches: Ranking[];
};

export type User = {
    id: string;
    companyId: CompanyIds;
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

export type ProviderRecord = {
    id: string;
    createdAt: string;
    updatedAt: string;
};
export type ProviderData = {
    emailAddress: string;
    firstName: string;
    lastName: string;
    license: string;
    websiteUrl: string;
    nameOfPractice: string;
    gender: Gender;
    yearsOfExperience: number;
    rate: number;
    licensedStates: string[];
    acceptedInsurance: string[];
    race: string[];
    specialties: string[];
    therapeuticPractices: string[];
};

export type Provider = ProviderRecord & ProviderData;
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
