export enum RankingModelFeature {
    STATE = 'State',
    INSURANCE = 'Insurance',
    SPECIALITIES = 'Specialities',
    EXPERIENCE_WITH_BLACK_CLIENTS = 'Experience with Black Clients',
    GENDER = 'GENDER',
    RACE = 'RACE',
    SOCIAL_MEDIA_PRESENCE = 'Social Media Presence',
}

export type RankingModelFeatureWeights = Record<RankingModelFeature, number>;

export const RANKING_MODEL_FEATURE_WEIGHTS: RankingModelFeatureWeights = {
    [RankingModelFeature.STATE]: 25,
    [RankingModelFeature.INSURANCE]: 20,
    [RankingModelFeature.EXPERIENCE_WITH_BLACK_CLIENTS]: 15,
    [RankingModelFeature.SPECIALITIES]: 15,
    [RankingModelFeature.GENDER]: 10,
    [RankingModelFeature.RACE]: 10,
    [RankingModelFeature.SOCIAL_MEDIA_PRESENCE]: 10,
};
