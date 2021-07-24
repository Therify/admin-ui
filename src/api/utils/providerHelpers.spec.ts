import { mockProvider } from '../../types/mocks';
import { ensureProviderArrayTypes } from './providerHelpers';

describe('providers api Helpers', () => {
    describe.only('ensureProviderArrayTypes', () => {
        const mistypedProvider = {
            ...mockProvider,
            licensedStates: { '0': mockProvider.licensedStates[0] },
            acceptedInsurance: { '0': mockProvider.acceptedInsurance[0] },
        };
        // This solves a bug and is a temporary fix
        it('should convert object values to array when received', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            expect(ensureProviderArrayTypes(mistypedProvider)).toStrictEqual(mockProvider);
        });
    });
});
