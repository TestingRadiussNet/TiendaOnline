import { useContext } from "react";
import CarritoContext from "../contexts/CarritoContext";

const useCarrito = () => {
    return useContext(CarritoContext);
}

export default useCarrito;