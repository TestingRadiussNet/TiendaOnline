import { useContext } from "react";
import DetallesCompraContext from "../contexts/DetallesCompraContext";

const useDetallesCompra = () => {
    return useContext(DetallesCompraContext);
}

export default useDetallesCompra;