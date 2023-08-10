import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useContext, useMemo } from "react";
const AuthContext = createContext();

function AuthProvider ({children}) {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    async function login(data) {
        setUser(data);
        navigate("/chat");
    }

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(()=>({
        user,
        login,
        logout
    }),[user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    return useContext(AuthContext);
}

export {AuthProvider,useAuth}