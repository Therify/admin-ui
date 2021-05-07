import { CompanyIds } from '../company';
import { User } from '../match';

export const mockUser: User = {
    companyId: CompanyIds.Therify,
    id: 'user123',
    emailAddress: 'patient@therifydev.com',
    stateOfResidence: 'Tennessee',
    gender: 'male',
    genderPreference: 'male',
    race: ['Black or African American'],
    racePreference: 'Black or African American',
    issues: ['ADHD'],
    insuranceProvider: 'Cigna',
    languagePreference: 'English',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};
