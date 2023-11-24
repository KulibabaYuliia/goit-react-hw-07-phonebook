import { nanoid } from 'nanoid';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://655fde9e83aba11d99cfeab7.mockapi.io/';

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`contacts`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

//

export const fetchDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await axios.delete(`contacts/${contactId}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filterQuery: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContacts(state, { payload }) {
      state.contacts.items.push({
        id: nanoid(),
        name: payload.name,
        phone: payload.phone,
      });
    },
    changeFilter(state, { payload }) {
      state.filterQuery = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = payload;
      })
      .addCase(fetchDeleteContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload.id
        );
      })

      .addMatcher(
        isAnyOf(fetchContacts.pending, fetchDeleteContact.pending),
        state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.rejected, fetchDeleteContact.rejected),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      ),
});

export const { deleteContacts, addContacts, changeFilter } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
