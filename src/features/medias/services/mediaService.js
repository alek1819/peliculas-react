import axiosClient from "../../../core/axiosClient"

const mediaService = {
    getAll: async () => {
        const { data } = await axiosClient.get("/medias")
        return data
    },

    getById: async (id) => {
        const { data } = await axiosClient.get(`/medias/${id}`)
        return data
    },

    create: async (mediaData) => {
        const { data } = await axiosClient.post("/medias", mediaData)
        return data
    },

    update: async (id, mediaData) => {
        const { data } = await axiosClient.put(`/medias/${id}`, mediaData)
        return data
    },

    remove: async (id) => {
        const { data } = await axiosClient.delete(`/medias/${id}`)
        return data
    }
}

export default mediaService