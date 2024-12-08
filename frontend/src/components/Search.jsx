import React from 'react';

const Search = () => {
   

    return (
        <div>
            <form >
                <input type="text" placeholder="Departure"  />
                <input type="text" placeholder="Arrival"  />
                <input type="date" placeholder="Date" />
                <input type="text" placeholder="Type"  />
                <button type="submit">Search</button>
            </form>
           
        </div>
    );
};

export default Search;
