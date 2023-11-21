import { Filters } from "../general/Filters";

import { useEffect } from "react";

type FilterAttributes = "name" | "brand" | "yearModel" | "value" | "kilometers" | "color";


type TradFilterAttributes = {
    [key in FilterAttributes]: string;
};

interface FiltersMenuProps {
    onUpdateResults: (newResults: any[]) => void; // Define a propriedade onUpdateResults
}

export const FiltersMenu: React.FC<FiltersMenuProps> = () => {

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

    useEffect(() => {
        filterAtributes.forEach((filter) => teste(filter));
        
    }, []);

    return (
        <div className="container-principal">
            <div className="container-filter">
                {filterAtributes.map((filter) => (
                    <div key={filter}>
                        <ul className="filtros">
                        {tradFilterAtributes[filter]}
                            <Filters filter={filter} key={filter}  />
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

