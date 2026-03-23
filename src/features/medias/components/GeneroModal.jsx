import { useState, useEffect } from "react";

export default function GeneroModal({
    show,
    onClose,
    onSave,
    initialData = null,
    isEditing = false
}) {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre || "");
            setDescripcion(initialData.descripcion || "");
        } else {
            setNombre("");
            setDescripcion("");
        }
    }, [initialData]);

    if (!show) return null;

    const handleSubmit = () => {
        if (!nombre.trim()) return;

        onSave({
            nombre,
            descripcion
        });
    };

    return (
        <div className="modal-backdrop-custom">
            <div className="modal-content-custom">

                <h5 className="mb-3">
                    {isEditing ? "Editar Género" : "Nuevo Género"}
                </h5>

                <input
                    type="text"
                    className="form-control form-control-dark mb-3"
                    placeholder="Nombre del género"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <textarea
                    className="form-control form-control-dark mb-3"
                    placeholder="Descripción"
                    rows="3"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <div className="d-flex justify-content-end gap-2">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={handleSubmit}
                    >
                        {isEditing ? "Actualizar" : "Guardar"}
                    </button>
                </div>

            </div>
        </div>
    );
}