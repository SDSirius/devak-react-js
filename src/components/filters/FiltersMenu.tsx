import { Filters } from "../general/Filters";
import { useEffect, useState } from "react";

type FilterAttributes = "name" | "brand" | "yearModel" | "value" | "kilometers" | "color";


type TradFilterAttributes = {
    [key in FilterAttributes]: string;
};

interface FiltersMenuProps {
    onSearchComplete: (results: any[]) => void; 
}

export const FiltersMenu: React.FC<FiltersMenuProps> = ({ onSearchComplete }) => {

    const [isVisible, setIsVisible] = useState(false);
    let isOpened = "fechar";

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
        if (isOpened === "fechar"){
            isOpened= "abrir"
        } else if (isOpened === "abrir"){
            isOpened= "fechar"
        }
        setIsVisible((prev) => !prev);

    }

    useEffect(() => {
        filterAtributes.forEach((filter) => teste(filter));
        
    }, []);

    return (
        <>
            <div className={`container-principal ${isVisible ? "visible" : "hidden"}`}>
                <div className="container-filter">
                    {filterAtributes.map((filter) => (
                        <div className="filtros" key={filter}>
                            <ul className="filter-name">
                            {tradFilterAtributes[filter]}
                                <Filters filter={filter} key={filter} onSearchComplete={onSearchComplete} />
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <button className="toggle-menu" onClick={hideMenu}>{isOpened} Menu</button>
        </>
    );
};

