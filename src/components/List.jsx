import React from 'react';
import { useEffect, useState } from 'react';

export default function List(){
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAllQuotes(){
            const res = await fetch('https://futuramaapi.herokuapp.com/api/quotes');
            const result = await res.json();

            console.log(result, 'result')

            const quotes = result.map((quote) => ({
                quote: quote.quote,
            }));
            setQuotes(quotes)
        }
        getAllQuotes();

        },[])
        if(loading){
            return(
                
                <div>
                <h2>{quotes.quote}</h2>
                </div>
            )}
}
        
    
    
