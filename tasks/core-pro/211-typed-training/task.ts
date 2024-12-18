import { regularUser } from './user-model.ts';

const formatName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
};

const formatAddress = (address: { street: string, city: string, country: string, postalCode: string }) => {
    return `${address.street}, ${address.city}, ${address.country} ${address.postalCode}`;
};

const isCandidateForDeletion = (role: 'admin' | 'user' | 'guest', isActive: boolean) => {
    return role === 'guest' && !isActive;
};

const getUserLocale = (settings: { language: string }) => {
    return settings.language || 'en';
};

const validateAge = (dateOfBirth: Date, minAge: number) => {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        return age - 1 >= minAge;
    }

    return age >= minAge;
};

const hasPhone = (phoneNumbers: string[]) => {
    return phoneNumbers.length > 0;
};

const canSendEmailNotification = (email: string, settings: { notifications: boolean }) => {
    return Boolean(email) && settings.notifications;
};

formatName(regularUser.firstName, regularUser.lastName);
formatAddress(regularUser.address);
isCandidateForDeletion(regularUser.role, regularUser.isActive);
getUserLocale(regularUser.settings);
validateAge(regularUser.dateOfBirth, 18);
hasPhone(regularUser.phoneNumbers);
canSendEmailNotification(regularUser.email, regularUser.settings);
