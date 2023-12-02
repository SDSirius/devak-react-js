import { Filters } from "../general/Filters";
import React, { useState } from "react";

type FilterAttributes = "name" | "brand" | "yearModel" | "value" | "kilometers" | "color";

type TradFilterAttributes = {
  [key in FilterAttributes]: string;
};

interface FiltersMenuProps {
  onSearchComplete: (results: any[]) => void;
}

export const FiltersMenu: React.FC<FiltersMenuProps> = ({ onSearchComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openedText, setOpenedText] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterAttributes | null>(null);

  const filterAtributes: FilterAttributes[] = ["name", "brand", "yearModel", "value", "kilometers", "color"];

  const tradFilterAtributes: TradFilterAttributes = {
    name: "Nomes ",
    brand: "Marcas",
    yearModel: "Anos/Modelos",
    value: "Valores",
    kilometers: "Quilometragens",
    color: "Cores",
  };

  const hideMenu = () => {
    setOpenedText((prev) => !prev);
    setIsVisible((prev) => !prev);
  };

  const liShowFilters = (filter: FilterAttributes) => {
    setActiveFilter(filter);
    setIsVisible(true);
  };

  const liHideFilters = () => {
    setActiveFilter(null);
    setIsVisible(false);
  };

  return (
    <>
      <div className={`container-principal ${isVisible ? "visible" : "hidden"}`}>
        <div className="container-filter">
          <p>Filtros</p>
          {filterAtributes.map((filter) => (
            <div className="filtros" key={filter} onMouseEnter={() => liShowFilters(filter)} onMouseLeave={liHideFilters}>
              <ul className={`filter-name ${activeFilter === filter ? "active" : ""}`}>
                {tradFilterAtributes[filter]}
                {activeFilter === filter && <Filters filter={filter} key={filter} onSearchComplete={onSearchComplete} hideMenu={hideMenu} />}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <button className="toggle-menu" onClick={hideMenu}>
        {openedText ? "Fechar " : "Abrir "}Menu
      </button>
    </>
  );
};
