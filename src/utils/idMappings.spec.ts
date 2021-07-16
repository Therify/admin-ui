import { CompanyIds, CompanyNames } from '../types/company';
import { getCompanyNameById } from './idMappings';

describe('idMappings', () => {
    describe('getCompanyNameById', () => {
        it("should return 'unknown company' if unmatched id provided", () => {
            expect(getCompanyNameById('blahblahblah' as CompanyIds)).toBe('unknown company');
        });

        it('should return company name if recognized id', () => {
            expect(getCompanyNameById(CompanyIds.Therify)).toBe(CompanyNames.Therify);
        });
    });
});
