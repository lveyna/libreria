import { useContext } from 'react';
import LibraryContext from '../context/LibraryContext';

export default function useLibraryContext(){
    return useContext(LibraryContext);
}