import { useEffect, useState } from "react";
import { CarServices } from "../../services/CarServices";
// import { ResultView } from "../../views/ResultView";


type FiltersProps = {
    filter: string;
    onSearchComplete: (results: any[]) => void; 
    hideMenu: () => void;
};

export const Filters: React.FC<FiltersProps> = ({ filter, onSearchComplete, hideMenu }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const [results, setResults] = useState([]);
    const carService = new CarServices();
    
    const goToFilter = async (filter:string, item:string) => {
        try {
            const queryParams = `${filter}=${item}`;
            const response = await carService.getFilteredCars(queryParams);
            onSearchComplete(response.data);
            hideMenu(); 
        } catch (error) {
            console.error("Erro ao buscar filtro:", error);
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await carService.filters(filter);
                setData(response.data);

            } catch (error) {
                console.error("erro ao buscar filtro:",error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {data   
                        .sort((a, b) => b - a)
                        .map((item) => (
                        <li key={item} onClick={() => goToFilter(filter, item)}>
                            {item}
                        </li>
                    ))}
                </>

            )}
        </>
    );
};
