import {useState, useCallback, useEffect} from 'react';
let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDates, setTokenExpirationDates] = useState();
    const [userId, setUserId] = useState();
    const [rol, setRol] = useState()

    const login = useCallback((uid, token, rol, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setRol(rol);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDates(tokenExpirationDate);
      localStorage.setItem('useData',JSON.stringify(
        {
          userId: uid,
          token: token,
          rol: rol,
          expiration: tokenExpirationDate.toISOString()
        }
      ))
    }, []);

    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDates(null);
      setUserId(null);
      setRol(null);
      localStorage.removeItem('useData')
    }, []);

    useEffect(()=>{
      if(token && tokenExpirationDates){
        const remainingTime = tokenExpirationDates.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime)
      } else {
        clearTimeout(logoutTimer);
      }
    },[token, logout, tokenExpirationDates])

    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('useData'))
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.token, storedData.rol, new Date(storedData.expiration))
      }
    },[login])

    console.log({useData:localStorage.useData})

    return { token, login, logout, userId, rol }
}