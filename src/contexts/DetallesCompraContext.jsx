import { createContext, useEffect, useState } from "react";

const DetallesCompraDefault = {
    productos: [],
    requiereInstalacion: false
}

const DetallesCompraContext = createContext(DetallesCompraDefault);

export const DetallesCompraProvider =({children}) => {
    const [detallesCompra, setDetallesCompra] = useState(DetallesCompraDefault);

    return (
        <DetallesCompraContext.Provider value={{detallesCompra, setDetallesCompra}}>
            {children}
        </DetallesCompraContext.Provider>
    )
}

export default DetallesCompraContext;