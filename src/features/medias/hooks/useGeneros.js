
import useCrud from "./useCrud";
import generoService from "../services/generoService";

export default function useGeneros() {
    return useCrud(generoService);
}