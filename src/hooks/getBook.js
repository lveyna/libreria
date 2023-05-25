import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const GET_BOOK = 'GET_BOOK';

export default function getBook({_id, url}){
    async function fetchBook(){
       
        const res = await fetch(url+"api/libros/"+_id);
        const json = await res.json();
        return json;
    }

    return useQuery([GET_BOOK, _id], fetchBook);
}

export function useInvalidateBook({_id}){

    const queryClient = useQueryClient()

    const invalidateBookCache = useCallback(function(){
        
        queryClient.invalidateQueries([GET_BOOK, _id]);

    }, [_id])

    return invalidateBookCache;
}
