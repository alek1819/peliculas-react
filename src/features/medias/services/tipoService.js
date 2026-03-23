import axiosClient from "../../../core/axiosClient";

const tipoService = {
    getAll: async () => {
        const { data } = await axiosClient.get("/tipos");
        return data; // debe devolver array
    },

    create: async (payload) => {
        const { data } = await axiosClient.post("/tipos", payload);
        return data;
    },

    update: async (id, payload) => {
        const { data } = await axiosClient.put(`/tipos/${id}`, payload);
        return data;
    },

    remove: async (id) => {
        const { data } = await axiosClient.delete(`/tipos/${id}`);
        return data;
    },
};

export default tipoService;