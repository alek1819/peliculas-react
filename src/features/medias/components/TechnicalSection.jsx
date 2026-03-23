import { useState, useEffect } from "react";
import GenerosSection from "./GenerosSection";
import SelectCards from "./SelectCards";
import DirectorsSection from "./DirectorsSection";
import ProductorasSection from "./ProductorasSection";

export default function TechnicalSection({ formData, onChange }) {
    const { genero, tipo, director, productora } = formData;

    return (
        <div className="card admin-card mb-4">
            <div className="card-body">

                <h6 className="text-danger fw-bold mb-4">FICHA TÉCNICA</h6>

                {/* Género */}
                <GenerosSection
                    value={genero}
                    onChange={value => onChange("genero", value)}
                />

                {/* Tipo */}
                <SelectCards
                    value={tipo}
                    onChange={value => onChange("tipo", value)}
                />

                {/* Directores */}
                <DirectorsSection
                    value={Array.isArray(director) ? director : []}
                    onChange={value => onChange("director", value)}
                />

                {/* Productora */}
                <ProductorasSection
                    value={productora}
                    onChange={value => onChange("productora", value)}
                />

            </div>
        </div>
    );
}