import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {userService} from "../services/user/service";

type LayoutProp = {
    children: ReactNode,
}

type userContextType = {
    user: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isUserCached: () => boolean;
}

const userContextDefault: userContextType = {
    user: null,
    login: () => { return false; },
    logout: () => {},
    isUserCached: () => { return false; }
}

const UserContext = createContext<userContextType>(userContextDefault);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: LayoutProp) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
       if(user === null && userService.isUserCached()) {
           setUser(userService.getUser());
       }
    }, [user]);

    const login = (username: string, password: string) => {
        if(userService.login(username, password)) {
            setUser(userService.getUser());
            return true;
        } else {
            return false;
        }
    };

    const isUserCached = () => {
        return userService.isUserCached();
    }

    const logout = () => {
        userService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isUserCached,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}