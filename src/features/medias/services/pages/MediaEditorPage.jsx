import { useState } from "react";
import PosterPanel from "../components/PosterPanel";
import MainForm from "../components/MainForm";
import TechnicalSection from "../components/TechnicalSection";
import useMedias from "../hooks/useMedias";

export default function MediaEditorPage() {
    const { create } = useMedias();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        serial: "",
        titulo: "",
        sinopsis: "",
        url: "",
        imagen: "",
        anioEstreno: "",
        genero: null,
        director: [],
        productora: null,
        tipo: null
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            serial: "",
            titulo: "",
            sinopsis: "",
            url: "",
            imagen: "",
            anioEstreno: "",
            genero: null,
            director: [],
            productora: null,
            tipo: null
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Validación básica
            if (
                !formData.serial ||
                !formData.titulo ||
                !formData.url ||
                !formData.anioEstreno ||
                !formData.genero ||
                !formData.director.length ||
                !formData.productora ||
                !formData.tipo
            ) {
                alert("Completa todos los campos obligatorios");
                return;
            }

            const payload = {
                ...formData,
                anioEstreno: Number(formData.anioEstreno),
                director: formData.director[0]
            };

            console.log("Enviando al backend:", payload);

            await create(payload);
            alert("Media creada correctamente...");
            resetForm();

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Error al guardar la media");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-bg min-vh-100 py-5">
            <div className="container">

                {/* Header */}
                <div className="mb-5">
                    <p className="text-danger small fw-bold mb-2">
                        EDITOR DE CONTENIDO
                    </p>
                    <h1 className="display-6 fw-bold text-light">
                        Gestor Único de Contenido Cinematográfico
                    </h1>
                </div>

                {/* Grid principal */}
                <div className="row g-4">

                    <div className="col-12 col-lg-4">
                        <PosterPanel
                            formData={formData}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 col-lg-8">
                        <MainForm
                            formData={formData}
                            onChange={handleChange}
                        />

                        <TechnicalSection
                            formData={formData}
                            onChange={handleChange}
                        />

                        <div className="text-end mt-4">
                            <button
                                className="btn btn-danger px-4"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Guardando..." : "Guardar Media"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}