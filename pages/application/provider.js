import {createContext,useState} from 'react';


export default ({ children }) =>{
    const [Dinero,setDinero] = useState({
        Pago:0,
        Aplicable:0,
        TipoMoneda:"MXN",
        Id:[]

    });
    return (            
            <AppContext.Provider value={[Dinero,setDinero]}>
                {children}
            </AppContext.Provider>  
    );
}

export const AppContext = createContext();