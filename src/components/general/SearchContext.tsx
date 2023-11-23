import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextProps {
    children: ReactNode;
}

const SearchContext = createContext<{ searchResults: any[]; updateSearchResults: (results: any[]) => void } | undefined>(undefined);

export const SearchProvider: React.FC<SearchContextProps> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const arraysAreEqual = (array1: any[], array2: any[]): boolean => {
        if (array1.length !== array2.length) {
            return false;
        }
    
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
    
        return true;
    };

    const updateSearchResults = (results: any[]) => {
        console.log("update do searchResults =>",results)
        if (!arraysAreEqual(searchResults, results)) {
            setSearchResults(results);
        }
    };

    return (
        <SearchContext.Provider value={{ searchResults, updateSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
