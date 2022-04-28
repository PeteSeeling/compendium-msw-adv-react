import React from 'react';
import { useEffect, useState } from 'react';

export default function List(){
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAllQuotes(){
            const res = await fetch('https://futuramaapi.herokuapp.com/api/quotes');
            const result = await res.json();

            const quotes = result.map((quote) => ({
                quote: quote.quote,
                character: quote.character
            }));
        
            setQuotes(quotes)
           
        }
        getAllQuotes();

        },[])
        if(loading){
            return(
                quotes.map((quote, i) => {

               return(
                <div>
                <h2>Name: {quote.character}</h2>
                <h3>Quote: {quote.quote}</h3>
                </div>
            )}))
            
}
        
    
}
