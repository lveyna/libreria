import React, {useCallback, useMemo, createContext} from "react";
import {useQuery, useQueryClient} from 'react-query';

const LibraryContext = createContext();

export default LibraryContext;

const GET_BOOKS = 'GET_BOOKS';

const url = 'http://127.0.0.1:3000/';

async function fetchBooks(){
    const res = await fetch(url+'api/libros/',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    //console.log(res);
    const json = await res.json();
    return json;
}//Fin de fetchBooks

export function LibraryContextProvider({children}){
    const {isSuccess, isLoading, data, error} = useQuery(GET_BOOKS, fetchBooks);
   
    const queryClient = useQueryClient()

    const invalidateBookListCache = useCallback(function(){
        
        queryClient.invalidateQueries(GET_BOOKS);

    }, [])

    const value = useMemo(
        ()=>({
            isSuccess,
            isLoading,
            error,
            data,
            invalidateBookListCache,
            url
        }),
        [isSuccess, isLoading, error, data, invalidateBookListCache, url]
    )

    return (
        <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
    );
} //Fin de LibraryContextProvider   