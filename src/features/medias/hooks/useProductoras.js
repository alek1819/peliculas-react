import useCrud from "./useCrud";
import productoraService from "../services/productoraService";

export default function useProductoras() {
    return useCrud(productoraService);
}