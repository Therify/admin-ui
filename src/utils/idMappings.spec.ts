import { CompanyIds, CompanyNames } from '../types/company';
import { getCompayNameById } from './idMappings';

describe('idMappings', () => {
    describe('getCompayNameById', () => {
        it("should return 'unknown company' if unmatched id provided", () => {
            expect(getCompayNameById('blahblahblah' as CompanyIds)).toBe('unknown company');
        });

        it('should return company name if recognized id', () => {
            expect(getCompayNameById(CompanyIds.Therify)).toBe(CompanyNames.Therify);
        });
    });
});
