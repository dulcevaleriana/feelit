import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  rol: null,
  token: null,
  login: () => {},
  logout: () => {},
  editConsultaRapida: false,
  seeDetailConsultaRapida: false,
  setEditConsultaRapida:()=>{},
  setSeeDetailConsultaRapida:()=>{}
});
