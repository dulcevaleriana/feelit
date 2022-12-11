import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import "./scss/GlobalStyle.scss";

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';


import Routers from './pages/Routers';

const App = () => {
  const { token, login, logout, userId, rol } = useAuth();

  const [editConsultaRapida, setEditConsultaRapida] = useState(false);
  const [seeDetailConsultaRapida, setSeeDetailConsultaRapida] = useState(false);

  return <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      rol: rol,
      login: login,
      logout: logout,
      editConsultaRapida: editConsultaRapida,
      seeDetailConsultaRapida: seeDetailConsultaRapida,
      setEditConsultaRapida: setEditConsultaRapida,
      setSeeDetailConsultaRapida: setSeeDetailConsultaRapida
    }}
  >
    <Router>
      <MainNavigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routers token={token} rol={rol}/>
        </Suspense>
      </main>
    </Router>
  </AuthContext.Provider>
}

export default App;
