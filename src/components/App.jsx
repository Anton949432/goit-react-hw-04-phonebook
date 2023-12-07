// App.jsx
import React, { useReducer, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import './App.css';

const initialState = {
  contacts: [],
  filter: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch({ type: 'SET_CONTACTS', payload: JSON.parse(storedContacts) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const addContact = (contact) => {
    dispatch({ type: 'ADD_CONTACT', payload: contact });
  };

  const onDeleteContact = (contactId) => {
    dispatch({ type: 'DELETE_CONTACT', payload: contactId });
  };

  return (
    <div>
      <h1>Телефонна книга</h1>
      <ContactForm contacts={state.contacts} addContact={addContact} />

      <h2>Контакти</h2>
      <Filter filter={state.filter} setFilter={(value) => dispatch({ type: 'SET_FILTER', payload: value })} />
      <ContactList contacts={state.contacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default App;

