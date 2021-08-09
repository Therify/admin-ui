import { mockProvider } from '../types/mocks';
import {
    providerMatchesPractice,
    providerMatchesSearchTerm,
    providerMatchesGender,
    providerMatchesRace,
    providerMatchesInsurance,
    providerMatchesState,
    providerMatchesIssue,
} from './providerFilterConditions';

describe.only('providerFilterConditions', () => {
    describe('providerMatchesSearchTerm', () => {
        it('should return true if search is empty', () => {
            expect(providerMatchesSearchTerm('', mockProvider)).toBeTruthy();
        });
        it('should return false if search term is not in provider name', () => {
            expect(providerMatchesSearchTerm('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if search term is in provider name', () => {
            expect(providerMatchesSearchTerm(mockProvider.firstName, mockProvider)).toBeTruthy();
        });
    });

    describe('providerMatchesPractice', () => {
        it('should return true if no selection made', () => {
            expect(providerMatchesPractice('all', mockProvider)).toBeTruthy();
        });
        it('should return false if selection does not match provider', () => {
            expect(providerMatchesPractice('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if selection does match provider', () => {
            expect(providerMatchesPractice(mockProvider.nameOfPractice, mockProvider)).toBeTruthy();
        });
    });

    describe('providerMatchesGender', () => {
        it('should return true if no selection made', () => {
            expect(providerMatchesGender('any', mockProvider)).toBeTruthy();
        });
        it('should return false if selection does not match provider', () => {
            expect(providerMatchesGender('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if selection does match provider', () => {
            expect(providerMatchesGender(mockProvider.gender, mockProvider)).toBeTruthy();
        });
    });

    describe('providerMatchesRace', () => {
        it('should return true if no selection made', () => {
            expect(providerMatchesRace('any', mockProvider)).toBeTruthy();
        });
        it('should return false if selection does not match provider', () => {
            expect(providerMatchesRace('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if selection does match provider', () => {
            expect(providerMatchesRace(mockProvider.race[0], mockProvider)).toBeTruthy();
        });
    });

    describe('providerMatchesInsurance', () => {
        it('should return true if no selection made', () => {
            expect(providerMatchesInsurance('any', mockProvider)).toBeTruthy();
        });
        it('should return false if selection does not match provider', () => {
            expect(providerMatchesInsurance('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if selection does match provider', () => {
            expect(providerMatchesInsurance(mockProvider.acceptedInsurance[0], mockProvider)).toBeTruthy();
        });
    });

    describe('providerMatchesState', () => {
        it('should return true if no selection made', () => {
            expect(providerMatchesState('any', mockProvider)).toBeTruthy();
        });
        it('should return false if selection does not match provider', () => {
            expect(providerMatchesState('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if selection does match provider', () => {
            expect(providerMatchesState(mockProvider.licensedStates[0], mockProvider)).toBeTruthy();
        });
    });

    describe('providerMatchesIssue', () => {
        it('should return true if no selection made', () => {
            expect(providerMatchesIssue('any', mockProvider)).toBeTruthy();
        });
        it('should return false if selection does not match provider', () => {
            expect(providerMatchesIssue('@@@', mockProvider)).toBeFalsy();
        });
        it('should return true if selection does match provider', () => {
            expect(providerMatchesIssue(mockProvider.specialties[0], mockProvider)).toBeTruthy();
        });
    });
});
