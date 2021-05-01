import { MatchApiTypes } from '../../types';
import { adaptApiMatches } from './matchesHelpers';
const mockApiResults: MatchApiTypes.GetMatchesResponse[] = [
    {
        userEmailAddress: 'warrendsadler@gmail.com',
        modified: '2021-04-24T19:47:40.115Z',
        providerEmailAddress: 'warren@therify.co',
        score: 45,
        ttl: 39,
        SK: 'MATCH#dc97ec41-f0b6-4524-bd84-93bf727a4954',
        PK: 'MATCH#dc97ec41-f0b6-4524-bd84-93bf727a4954',
        entity: 'Match',
        created: '2021-04-24T19:47:40.115Z',
        criteria: {
            insurance: {
                preference: 'Aetna',
                isMet: false,
            },
            stateOfResidence: {
                preference: 'California',
                isMet: true,
            },
            race: {
                preference: 'Black or African American',
                isMet: true,
            },
            gender: {
                preference: 'Male',
                isMet: true,
            },
            issues: {
                preference: ['Life Transitions', 'Pregnancy, Prenatal, or Postpartum Issues'],
                isMet: false,
            },
        },
        type: MatchApiTypes.ResponseType.Match,
    },
    {
        modified: '2021-04-24T19:47:40.118Z',
        ttl: 39,
        SK: 'PROVIDER#773748a1-6367-4d3b-8393-a5019ae41bf7',
        details: {
            lastName: 'Sadler',
            licensedStates: ['California'],
            race: ['Black or African American'],
            gender: 'Male',
            therapeuticPractices: [],
            nameOfPractice: 'Therify',
            firstName: 'Warren',
            license: 'Therify',
            createdAt: '',
            emailAddress: 'warren@therify.co',
            specialties: ['ADHD'],
            websiteUrl: 'http://www.therify.co',
            yearsOfExperience: 0,
            rate: 200,
            acceptedInsurance: ['Other'],
            id: '773748a1-6367-4d3b-8393-a5019ae41bf7',
            updatedAt: '',
        },
        PK: 'MATCH#dc97ec41-f0b6-4524-bd84-93bf727a4954',
        entity: 'Match',
        created: '2021-04-24T19:47:40.118Z',
        type: MatchApiTypes.ResponseType.Provider,
    },
    {
        modified: '2021-04-24T19:47:40.120Z',
        ttl: 39,
        SK: 'USER#2727a488-b5d8-4d1e-9b49-393d0a7d42d4',
        details: {
            languagePreference: 'English',
            createdAt: '2021-04-24T19:47:37.095Z',
            emailAddress: 'warrendsadler@gmail.com',
            insuranceProvider: 'Aetna',
            race: ['Native Hawaiian or Other Pacific Islander', 'White'],
            gender: 'Female',
            genderPreference: 'Male',
            racePreference: 'Black or African American',
            stateOfResidence: 'California',
            id: '2727a488-b5d8-4d1e-9b49-393d0a7d42d4',
            issues: ['Life Transitions', 'Pregnancy, Prenatal, or Postpartum Issues'],
            updatedAt: '2021-04-24T19:47:37.095Z',
        },
        PK: 'MATCH#dc97ec41-f0b6-4524-bd84-93bf727a4954',
        entity: 'Match',
        created: '2021-04-24T19:47:40.120Z',
        type: MatchApiTypes.ResponseType.User,
    },
];
describe('matchHelpers', () => {
    it('should transform json payload into Match array', () => {
        const mockProvider = mockApiResults[1] as MatchApiTypes.IProvider;
        const mockUser = mockApiResults[2] as MatchApiTypes.IUser;
        const mockMatch = mockApiResults[0] as MatchApiTypes.IMatch;
        expect(adaptApiMatches(mockApiResults)).toStrictEqual([
            {
                user: mockUser.details,
                matches: [
                    {
                        id: mockMatch.PK,
                        score: mockMatch.score,
                        providerEmailAddress: mockMatch.providerEmailAddress,
                        userEmailAddress: mockMatch.userEmailAddress,
                        criteria: mockMatch.criteria,
                        provider: mockProvider.details,
                    },
                ],
            },
        ]);
    });
});
