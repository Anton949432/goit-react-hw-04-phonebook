// ContactForm.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ContactForm = ({ contacts, addContact }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '' || number.trim() === '') {
            alert('Please enter name and number.');
            return;
        }

        if (contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())) {
            alert(`${name} is already in contacts.`);
            return;
        }

        addContact({ id: uuidv4(), name, number });
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <br />
            <label>
                Number:
                <input type="tel" name="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Add contact</button>
        </form>
    );
};

export default ContactForm;
