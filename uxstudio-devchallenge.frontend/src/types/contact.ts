import type { IContact } from './iContact';

export class Contact implements IContact {
    contactId: number;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    profilePicBase64: string;

    constructor(contactId: number, fullName: string, phoneNumber: string, emailAddress: string, profilePicBase64: string) {
        this.contactId = contactId;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.profilePicBase64 = profilePicBase64;
    }
}
