import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PreferencesGrid } from './PreferencesGrid';
import { Mocks } from '../../../types';

describe('PreferencesGrid', () => {
    it('should render preferences data', () => {
        const issues = Mocks.mockUser.issues.join(', ');
        const { getByText } = render(
            <PreferencesGrid
                stateOfResidence={Mocks.mockUser.stateOfResidence}
                genderPreference={Mocks.mockUser.genderPreference}
                racePreference={Mocks.mockUser.racePreference}
                issues={issues}
                insuranceProvider={Mocks.mockUser.insuranceProvider}
            />,
        );
        expect(getByText(Mocks.mockUser.stateOfResidence)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.genderPreference)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.racePreference)).toBeInTheDocument();
        expect(getByText(issues)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.insuranceProvider)).toBeInTheDocument();
    });
});
