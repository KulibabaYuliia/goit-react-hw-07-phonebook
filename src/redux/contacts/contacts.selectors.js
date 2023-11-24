import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts.items;
export const selectIsLoading = state => state.contacts.contacts.isLoading;
export const selectError = state => state.contacts.contacts.error;
export const selectFilterQuery = state => state.contacts.filterQuery;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterQuery],
  (contacts, filterQuery) =>
    contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filterQuery);
    })
);
