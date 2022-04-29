import React from 'react';
import { useEffect, useState } from 'react';

export default function List(){
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchedQuotes, setSearchedQuotes] = useState([]);

    function handleSearch(e){
    e.preventDefault()
 
       if(search){
            const filteredQuotes = quotes.filter((quote) => quote.character
            .toLowerCase(search)
            .includes(search));
            setSearchedQuotes(filteredQuotes)

            return filteredQuotes;
        }
        setSearch('')
    }

    useEffect(() => {
        async function getAllQuotes(){
            const res = await fetch('https://futuramaapi.herokuapp.com/api/quotes');
            const result = await res.json();

            const quotes = result.map((quote) => ({
                quote: quote.quote,
                character: quote.character,
            }))
            setQuotes(quotes)
        }
        getAllQuotes();

        },[]);
    if(loading){
            return (
                <>
                <form onSubmit = {handleSearch}>
                    <label>Character
                        <input aria-label='Search' type='text' value={search} onChange={e => setSearch(e.target.value)} />
                        </label>
                        <button aria-label='button'>Search</button>
                </form>

                {search
                ? searchedQuotes.map((quote, i) => {
                    return(
                        <div>
                        <h2 aria-label='character'>Name: {quote.character}</h2>
                        <h3>Quote: {quote.quote}</h3>
                        </div>
                    )
                })
                : quotes.map((quote, i) => {
               return(
                <div>
                <h2>Name: {quote.character}</h2>
                <h3>Quote: {quote.quote}</h3>
                </div>
               )
    })
            }
</>
    
            )}};
