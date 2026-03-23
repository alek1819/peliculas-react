import { useState } from "react";
import ProductoraModal from "./ProductoraModal";
import useProductoras from "../hooks/useProductoras";

export default function ProductorasSection({ value = null, onChange }) {

    const {
        items: productoras = [],
        create,
        update,
        remove,
        loading
    } = useProductoras();

    const [showModal, setShowModal] = useState(false);
    const [editingProductora, setEditingProductora] = useState(null);

    const handleCreate = async (nombre) => {
        await create({ nombre });
        setShowModal(false);
    };

    const handleUpdate = async (nombre) => {
        await update(editingProductora._id, { nombre });
        setEditingProductora(null);
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await remove(id);

        //Si la eliminada era la seleccionada, la limpiamos
        if (value === id) {
            onChange(null);
        }
    };

    const openCreateModal = () => {
        setEditingProductora(null);
        setShowModal(true);
    };

    const openEditModal = (productora) => {
        setEditingProductora(productora);
        setShowModal(true);
    };

    return (
        <div className="mb-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="text-secondary small fw-bold">
                    PRODUCTORA / ESTUDIO
                </label>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={openCreateModal}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Nueva Productora
                </button>
            </div>

            {loading && <p>Cargando...</p>}

            <div className="row g-3">
                {productoras.map((prod) => (
                    <div key={prod._id} className="col-12 col-md-6 col-lg-4">
                        <div
                            onClick={() => onChange(prod._id)}
                            className={`select-card ${value === prod._id ? "active-card" : ""}`}
                        >
                            <i className="bi bi-building fs-5 mb-2"></i>

                            <span className="fw-semibold">
                                {prod.nombre}
                            </span>

                            <div className="d-flex gap-2 mt-2">
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditModal(prod);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(prod._id);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <ProductoraModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingProductora(null);
                }}
                onSave={editingProductora ? handleUpdate : handleCreate}
                initialValue={editingProductora?.nombre || ""}
                isEditing={!!editingProductora}
            />

        </div>
    );
}