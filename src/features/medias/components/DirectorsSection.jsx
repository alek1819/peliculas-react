import { useState } from "react";
import DirectorModal from "./DirectorModal";
import useDirectors from "../hooks/useDirectors";

export default function DirectorsSection({ value = [], onChange }) {

    const {
        items: directores = [],
        create,
        update,
        remove,
        loading
    } = useDirectors();

    const [showModal, setShowModal] = useState(false);
    const [editingDirector, setEditingDirector] = useState(null);

    const toggleDirector = (id) => {
        const updated = value.includes(id)
            ? value.filter(d => d !== id)
            : [...value, id];

        onChange(updated);
    };

    const handleCreate = async (nombre) => {
        await create({ nombres: nombre });
        setShowModal(false);
    };

    const handleUpdate = async (nombre) => {
        await update(editingDirector._id, { nombres: nombre });
        setEditingDirector(null);
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await remove(id);

        // Si estaba seleccionado, lo quitamos
        if (value.includes(id)) {
            onChange(value.filter(d => d !== id));
        }
    };

    const openCreateModal = () => {
        setEditingDirector(null);
        setShowModal(true);
    };

    const openEditModal = (director) => {
        setEditingDirector(director);
        setShowModal(true);
    };

    return (
        <div className="mb-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="text-secondary small fw-bold">
                    DIRECTOR(ES)
                </label>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={openCreateModal}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Nuevo Director
                </button>
            </div>

            {loading && <p>Cargando...</p>}

            <div className="row g-3">
                {directores.map((director) => (
                    <div key={director._id} className="col-12 col-md-6 col-lg-4">
                        <div
                            onClick={() => toggleDirector(director._id)}
                            className={`select-card ${value.includes(director._id) ? "active-card" : ""}`}
                        >
                            <i className="bi bi-person fs-5 mb-2"></i>

                            <span className="fw-semibold">
                                {director.nombres}
                            </span>

                            <div className="d-flex gap-2 mt-2">
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditModal(director);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(director._id);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <DirectorModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingDirector(null);
                }}
                onSave={editingDirector ? handleUpdate : handleCreate}
                initialValue={editingDirector?.nombres || ""}
                isEditing={!!editingDirector}
            />

        </div>
    );
}