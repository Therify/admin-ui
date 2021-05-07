export enum CompanyIds {
    'Therify' = '210266712266048',
    'Thumbtack' = '210438722173148',
    'CriticalMass' = '210438357319154',
}
export enum CompanyNames {
    'Therify' = 'Therify',
    'Thumbtack' = 'Thumbtack',
    'CriticalMass' = 'Critical Mass',
}
export const CompanyMap: Record<CompanyIds, CompanyNames> = {
    [CompanyIds.Therify]: CompanyNames.Therify,
    [CompanyIds.Thumbtack]: CompanyNames.Thumbtack,
    [CompanyIds.CriticalMass]: CompanyNames.CriticalMass,
};
