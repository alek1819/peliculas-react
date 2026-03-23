import { useEffect, useState } from "react";

const useCrud = (service) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAll = async () => {
        try {
            setLoading(true);
            const data = await service.getAll();

            setItems(Array.isArray(data) ? data : []);
            setError(null);

        } catch (err) {
            setError(err.message || "Error al cargar datos");
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const create = async (payload) => {
        try {
            await service.create(payload);
            await getAll();
        } catch (err) {
            setError(err.message);
        }
    };

    const update = async (id, payload) => {
        try {
            await service.update(id, payload);
            await getAll();
        } catch (err) {
            setError(err.message);
        }
    };

    const remove = async (id) => {
        try {
            await service.remove(id);
            await getAll();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    return {
        items,
        loading,
        error,
        getAll,
        create,
        update,
        remove,
    };
};

export default useCrud;