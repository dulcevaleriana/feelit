import { createContext } from "react";

export const SeeOrEdit = createContext({
    editConsultaRapida: false,
    seeDetailConsultaRapida: false,
    setEditConsultaRapida:()=>{},
    setSeeDetailConsultaRapida:()=>{}
})