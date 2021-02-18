import { createContext, useContext, useEffect, useState } from 'react'

import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider')
    }

    return context
}

export function AuthContextProvider(props) {
    const [user, setUser] = useState({
        isAuthenticated: false,
        userId: '',
        authToken: ''
    })

    const login = (token) => {
        const decoded = jwt_decode(token)
        if (decoded.exp < Date.now() / 1000) {
            logout()
            return
        }
        setUser({isAuthenticated: true, userId: decoded.id, authToken: token})
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        setUser({
            isAuthenticated: false,
            userId: '',
            authToken: ''
        })
    }

    const setToken = (token) => {
        localStorage.setItem('auth_token', JSON.stringify(token))
        login(token)
    }

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            const token = JSON.parse(localStorage.getItem('auth_token'))
            login(token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider 
            value={{user, setToken, logout}}
            {...props}
        />
    )
}