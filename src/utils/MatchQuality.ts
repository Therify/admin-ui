import { MatchTypes } from '../types';

type MatchQualityOptions = {
    user: MatchTypes.User;
    provider: MatchTypes.Provider;
};
export type MatchCompatibilityStatus = {
    status: MatchTypes.RankingStatus;
    reasons?: string[];
};

export const getIncompatibleReasons = ({ user, provider }: MatchQualityOptions) => {
    const incompatibleReasons = [];
    if (!provider.licensedStates.includes(user.stateOfResidence)) {
        incompatibleReasons.push(`Cannot practice in ${user.stateOfResidence}`);
    }
    return incompatibleReasons.length ? incompatibleReasons : undefined;
};

const noPreference = (preference: string) => preference === "Don't Care";

export const getPreferenceIssues = ({ user, provider }: MatchQualityOptions) => {
    const { racePreference, genderPreference, issues, insuranceProvider } = user;
    const { acceptedInsurance, race: providerRace, gender: providerGender, specialties } = provider;
    const hasInsurance = insuranceProvider !== "I don't have insurance";
    const isInNetwork = hasInsurance && acceptedInsurance.includes(insuranceProvider);
    const providerAcceptsOutOfNetwork = acceptedInsurance.includes('Out of Network');
    const preferenceIssues = [];
    if (!providerRace.includes(racePreference) && !noPreference(racePreference)) {
        preferenceIssues.push(`Race: Not ${racePreference}`);
    }
    if (providerGender !== genderPreference && !noPreference(genderPreference)) {
        preferenceIssues.push(`Gender: Not ${genderPreference}`);
    }
    if (!isInNetwork && !providerAcceptsOutOfNetwork) {
        preferenceIssues.push('Out of Network');
    }
    const specialtyMismatches = issues.filter((issue) => !specialties.includes(issue));
    if (specialtyMismatches.length) {
        preferenceIssues.push(`Doesn't treat ${specialtyMismatches.join(', ')}`);
    }
    return preferenceIssues.length ? preferenceIssues : undefined;
};

export const generatePreferenceString = (user: MatchTypes.User) => {
    const { racePreference, genderPreference, issues } = user;

    const race = noPreference(racePreference) ? '' : racePreference;
    const gender = noPreference(genderPreference) ? '' : genderPreference;
    const noun = `${race} ${gender} providers`.trim();
    // TODO add 'or' to last issue
    return `User prefers ${noun} who specialize in ${issues.join(', ') || 'anything'}`;
};

export const getProviderToUserCompatability = (combination: MatchQualityOptions): MatchCompatibilityStatus => {
    let status = MatchTypes.RankingStatus.GOOD;
    const incompatibleReasons = getIncompatibleReasons(combination);
    const preferenceIssues = getPreferenceIssues(combination);
    if (incompatibleReasons) status = MatchTypes.RankingStatus.INCOMPATIBLE;
    else if (preferenceIssues) status = MatchTypes.RankingStatus.WARNING;
    return {
        status,
        reasons: incompatibleReasons ?? preferenceIssues,
    };
};

export const countMatchQualities = (matches: MatchTypes.Match[]) => {
    let good = 0;
    let warnings = 0;
    let incompatibilities = 0;
    for (const match of matches) {
        const statuses = match.matches.map((ranking) => {
            const { status } = getProviderToUserCompatability({
                user: match.user,
                provider: ranking.provider,
            });
            return status;
        });
        if (statuses.includes(MatchTypes.RankingStatus.INCOMPATIBLE)) incompatibilities += 1;
        else if (statuses.includes(MatchTypes.RankingStatus.WARNING)) warnings += 1;
        else good += 1;
    }
    return {
        total: matches.length,
        good,
        warnings,
        incompatibilities,
    };
};
