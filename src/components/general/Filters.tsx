import { useEffect, useState } from "react";
import { CarServices } from "../../services/CarServices";
import { useSearchContext } from "./SearchContext";

type FiltersProps = {
    filter: string;
    setResults:(newResults: never[]) => void;
};

export const Filters: React.FC<FiltersProps> = ({ filter, setResults }) => {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { searchResults, updateSearchResults } = useSearchContext();
    const carService = new CarServices();
    
    const goToFilter = async (filter:string, item:string) => {
        try {
            const queryParams = `${filter}=${item}`
            console.log(queryParams)
            const response = await carService.getFilteredCars(queryParams);
            console.log( response.data)
            updateSearchResults(response.data);
        } catch (error) {
            console.error("Erro ao buscar filtro:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await carService.filters(filter);
                setData(response.data);
                console.log("results do searchResults no filter", data);
            } catch (error) {
                console.error("erro ao buscar filtro:",error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchResults]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <li>
                    {data   
                        .sort((a, b) => b - a)
                        .map((item) => (
                        <p key={item} onClick={() => goToFilter(filter, item)}>
                            {item}
                        </p>
                    ))}
                </li>

            )}
        </div>
    );
};