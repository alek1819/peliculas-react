import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PosterPanel({ formData, onChange }) {
    const [preview, setPreview] = useState(formData.imagen || "");
    const navigate = useNavigate(); // Hook de React Router

    useEffect(() => {
        setPreview(formData.imagen || formData.url || "");
    }, [formData.imagen, formData.url]);

    const handleUrlChange = (value) => {
        onChange("url", value);
        setPreview(value);
    };

    const handleImagenChange = (value) => {
        onChange("imagen", value);
        setPreview(value);
    };

    const handleVisibleChange = (e) => {
        onChange("visibleCatalogo", e.target.checked);
    };

    const handlePreviewClick = () => {
        navigate("/catalogo"); 
    };

    return (
        <div className="card admin-card h-100">
            <div className="card-body">

                <label className="form-label text-secondary small">
                    URL DE IMAGEN WEB
                </label>

                <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="form-control form-control-dark mb-3"
                    placeholder="https://ejemplo.com/poster.jpg"
                />

                <label className="form-label text-secondary small">
                    Imagen (opcional)
                </label>

                <input
                    type="text"
                    value={formData.imagen}
                    onChange={(e) => handleImagenChange(e.target.value)}
                    className="form-control form-control-dark mb-3"
                    placeholder="URL de imagen alternativa"
                />

                <div
                    className="poster-preview mb-4 d-flex align-items-center justify-content-center border rounded"
                    style={{height: "200px"}}
                >
                    {preview ? (
                        <img src={preview} alt="Poster preview" className="img-fluid h-100" />
                    ) : (
                        <i className="bi bi-image fs-1 text-secondary"></i>
                    )}
                </div>

                <div className="form-check form-switch mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!formData.visibleCatalogo}
                        onChange={handleVisibleChange}
                    />
                    <label className="form-check-label text-light">
                        Visible en Catálogo
                    </label>
                </div>

                <button
                    className="btn btn-outline-danger w-100"
                    onClick={handlePreviewClick}
                >
                    Vista Previa del Catálogo
                </button>
            </div>
        </div>
    );
}