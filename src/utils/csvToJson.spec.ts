import { convertCsvToProviders, parseJsonAsProvider } from './csvToJson';
import { mockProviderData } from '../types/mocks';
const csvProvider = (() => {
    const keyValTuple = Object.entries(mockProviderData).reduce<[string[], string[]]>(
        (acc, [key, val]) => {
            return [
                [...acc[0], key],
                [...acc[1], Array.isArray(val) ? val.join(',') : `${val}`],
            ];
        },
        [[], []],
    );
    return `${keyValTuple[0].join(',')}\n${keyValTuple[1].join(',')}`;
})();

describe('parseJsonAsProvider', () => {
    const jsonCsvProvider = {
        ...mockProviderData,
        rate: `${mockProviderData.rate}`,
        yearsOfExperience: `${mockProviderData.yearsOfExperience}`,
        licensedStates: mockProviderData.licensedStates.join(','),
        acceptedInsurance: mockProviderData.acceptedInsurance.join(','),
        race: mockProviderData.race.join(','),
        specialties: mockProviderData.specialties.join(','),
        therapeuticPractices: mockProviderData.therapeuticPractices.join(','),
    };
    it('should parse JSON object as Provider', () => {
        const provider = parseJsonAsProvider(jsonCsvProvider);
        expect(provider).toStrictEqual(mockProviderData);
    });

    it('should drop unrecognized keys', () => {
        const provider = parseJsonAsProvider({ ...jsonCsvProvider, dummyKey: 'I should not be here' });
        expect(provider).toStrictEqual(mockProviderData);
    });
});

describe('convertCsvToProviders', () => {
    it('should convert a csv provider into a json provider with correct types', () => {
        expect(convertCsvToProviders(csvProvider)).toStrictEqual([mockProviderData]);
    });
});
