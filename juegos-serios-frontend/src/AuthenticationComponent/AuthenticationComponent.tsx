import { useState } from 'react'
import { Login } from '../Login/Login'
import { baseUrl } from '../constants/url'
import axios from 'axios'

export const AuthenticationComponent = () => {
    const [isLoginOpened, setIsLoginOpened] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))

    const showLoginError = () => {
        // using a custom popup could improve this
        const msg = "Un error ocurrió al intentar iniciar sesión"
        alert(msg)
    }

    const handleLoginClose = () => {
        setIsLoginOpened(false);
    }

    const handleOpenLogin = () => {
        setIsLoginOpened(true);
    }

    const handleLoginSubmit = async (username: string, password: string) => {
        try {
            const { data } = await axios.post(baseUrl + 'login', { username, password })
            if (data?.token?.length) {
                localStorage.setItem('token', data.token)
                setIsLoginOpened(false)
                // to prevent issues, reload the page
                window.location.reload()
            } else {
                showLoginError();
            }
        } catch {
            showLoginError();
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
        // to prevent issues, reload the page
        window.location.reload()
    }

    return (
        <>
            <div className="position-relavite">
                {isLoggedIn ? <button className="btn btn-light log-btn position-absolute m-3 top-0 end-0" onClick={handleLogout}>Cerrar sesión</button> : <button className="btn btn-light log-btn position-absolute m-3 top-0 end-0" onClick={handleOpenLogin}>Iniciar sesión</button>}
            </div>

            {isLoginOpened
                ? <Login handleClose={handleLoginClose} handleLogin={handleLoginSubmit} />
                : null}
        </>
    )
}