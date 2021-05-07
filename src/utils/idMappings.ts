import { CompanyIds, CompanyNames } from '../types/company';

export const getCompayNameById = (id: string): CompanyNames | 'unknown' => {
    switch (id) {
        case CompanyIds.CriticalMass:
            return CompanyNames.CriticalMass;
        case CompanyIds.Therify:
            return CompanyNames.Therify;
        case CompanyIds.Thumbtack:
            return CompanyNames.Thumbtack;
        default:
            return 'unknown';
    }
};
