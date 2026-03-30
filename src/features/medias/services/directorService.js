import axiosClient from "../../../core/axiosClient";

const directorService = {
    getAll: async () => {
        const { data } = await axiosClient.get("/directores");
        return data;
    },

    create: async (payload) => {
        const { data } = await axiosClient.post("/directores", payload);
        return data;
    },

    update: async (id, payload) => {
        const { data } = await axiosClient.put(`/directores/${id}`, payload);
        return data;
    },

    remove: async (id) => {
        const { data } = await axiosClient.delete(`/directores/${id}`);
        return data;
    },
};

export default directorService;