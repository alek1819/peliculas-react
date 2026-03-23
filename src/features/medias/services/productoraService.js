import axiosClient from "../../../core/axiosClient";

const productoraService = {
    getAll: async () => {
        const { data } = await axiosClient.get("/productoras");
        return data;
    },

    create: async (payload) => {
        const { data } = await axiosClient.post("/productoras", payload);
        return data;
    },

    update: async (id, payload) => {
        const { data } = await axiosClient.put(`/productoras/${id}`, payload);
        return data;
    },

    remove: async (id) => {
        const { data } = await axiosClient.delete(`/productoras/${id}`);
        return data;
    },
};

export default productoraService;