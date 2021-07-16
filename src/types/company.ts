export enum CompanyIds {
    'Therify' = '210266712266048',
    'Thumbtack' = '210438722173148',
    'CriticalMass' = '210438357319154',
    'Indeed' = '211955886693171',
}
export enum CompanyNames {
    'Therify' = 'Therify',
    'Thumbtack' = 'Thumbtack',
    'CriticalMass' = 'Critical Mass',
    'Indeed' = 'Indeed',
}
export const CompanyMap: Record<CompanyIds, CompanyNames> = {
    [CompanyIds.CriticalMass]: CompanyNames.CriticalMass,
    [CompanyIds.Indeed]: CompanyNames.Indeed,
    [CompanyIds.Therify]: CompanyNames.Therify,
    [CompanyIds.Thumbtack]: CompanyNames.Thumbtack,
};
