import {createContext, ReactNode, useContext} from 'react';
import {userService} from "../services/user/service";

type LayoutProp = {
    children: ReactNode,
}

type userContextType = {
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isUserCached: () => boolean;
}

const userContextDefault: userContextType = {
    login: () => { return false; },
    logout: () => {},
    isUserCached: () => { return false; }
}

const UserContext = createContext<userContextType>(userContextDefault);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: LayoutProp) {
    const login = (username: string, password: string) => {
        return userService.login(username, password);
    };

    const isUserCached = () => {
        return userService.isUserCached();
    }

    const logout = () => {
        userService.logout();
    };

    const value = {
        login,
        logout,
        isUserCached,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}