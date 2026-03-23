import useCrud from "./useCrud"
import mediaService from "../services/mediaService"

export default function useMedias() {
    return useCrud(mediaService)
}