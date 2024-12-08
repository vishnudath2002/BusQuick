import React, { useState } from 'react';

const Search = () => {
    const [searchParams, setSearchParams] = useState({
        departure: '',
        arrival: '',
        date: '',
        type: '',
        operator: '',
        amenities: '',
    });
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = new URLSearchParams(searchParams).toString();
        const response = await fetch(`http://localhost:5000/bus/search?${query}`);
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Departure" value={searchParams.departure} onChange={(e) => setSearchParams({ ...searchParams, departure: e.target.value })} />
                <input type="text" placeholder="Arrival" value={searchParams.arrival} onChange={(e) => setSearchParams({ ...searchParams, arrival: e.target.value })} />
                <input type="date" placeholder="Date" value={searchParams.date} onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })} />
                <input type="text" placeholder="Type" value={searchParams.type} onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })} />
                <input type="text" placeholder="Operator" value={searchParams.operator} onChange={(e) => setSearchParams({ ...searchParams, operator: e.target.value })} />
                <input type="text" placeholder="Amenities (comma separated)" value={searchParams.amenities} onChange={(e) => setSearchParams({ ...searchParams, amenities: e.target.value })} />
                <button type="submit">Search</button>
            </form>
            <div>
                {results.map((bus, index) => (
                    <div key={index}>
                        <h3>{bus.operator}</h3>
                        <p>{bus.departure} to {bus.arrival}</p>
                        <p>{bus.date} at {bus.time}</p>
                        <p>Type: {bus.type}</p>
                        <p>Amenities: {bus.amenities.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
