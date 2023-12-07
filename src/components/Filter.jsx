import React from 'react';

const Filter = ({ filter, setFilter }) => {
    return (
        <label>
            Search:
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </label>
    );
};

export default Filter;
