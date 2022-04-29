import React from 'react';
import { useEffect, useState } from 'react';

export default function List(){
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchedQuotes, setSearchedQuotes] = useState([]);

    function handleSearch(e){
        e.preventDefault()
       setQuotes(quotes)
       if(search){

            const filteredQuotes = quotes.filter(quote => quote.character
            .includes(search));
            setQuotes(filteredQuotes)
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
            }));
            setQuotes(quotes)
        }
        getAllQuotes();

        },[])

       if(loading){
            return(
                <>
                <form onSubmit = {handleSearch}>
                    <label>Character
                        <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
                        </label>
                        <button>Search</button>
                </form>

                {search
                ? searchedQuotes.map((quote, i) => {
                    return(
                        <div>
                        <h2>Name: {quote.character}</h2>
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
    
            )}}
