import useCrud from "./useCrud";
import tipoService from "../services/tipoService";

export default function useTipos() {
    return useCrud(tipoService);
}