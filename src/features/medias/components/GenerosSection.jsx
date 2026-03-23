import { useState } from "react";
import GeneroModal from "./GeneroModal";
import useGeneros from "../hooks/useGeneros";

export default function GenerosSection({ value = null, onChange }) {

    const {
        items: generos = [],
        create,
        update,
        remove,
        loading
    } = useGeneros();

    const [showModal, setShowModal] = useState(false);
    const [editingGenero, setEditingGenero] = useState(null);

    const handleCreate = async (data) => {
        await create(data);
        setShowModal(false);
    };

    const handleUpdate = async (data) => {
        await update(editingGenero._id, data);
        setEditingGenero(null);
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await remove(id);
        if (value === id) onChange(null);
    };

    const openCreate = () => {
        setEditingGenero(null);
        setShowModal(true);
    };

    const openEdit = (genero) => {
        setEditingGenero(genero);
        setShowModal(true);
    };

    if (loading) return <p>Cargando géneros...</p>;

    return (
        <div className="mb-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="text-secondary small fw-bold">
                    GÉNERO PRINCIPAL
                </label>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={openCreate}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Nuevo Género
                </button>
            </div>

            <div className="row g-3">
                {generos.map((genero) => (
                    <div key={genero._id} className="col-6 col-md-4 col-lg-3">
                        <div
                            onClick={() => onChange(genero._id)}
                            className={`select-card ${value === genero._id ? "active-card" : ""}`}
                        >
                            <span className="fw-semibold">
                                {genero.nombre}
                            </span>

                            <div className="d-flex gap-2 mt-2">
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEdit(genero);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(genero._id);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <GeneroModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingGenero(null);
                }}
                onSave={editingGenero ? handleUpdate : handleCreate}
                initialData={editingGenero}
                isEditing={!!editingGenero}
            />

        </div>
    );
}