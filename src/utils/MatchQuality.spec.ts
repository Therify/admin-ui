import { Mocks } from '../types';
import { getIncompatibleReasons, getPreferenceIssues } from './MatchQuality';

describe('MatchQuality helpers', () => {
    describe('getIncompatibleReasons', () => {
        it('should give incompatible reasons if states do not align', () => {
            const reasons = getIncompatibleReasons({
                user: Mocks.mockUser,
                provider: { ...Mocks.mockProvider, licensedStates: [] },
            });
            expect(reasons).toStrictEqual([`Cannot practice in ${Mocks.mockUser.stateOfResidence}`]);
        });

        it('should return undefined states align', () => {
            const reasons = getIncompatibleReasons({
                user: Mocks.mockUser,
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                },
            });
            expect(reasons).toBeUndefined();
        });
    });

    describe('getPreferenceIssues', () => {
        it('should return undefined if no misalignments', () => {
            const issues = getPreferenceIssues({
                user: Mocks.mockUser,
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                    race: [Mocks.mockUser.racePreference],
                    gender: Mocks.mockUser.genderPreference,
                    acceptedInsurance: [Mocks.mockUser.insuranceProvider],
                    specialties: Mocks.mockUser.issues,
                },
            });
            expect(issues).toBeUndefined();
        });

        it('should catch race preference issues', () => {
            const issues = getPreferenceIssues({
                user: Mocks.mockUser,
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                    race: [],
                    gender: Mocks.mockUser.genderPreference,
                    acceptedInsurance: [Mocks.mockUser.insuranceProvider],
                    specialties: Mocks.mockUser.issues,
                },
            });
            expect(issues).toStrictEqual([`Race: Not ${Mocks.mockUser.racePreference}`]);
        });

        it('should catch gender preference issues', () => {
            const issues = getPreferenceIssues({
                user: { ...Mocks.mockUser, genderPreference: 'Male' },
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                    race: [Mocks.mockUser.racePreference],
                    gender: 'Female',
                    acceptedInsurance: [Mocks.mockUser.insuranceProvider],
                    specialties: Mocks.mockUser.issues,
                },
            });
            expect(issues).toStrictEqual([`Gender: Not Male`]);
        });

        it('should catch out-of-network insurance issues', () => {
            const issues = getPreferenceIssues({
                user: { ...Mocks.mockUser, insuranceProvider: 'Cigna' },
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                    race: [Mocks.mockUser.racePreference],
                    gender: Mocks.mockUser.genderPreference,
                    acceptedInsurance: [],
                    specialties: Mocks.mockUser.issues,
                },
            });
            expect(issues).toStrictEqual(['Out of Network']);
        });

        it('should disregard out-of-network insurance issues when provider accepts out-of-network', () => {
            const issues = getPreferenceIssues({
                user: { ...Mocks.mockUser, insuranceProvider: 'Cigna' },
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                    race: [Mocks.mockUser.racePreference],
                    gender: Mocks.mockUser.genderPreference,
                    acceptedInsurance: ['Out of Network'],
                    specialties: Mocks.mockUser.issues,
                },
            });
            expect(issues).toBeUndefined();
        });

        it('should catch user.issues preferences issues', () => {
            const issues = getPreferenceIssues({
                user: { ...Mocks.mockUser, issues: ['ADHD', 'Stress'] },
                provider: {
                    ...Mocks.mockProvider,
                    licensedStates: [Mocks.mockUser.stateOfResidence],
                    race: [Mocks.mockUser.racePreference],
                    gender: Mocks.mockUser.genderPreference,
                    acceptedInsurance: [Mocks.mockUser.insuranceProvider],
                    specialties: [],
                },
            });
            expect(issues).toStrictEqual([`Doesn't treat ADHD, Stress`]);
        });
    });
});
