export type UserContract = {
    id: number;

    email: string;
    firstName: string;
    lastName: string;

    createdAt: string;
    verifiedAt: string;
    lastSentVerificationNotification: string;
    lastChangedPassword: string;
    lastSentPasswordChangeToken: string;

    verified: boolean;
    isAdmin: boolean;
}
