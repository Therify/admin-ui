import { CompanyIds, CompanyNames } from '../types/company';
import { getCompayNameById } from './idMappings';

describe('idMappings', () => {
    describe('getCompayNameById', () => {
        it("should return 'unknown' if unmatched id provided", () => {
            expect(getCompayNameById('blahblahblah' as CompanyIds)).toBe('unknown');
        });

        it('should return company name if recognized id', () => {
            expect(getCompayNameById(CompanyIds.Therify)).toBe(CompanyNames.Therify);
        });
    });
});
