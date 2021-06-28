import deepEqual from 'deep-equal';
export const isChangesToProvider = (original: Record<string, unknown>, current: Record<string, unknown>) => {
    return deepEqual(original, current);
};
export const validateRequired = ({ val, fieldName }: { val: string | number; fieldName: string }) => {
    let isValid = true;
    if (val === undefined) {
        isValid = false;
    }
    if (typeof val === 'string') {
        isValid = val !== '';
    }
    return isValid ? undefined : `${fieldName} is required`;
};

export const validateWebsiteUrl = (websiteUrl: string) => {
    let url;
    if (!websiteUrl) return undefined;
    try {
        url = new URL(websiteUrl);
    } catch (_) {
        return 'Invalid url';
    }
    return url.protocol === 'http:' || url.protocol === 'https:' ? undefined : 'Invalid url';
};

export const validateEmail = (emailAddress: string) => {
    if (!emailAddress) return 'Email required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress)) {
        return 'Invalid email address';
    }
    return undefined;
};
