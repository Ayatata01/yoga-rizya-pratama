import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function AuthenticatedComponent({ children }) {
    const navigate = useNavigate();
    const [token, setToken] = useState();

    useEffect(() => {
        // Periksa keberadaan token JWT
        const token = Cookies.get('token');
        setToken(token)

        // Jika token tidak ada, alihkan ke halaman login
        if (!token) {
            navigate("/");
        }
    }, []);

    if (token) {
        return <>{children}</>;
    }
}

export default AuthenticatedComponent;
