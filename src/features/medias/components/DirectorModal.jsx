import { useState, useEffect } from "react";

export default function DirectorModal({
    show,
    onClose,
    onSave,
    initialValue = "",
    isEditing = false
}) {

    const [nombre, setNombre] = useState("");

    useEffect(() => {
        setNombre(initialValue);
    }, [initialValue]);

    if (!show) return null;

    const handleSubmit = () => {
        if (!nombre.trim()) return;
        onSave(nombre);
        setNombre("");
    };

    return (
        <div className="modal-backdrop-custom">
            <div className="modal-content-custom">

                <h5 className="mb-3">
                    {isEditing ? "Editar Director" : "Nuevo Director"}
                </h5>

                <input
                    type="text"
                    className="form-control form-control-dark mb-3"
                    placeholder="Nombre del director"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
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