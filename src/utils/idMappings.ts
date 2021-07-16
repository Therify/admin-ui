import { CompanyIds, CompanyMap, CompanyNames } from '../types/company';

export const getCompanyNameById = (id: string): CompanyNames | 'unknown company' => {
    return CompanyMap[id as CompanyIds] ?? 'unknown company';
};
