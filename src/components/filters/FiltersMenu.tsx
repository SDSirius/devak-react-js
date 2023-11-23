import { Filters } from "../general/Filters";
import { useEffect, useState } from "react";

type FilterAttributes = "name" | "brand" | "yearModel" | "value" | "kilometers" | "color";


type TradFilterAttributes = {
    [key in FilterAttributes]: string;
};

interface FiltersMenuProps {
    onUpdateResults: (newResults: any[]) => void; // Define a propriedade onUpdateResults
    setResults: (newResults: never[]) => void;
}

export const FiltersMenu: React.FC<FiltersMenuProps> = ({setResults}) => {

    const [isVisible, setIsVisible] = useState(false);

    const filterAtributes: FilterAttributes[] = ["name", "brand", "yearModel", "value", "kilometers", "color"];

    const tradFilterAtributes: TradFilterAttributes = {
        name: "Nome",
        brand: "Marca",
        yearModel: "Ano/Modelo",
        value: "Valor",
        kilometers: "Quilometragem",
        color: "Cores",
    };

    const teste = (filter: FilterAttributes) => {
        console.log(`Buscando por: ${filter}`);

        return 
    };

    const hideMenu = () => {
        setIsVisible((prev) => !prev);
    }

    useEffect(() => {
        filterAtributes.forEach((filter) => teste(filter));
        
    }, []);

    return (
        <>
            <button className="toggle-menu" onClick={hideMenu}>Abre/Fecha Menu</button>
            <div className={`container-principal ${isVisible ? "visible" : "hidden"}`}>
                <div className="container-filter">
                    {filterAtributes.map((filter) => (
                        <div className="filtros" key={filter}>
                            <ul className="filter-name">
                            {tradFilterAtributes[filter]}
                                <Filters filter={filter} key={filter} setResults={setResults} />
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

