import useCrud from "./useCrud";
import directorService from "../services/directorService";

export default function useDirectors() {
    return useCrud(directorService);
}