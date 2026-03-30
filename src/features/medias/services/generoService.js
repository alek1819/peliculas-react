import axiosClient from "../../../core/axiosClient";

const generoService = {

    // Obtener todos
    async getAll() {
        const { data } = await axiosClient.get("/generos");
        return data;
    },

    // Obtener por ID
    async getById(id) {
        const { data } = await axiosClient.get(`/generos/${id}`);
        return data;
    },

    // Crear
    async create(generoData) {
        const { data } = await axiosClient.post("/generos", generoData);
        return data;
    },

    // Actualizar
    async update(id, generoData) {
        const { data } = await axiosClient.put(`/generos/${id}`, generoData);
        return data;
    },

    // Eliminar
    async remove(id) {
        const { data } = await axiosClient.delete(`/generos/${id}`);
        return data;
    }

};

export default generoService;