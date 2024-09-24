import { defineStore } from 'pinia';
import ApiService from '../services/apiService';
import type { IContact } from '../types/iContact';

export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as IContact[],
    }),
    actions: {
        async fetchContacts() {
            try {
                const response = await ApiService.get<IContact[]>('/contacts');

                this.contacts = response.data;
            } catch (error) {
                console.error('Failed to load contacts:', error);
            }
        },
        async deleteContact(contactId: number) {
            try {
                await ApiService.delete(`/contacts/${contactId}`);

                this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
            } catch (error) {
                console.error('Failed to delete contact:', error);
            }
        },
        async updateContact(contact: IContact) {
            try {
                await ApiService.put<IContact>(`/contacts`, contact);

                const index = this.contacts.findIndex(c => c.contactId === contact.contactId);
                if (index !== -1) {
                    this.contacts[index].contactId = contact.contactId;
                    this.contacts[index].fullName = contact.fullName;
                    this.contacts[index].phoneNumber = contact.phoneNumber;
                    this.contacts[index].emailAddress = contact.emailAddress;
                    this.contacts[index].profilePicBase64 = contact.profilePicBase64;
                }
            } catch (error) {
                console.error('Failed to update contact:', error);
            }
        },
        async createContact(contact: IContact) {
            try {
                await ApiService.post<IContact>(`/contacts`, contact);

                let maxId = 1;
                for (let index = 0; index < this.contacts.length; index++) {
                    if (this.contacts[index].contactId > maxId) {
                        maxId = this.contacts[index].contactId;
                    }
                }
                contact.contactId = maxId + 1;
                this.contacts.push(contact);
            } catch (error) {
                console.error('Failed to create contact:', error);
            }
        },
    },
});
