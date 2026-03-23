import { useState } from "react";
import useTipos from "../hooks/useTipos";

export default function SelectCards({ value, onChange }) {

    const {
        items: tipos = [],
        loading,
        create,
        update,
        remove
    } = useTipos();

    const [showInput, setShowInput] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [nombre, setNombre] = useState("");

    if (loading) return <p>Cargando tipos...</p>;

    const handleCreate = async () => {
        if (!nombre.trim()) return;
        await create({ nombre });
        setNombre("");
        setShowInput(false);
    };

    const handleUpdate = async () => {
        if (!nombre.trim()) return;
        await update(editingId, { nombre });
        setEditingId(null);
        setNombre("");
    };

    const handleDelete = async (id) => {
        await remove(id);
        if (value === id) onChange(null);
    };

    const startEdit = (tipo) => {
        setEditingId(tipo._id);
        setNombre(tipo.nombre);
    };

    return (
        <div className="mb-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label text-secondary small mb-0">
                    TIPO DE MEDIA
                </label>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                        setShowInput(!showInput);
                        setEditingId(null);
                        setNombre("");
                    }}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Nuevo
                </button>
            </div>

            {(showInput || editingId) && (
                <div className="d-flex gap-2 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del tipo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    {editingId ? (
                        <button className="btn btn-success" onClick={handleUpdate}>
                            Actualizar
                        </button>
                    ) : (
                        <button className="btn btn-danger" onClick={handleCreate}>
                            Guardar
                        </button>
                    )}
                </div>
            )}

            <div className="row g-3">
                {tipos.map((tipo) => (
                    <div key={tipo._id} className="col-6 col-md-3">
                        <div
                            onClick={() => onChange(tipo._id)}
                            className={`select-card ${value === tipo._id ? "active-card" : ""}`}
                        >
                            <div className="small fw-semibold mb-2">
                                {tipo.nombre}
                            </div>

                            <div className="d-flex justify-content-center gap-2">
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startEdit(tipo);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(tipo._id);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}